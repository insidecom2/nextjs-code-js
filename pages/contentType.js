import { Row, Col, Typography, Table, Button } from 'antd'
import MainLayout from 'components/Layout/MainLayout'
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'

const contentType = () => {
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index) => (
        <span>
          {materialList.findIndex((FindPos) => FindPos.id === text.id) + 1}
        </span>
      )
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
        <Switch onChange={(e) => setActive(e, record)} checked={text} />
      )
    }
  ]

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>รายการหมวดหมู่บทความ</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <Button> {<PlusOutlined />}เพิ่มหมวดหมู่บทความ</Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table bordered columns={columns}></Table>
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

export default contentType
