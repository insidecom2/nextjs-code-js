import { Button, Col, Popconfirm, Row, Space, Switch, Typography } from 'antd'
import MainLayout from 'components/Layout/MainLayout'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION } from 'utils/constants.js'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import ManagePayment from 'components/Settings/ManagePayment'
import { AddCreate } from 'styles/BtnCreate/index.style'
import { NewTable } from 'styles/NewTable/index.style'

import {
  deletePayment,
  getPaymentList,
  updateActivePayment,
  updatePayment,
  createPayment
} from 'store/reducers/payment'

const payment = () => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [typeSelected, setTypeSelected] = useState(null)

  const dispatch = useDispatch()

  const { isLoading, paymentList } = useSelector((state) => ({
    isLoading: state.payment.isLoading,
    paymentList: state.payment.PaymentList
  }))

  const fetchData = async () => {
    await dispatch(getPaymentList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const setActive = async (e, record) => {
    await dispatch(updateActivePayment(record.id, e))
    await dispatch(getPaymentList())
  }

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deletePayment(record.id))
    await fetchData()
  }

  const onEdit = async (e, action, record) => {
    e.preventDefault()
    const GetPosition =
      Number(paymentList.findIndex((FindPos) => FindPos.id === record.id)) + 1
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
    formData.set('name', data.name)
    formData.append('logo', data.logo)
    if (action === ACTION.CREATE) {
      await dispatch(createPayment(formData))
    } else if (action === ACTION.EDIT) {
      await dispatch(updatePayment(data.id, formData))
    }
    await dispatch(getPaymentList())
  }

  const onClick = async (e, action) => {
    e.preventDefault()
    SetAntSelectNo(paymentList ? paymentList.length + 1 : 1)
    await dispatch(getPaymentList())
    setAction(action)
    setVisible(true)
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index) => (
        <span>
          {paymentList.findIndex((FindPos) => FindPos.id === text.id) + 1}
        </span>
      )
    },
    {
      title: 'Logo',
      key: 'logo',
      render: (text, record, index) => <img src={record.logo} height="100" />
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name'
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
            <Typography.Title level={3}>การชำระเงิน</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>
                เพิ่มข้อมูลชำระเงิน
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
              dataSource={paymentList}
              rowKey={(record) => record.id}
            />
            {visible && (
              <ManagePayment
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

export default payment
