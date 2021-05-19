import moment from 'moment'
import React from 'react'
import { Button, Form, Input, InputNumber, Row, Space, Table } from 'antd'
import PropTypes from 'prop-types'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import _ from 'lodash'
import { inputRule } from 'utils/forms'

const StepQuantity = (props) => {
  const { product, form, quantityList, setQuantityList } = props

  useDeepEffect(() => {
    if (!_.isEmpty(product)) {
      product.product_quantity_price.forEach((item, index) => {
        form.setFieldsValue({
          [`quantity_${item.id}_${index}`]: item.quantity,
          [`price_${item.id}_${index}`]: item.price
        })
      })

      setQuantityList(product.product_quantity_price)
    }
  }, [])

  const validateQuantity = (rule, value, callback, id, indexInput) => {
    if (!_.isNull(value)) {
      if (value !== 0) {
        quantityList.forEach((item, index) => {
          const targetValue = form.getFieldValue(`quantity_${item.id}_${index}`)
          if (value === Number(targetValue) && indexInput !== index) {
            callback(`ไม่สามารถใส่ Quantity ซ้ำได้`)
          }
        })
        callback()
      } else {
        callback('ไม่สามารถกรอกค่า 0 ')
      }
    } else {
      callback()
    }
  }

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
        <Form.Item
          name={`quantity_${record.id}_${index}`}
          rules={[
            {
              required: true,
              message: 'Please input!'
            },
            {
              validator: (rule, value, callback) =>
                validateQuantity(rule, value, callback, record.id, index)
            }
          ]}>
          <InputNumber style={{ width: '100%' }} size="small" />
        </Form.Item>
      )
    },
    {
      title: 'Price',
      key: 'price',
      render: (text, record, index) => (
        <Form.Item name={`price_${record.id}_${index}`} {...inputRule}>
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
      prevState.push({
        id: 0,
        createdAt: moment(new Date()).toISOString()
      })
      return [...prevState]
    })
  }

  const onDelete = async (e, id) => {
    e.preventDefault()
    console.log(quantityList)
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
        rowKey={(record) => moment(record.createdAt).unix()}
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
