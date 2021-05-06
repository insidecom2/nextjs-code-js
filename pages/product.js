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
  updateActiveProducts,
  updateProducts
} from 'store/reducers/products'

const Products = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()
  const [typeSelected, setTypeSelected] = useState(null)

  const { productsList, isLoading } = useSelector(
    (state) => ({
      productsList: state.products.productsList,
      isLoading: state.products.isLoading
    }),
    []
  )

  // console.log(productsList)

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
      title: 'Category / Type',
      dataIndex: 'category_type',
      key: 'name',
      render: (text) => <span>{text.category.name+" / "+text.name}
      </span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space>
          <a onClick={(e) => onEdit(e, ACTION.EDIT, record)}>edit</a>
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
    
    const formData = new FormData()
    formData.set('data', JSON.stringify(data.data))
    formData.append('images', JSON.stringify(data.images))
    formData.set('quantity', data.quantity)

    if (action === ACTION.CREATE) {
      await dispatch(createProducts(formData))
    } else if (action === ACTION.EDIT) {
      await dispatch(updateProducts(data.id, formData))
    }

    await dispatch(getProductsList())
  }

  const onCancel = () => {
    setVisible(false)
    setTypeSelected(null)
  }

  const setActive = async (e, record) => {
    await dispatch(updateActiveProducts(record.id, e))
    await dispatch(getProductsList())
  }

  const onEdit = async (e, action, record) => {
    const GetPosition =
      Number(productsList.findIndex((FindPos) => FindPos.id === record.id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    await setTypeSelected(record)
    await setAction(action)
    await setVisible(true)
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
          TrNo={AntSelectNo}
          typeSelected={typeSelected}
        />
      )}
    </MainLayout>
  )
}

Products.propTypes = {}

export default Products
