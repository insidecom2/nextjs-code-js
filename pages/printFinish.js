import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import { Switch, Button, Col, Popconfirm, Row, Space, Table, Typography, Form } from 'antd'
import { ACTION } from 'utils/constants.js'
import ManagePrintFinish from 'components/Settings/PrintFinish/ManagePrintFinish'
import { useDispatch, useSelector } from 'react-redux'
import {
  createPrintFinish,
  deletePrintFinish,
  getPrintFinishList,
  updateActivePrintFinish,
  getPrintFinishById,
  updatePrintFinish
} from 'store/reducers/printFinish'
import useDeepEffect from 'utils/hooks/useDeepEffect'

import {
  AddCreate
} from 'styles/BtnCreate/index.style'
import {
  NewTable
} from 'styles/NewTable/index.style'

const PrintFinish = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [form] = Form.useForm()

  const { printFinishList, isLoading } = useSelector(
    (state) => ({
      printFinishList: state.printFinish.printFinishList,
      isLoading: state.printFinish.isLoading
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getPrintFinishList())
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
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => printFinishList[Number(printFinishList.findIndex((FindPos) => FindPos.id === text.id))].is_active&&(
        <Space>
           <a onClick={(e) => onEdit(e, ACTION.EDIT, record.id)}>แก้ไข</a>
          <Popconfirm
            title="คุณแน่ใจที่จะลบ?"
            onConfirm={(e) => confirm(e, record)}>
            <a>ลบ</a>
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
    await dispatch(deletePrintFinish(record.id))
    await dispatch(getPrintFinishList())
  }

  const onClick = (e, action) => {
    SetAntSelectNo(printFinishList.length + 1)
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (GetId, data) => {
    await setVisible(false)
    String(action) !== 'Edit'
      ? await dispatch(createPrintFinish(data))
      : await dispatch(updatePrintFinish(GetId, data))
    await dispatch(getPrintFinishList())
  }

  const onCancel = () => {
    setVisible(false)
  }
  const setActive = async (e, record) => {
    await dispatch(updateActivePrintFinish(record.id, e))
    await dispatch(getPrintFinishList())
  }

  const onEdit = async (e, action, id) => {
    const GetPosition =
      Number(printFinishList.findIndex((FindPos) => FindPos.id === id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    setAction(action)
    await dispatch(getPrintFinishById(id))
    await dispatch(getPrintFinishList())
    setVisible(true)
  }

  return (
    <MainLayout><div style={{ margin: '0 16px', padding: 10 }}>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>รายการพิมพ์เสร็จ</Typography.Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>
              เพิ่ม พิมพ์เสร็จ
            </AddCreate>
          </Row>
        </Col>
      </Row>
      <NewTable
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={printFinishList}
        rowKey={(record) => record.id}
      />
      {visible && (
        <ManagePrintFinish
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          action={action}
          TrNo={AntSelectNo}
        />
      )}</div>
    </MainLayout>
  )
}

PrintFinish.propTypes = {}

export default PrintFinish
