import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import { Button, Col, Popconfirm, Row, Space, Table, Typography } from 'antd'
import { ACTION } from 'utils/constants.js'
import ManagePrintSide from 'components/Settings/PrintSide/ManagePrintSide'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import {
  createPrintSide,
  deletePrintSide,
  getPrintSideList
} from 'store/reducers/printSide'

const PrintSides = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

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
          <a>edit</a>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={(e) => confirm(e, record)}>
            <a>delete</a>
          </Popconfirm>
        </Space>
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

  const onOk = async (data) => {
    await setVisible(false)
    await dispatch(createPrintSide(data))
    await dispatch(getPrintSideList())
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>PrintFinish List</Typography.Title>
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
        />
      )}
    </MainLayout>
  )
}

PrintSides.propTypes = {}

export default PrintSides
