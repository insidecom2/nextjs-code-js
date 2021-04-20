import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import { Button, Col, Popconfirm, Row, Space, Table, Typography } from 'antd'
import { ACTION } from 'utils/constants.js'
import ManageStyle from 'components/Settings/Style/ManageStyle'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { createStyle, deleteStyle, getStyleList } from 'store/reducers/style'

const Style = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const { styleList, isLoading } = useSelector(
    (state) => ({
      styleList: state.style.styleList,
      isLoading: state.style.isLoading
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getStyleList())
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

  const onClick = (e, action) => {
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (data) => {
    await setVisible(false)
    await dispatch(createStyle(data))
    await dispatch(getStyleList())
  }

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteStyle(record.id))
    await dispatch(getStyleList())
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>Style List</Typography.Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button onClick={(e) => onClick(e, ACTION.CREATE)}>
              Add Style
            </Button>
          </Row>
        </Col>
      </Row>
      <Table
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={styleList}
        rowKey={(record) => record.id}
      />
      {visible && (
        <ManageStyle
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          action={action}
        />
      )}
    </MainLayout>
  )
}

Style.propTypes = {}

export default Style
