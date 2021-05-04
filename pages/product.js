import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import { Switch, Button, Col, Popconfirm, Row, Space, Table, Typography } from 'antd'
import { ACTION } from 'utils/constants.js'
import CreateProducts from 'components/products/CreateProduct'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'

import {
  createProducts,
  deleteProducts,
  getProductsList,
  updateActiveProducts
} from 'store/reducers/products'

const Products = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const { productsList, isLoading } = useSelector(
    (state) => ({
      productsList: state.products.productsList,
      isLoading: state.products.isLoading
    }),
    []
  )

  console.log(productsList)

  const fetchData = async () => {
    await dispatch(getProductsList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteProducts(record.id))
    await dispatch(getProductsList())
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text) => <span>{Number(
        productsList.findIndex((FindPos) => FindPos.id === text.id)
      ) + 1}</span>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text.toString().toUpperCase()}</span>
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

  const onClick = (e, action) => {
    SetAntSelectNo(productsList.length + 1)
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (data) => {
    await setVisible(false)
    await dispatch(createProducts(data))
    await dispatch(getProductsList())
  }

  const onCancel = () => {
    setVisible(false)
  }

  const setActive = async (e, record) => {
    await dispatch(updateActiveProducts(record.id, e))
    await dispatch(getProductsList())
  }

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>Products List</Typography.Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button onClick={(e) => onClick(e, ACTION.CREATE)}>
              Add Products
            </Button>
          </Row>
        </Col>
      </Row>
      <Table
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={productsList}
        rowKey={(record) => record.id}
      />
      {visible && (
        <CreateProducts
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          action={action}
        />
      )}
    </MainLayout>
  )
}

Products.propTypes = {}

export default Products
