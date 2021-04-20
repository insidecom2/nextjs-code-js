import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import { Button, Col, Popconfirm, Row, Space, Table, Typography } from 'antd'
import { ACTION } from 'utils/constants.js'
import ManageMaterial from 'components/Settings/Material/ManageMaterial'
import {
  createMaterial,
  deleteMaterial,
  getMaterialList
} from 'store/reducers/material'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'

const Material = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const { materialList, isLoading } = useSelector(
    (state) => ({
      materialList: state.material.materialList,
      isLoading: state.material.isLoading
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getMaterialList())
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
    await dispatch(deleteMaterial(record.id))
    await dispatch(getMaterialList())
  }

  const onClick = (e, action) => {
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (data) => {
    await setVisible(false)
    await dispatch(createMaterial(data))
    await dispatch(getMaterialList())
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>Material List</Typography.Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button onClick={(e) => onClick(e, ACTION.CREATE)}>
              Add Material
            </Button>
          </Row>
        </Col>
      </Row>
      <Table
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={materialList}
        rowKey={(record) => record.id}
      />
      {visible && (
        <ManageMaterial
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          action={action}
        />
      )}
    </MainLayout>
  )
}

Material.propTypes = {}

export default Material
