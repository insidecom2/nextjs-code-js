import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import { Button, Col, Popconfirm, Row, Space, Table, Typography } from 'antd'
import { ACTION } from 'utils/constants.js'
import ManagePrintFinish from 'components/Settings/PrintFinish/ManagePrintFinish'
import { useDispatch, useSelector } from 'react-redux'
import {
  createPrintFinish,
  deletePrintFinish,
  getPrintFinishList
} from 'store/reducers/printFinish'
import useDeepEffect from 'utils/hooks/useDeepEffect'

const PrintFinish = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

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
    await dispatch(deletePrintFinish(record.id))
    await dispatch(getPrintFinishList())
  }

  const onClick = (e, action) => {
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (data) => {
    await setVisible(false)
    await dispatch(createPrintFinish(data))
    await dispatch(getPrintFinishList())
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
              Add Print Finish
            </Button>
          </Row>
        </Col>
      </Row>
      <Table
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
        />
      )}
    </MainLayout>
  )
}

PrintFinish.propTypes = {}

export default PrintFinish
