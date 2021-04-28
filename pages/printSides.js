import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import { Switch, Button, Col, Popconfirm, Row, Space, Table, Typography, Form } from 'antd'
import { ACTION } from 'utils/constants.js'
import ManagePrintSide from 'components/Settings/PrintSide/ManagePrintSide'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import {
  createPrintSide,
  deletePrintSide,
  getPrintSideList,
  isActivePrintSide,
  getPrintSideById,
  updatePrintSide
} from 'store/reducers/printSide'

const PrintSides = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const { printSideList, isLoading } = useSelector(
    (state) => ({
      printSideList: state.printSide.printSideList,
      isLoading: state.printSide.isLoading
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getPrintSideList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space>
          <a onClick={(e) => onEdit(e, ACTION.EDIT, record.id)}>edit</a>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={(e) => confirm(e, record)}>
            <a>delete</a>
          </Popconfirm>
        </Space>
      )
    },
    {
      title: 'Active',
      key: 'is_active',
      dataIndex: 'is_active',
      render: (text, record, index) => (
        <Form form={form} name="typeActive" layout="vertical">
          <Form.Item
            valuePropName="checked"
            name={'active_' + record.id}
            initialValue={!!text}>
            <Switch onChange={(e) => setActive(e, record)} />
          </Form.Item>
        </Form>
      )
    }
  ]

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deletePrintSide(record.id))
    await dispatch(getPrintSideList())
  }

  const onClick = (e, action) => {
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (GetId, data) => {
    await setVisible(false)
    String(action) !== 'Edit'
      ? await dispatch(createPrintSide(data))
      : await dispatch(updatePrintSide(GetId, data))
      await dispatch(getPrintSideList())
  }

  const onCancel = () => {
    setVisible(false)
  }

  const setActive = async (e, record) => {
    await dispatch(isActivePrintSide(record.id, e))
  }

  const onEdit = async (e, action, id) => {
    const GetPosition =
      Number(printSideList.findIndex((FindPos) => FindPos.id === id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    setAction(action)
    await dispatch(getPrintSideById(id))
    await dispatch(getPrintSideList())
    setVisible(true)
  }

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>Print Sides List</Typography.Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button onClick={(e) => onClick(e, ACTION.CREATE)}>
              Add Print Side
            </Button>
          </Row>
        </Col>
      </Row>
      <Table
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={printSideList}
        rowKey={(record) => record.id}
      />
      {visible && (
        <ManagePrintSide
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          action={action}
          TrNo={AntSelectNo}
        />
      )}
    </MainLayout>
  )
}

PrintSides.propTypes = {}

export default PrintSides
