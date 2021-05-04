/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import {
  Switch,
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  Typography,
  Form
} from 'antd'
import { ACTION } from 'utils/constants.js'
import ManageMaterial from 'components/Settings/Material/ManageMaterial'
import {
  createMaterial,
  deleteMaterial,
  getMaterialList,
  updateActiveMaterial,
  getMaterialById,
  updateMaterial
} from 'store/reducers/material'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'

const Material = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

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
      render: (text, record, index) => <span>{materialList.findIndex((FindPos) => FindPos.id === text.id) + 1}</span>
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
            initialValue={!text}>
            <Switch onChange={(e) => setActive(e, record)} />
          </Form.Item>
        </Form>
      )
    }
  ]

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteMaterial(record.id))
    await dispatch(getMaterialList())
  }

  const onClick = (e, action) => {
    SetAntSelectNo(materialList.length + 1)
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (GetId, data) => {
    await setVisible(false)
    String(action) !== 'Edit'
      ? await dispatch(createMaterial(data))
      : await dispatch(updateMaterial(GetId, data))
    await dispatch(getMaterialList())
  }

  const setActive = async (e, record) => {
    await dispatch(updateActiveMaterial(record.id, e))
  }

  const onCancel = () => {
    setVisible(false)
  }

  const onEdit = async (e, action, id) => {
    const GetPosition =
      Number(materialList.findIndex((FindPos) => FindPos.id === id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    setAction(action)
    await dispatch(getMaterialById(id))
    await dispatch(getMaterialList())
    setVisible(true)
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
          TrNo={AntSelectNo}
        />
      )}
    </MainLayout>
  )
}

Material.propTypes = {}

export default Material
