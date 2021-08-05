import {
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Switch,
  Table,
  Typography
} from 'antd'
import MainLayout from 'components/Layout/MainLayout'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION } from 'utils/constants.js'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import ManageShipping from 'components/Settings/ManageShipping'
import { AddCreate } from 'styles/BtnCreate/index.style'
import { NewTable } from 'styles/NewTable/index.style'

import {
  deleteShipping,
  getShippingList,
  updateActiveShipping,
  updateShipping,
  createShipping
} from 'store/reducers/shipping'

const shipping = () => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [typeSelected, setTypeSelected] = useState(null)
  const { isLoading, shippingList } = useSelector(
    (state) => ({
      isLoading: state.shipping.isLoading,
      shippingList: state.shipping.ShippingTypeList
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getShippingList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const setActive = async (e, record) => {
    await dispatch(updateActiveShipping(record.id, e))
    await dispatch(getShippingList())
  }

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteShipping(record.id))
    await fetchData()
  }

  const onEdit = async (e, action, record) => {
    e.preventDefault()
    const GetPosition =
      Number(shippingList.findIndex((FindPos) => FindPos.id === record.id)) + 1
    SetAntSelectNo(GetPosition)
    await setTypeSelected(record)
    await setAction(action)
    await setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
    setTypeSelected(null)
  }

  const onOk = async (data) => {
    await setVisible(false)
    const formData = new FormData()
    formData.set('title', data.title)
    formData.set('type', data.type)
    formData.set('price', data.price)
    formData.append('logo', data.logo)
    if (action === ACTION.CREATE) {
      await dispatch(createShipping(formData))
    } else if (action === ACTION.EDIT) {
      await dispatch(updateShipping(data.id, formData))
    }
    await dispatch(getShippingList())
  }

  const onClick = async (e, action) => {
    e.preventDefault()
    SetAntSelectNo(shippingList.length + 1)
    await dispatch(getShippingList())
    setAction(action)
    setVisible(true)
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index) => (
        <span>
          {shippingList.findIndex((FindPos) => FindPos.id === text.id) + 1}
        </span>
      )
    },
    {
      title: 'Logo',
      key: 'logo',
      render: (text, record, index) => <img src={record.logo} height="100" />
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space>
          <a onClick={(e) => onEdit(e, ACTION.EDIT, record)}>แก้ไข</a>
          <Popconfirm
            title="Are you sure to delete?"
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
        <Switch onChange={(e) => setActive(e, record)} checked={text} />
      )
    }
  ]

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>Shipping</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>
                เพิ่มข้อมูลขนส่ง
              </AddCreate>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <NewTable
              bordered
              columns={columns}
              loading={isLoading}
              dataSource={shippingList}
              rowKey={(record) => record.id}
            />
            {visible && (
              <ManageShipping
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                action={action}
                TrNo={AntSelectNo}
                typeSelected={typeSelected}
              />
            )}
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

export default shipping
