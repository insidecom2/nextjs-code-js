import React from 'react'
import { Button, Form, InputNumber, Row, Space, Table } from 'antd'
import PropTypes from 'prop-types'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import _ from 'lodash'
import { inputRule } from 'utils/forms'

const StepQuantity = (props) => {
  const { product, form, quantityList, setQuantityList } = props

  useDeepEffect(() => {
    if (!_.isEmpty(product)) {
      product.product_quantity_price.forEach((item) => {
        form.setFieldsValue({
          [`quantity_${item.id}`]: item.quantity,
          [`price_${item.id}`]: item.price
        })
      })

      setQuantityList(product.product_quantity_price)
    }
  }, [])

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (text, record, index) => (
        <Form.Item name={`quantity_${record.id}`} {...inputRule}>
          <InputNumber style={{ width: '100%' }} size="small" />
        </Form.Item>
      )
    },
    {
      title: 'Price',
      key: 'price',
      render: (text, record, index) => (
        <Form.Item name={`price_${record.id}`} {...inputRule}>
          <InputNumber style={{ width: '100%' }} size="small" />
        </Form.Item>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space>
          <a onClick={(e) => onDelete(e, record.id)}>delete</a>
        </Space>
      )
    }
  ]

  const onClick = (e) => {
    e.preventDefault()
    setQuantityList((prevState) => {
      const idArr = prevState.map((item) => item.id)

      return [...prevState]
    })
  }

  const onDelete = (e, id) => {
    e.preventDefault()

    setQuantityList((prevState) => {
      const arr = prevState.filter((item) => item.id !== id)
      return [...arr]
    })
  }

  return (
    <div>
      <Row justify="end" style={{ marginBottom: 10 }}>
        <Button onClick={onClick}>Add Quantity</Button>
      </Row>
      <Table
        scroll={{ y: 450 }}
        bordered
        columns={columns}
        dataSource={quantityList}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </div>
  )
}

StepQuantity.propTypes = {
  product: PropTypes.object,
  quantityList: PropTypes.array,
  setQuantityList: PropTypes.func,
  form: PropTypes.any
}

export default StepQuantity
