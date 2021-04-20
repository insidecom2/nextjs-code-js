import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import { Button, Col, Popconfirm, Row, Space, Table, Typography } from 'antd'
import { ACTION } from 'utils/constants.js'
import ManageSize from 'components/Settings/Size/ManageSize'
import { useDispatch, useSelector } from 'react-redux'
import { createSize, deleteSize, getSizeList } from 'store/reducers/size'
import useDeepEffect from 'utils/hooks/useDeepEffect'

const Size = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const { sizeList, isLoading } = useSelector(
    (state) => ({
      sizeList: state.size.sizeList,
      isLoading: state.size.isLoading
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getSizeList())
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
      title: 'Width',
      dataIndex: 'width',
      key: 'width'
    },
    {
      title: 'Length',
      dataIndex: 'lenght',
      key: 'length'
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height'
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
    await dispatch(deleteSize(record.id))
    await dispatch(getSizeList())
  }

  const onClick = (e, action) => {
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (data) => {
    await setVisible(false)
    await dispatch(createSize(data))
    await dispatch(getSizeList())
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>Size List</Typography.Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button onClick={(e) => onClick(e, ACTION.CREATE)}>Add Size</Button>
          </Row>
        </Col>
      </Row>
      <Table
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={sizeList}
        rowKey={(record) => record.id}
      />
      {visible && (
        <ManageSize
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          action={action}
        />
      )}
    </MainLayout>
  )
}

Size.propTypes = {}

export default Size
