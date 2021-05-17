import moment from 'moment'
import React from 'react'
import { Button, Form, InputNumber, Row, Space, Table } from 'antd'
import PropTypes from 'prop-types'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import _ from 'lodash'
import { inputRule } from 'utils/forms'
import { useDispatch } from 'react-redux'
import { deleteQuantityPrice } from 'store/reducers/products'

const StepQuantity = (props) => {
  const { product, form, quantityList, setQuantityList } = props

  const dispatch = useDispatch()

  useDeepEffect(() => {
    if (!_.isEmpty(product)) {
      product.product_quantity_price.forEach((item, index) => {
        form.setFieldsValue({
          [`quantity_old_${index}`]: item.quantity,
          [`price_old_${index}`]: item.price
        })

        setQuantityList((prevState) => {
          prevState.push({
            ...item,
            form: 'old'
          })

          return [...prevState]
        })
      })
    }
  }, [])

  const validateQuantity = (rule, value, callback, id) => {
    if (!_.isNull(value)) {
      if (value !== 0) {
        const lastValue = form.getFieldValue(`quantity_${item.id}`)

        callback(`ไม่สามารถใส่ Quantity ซ้ำได้`)
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
          name={`quantity_${record.form}_${index}`}
          rules={[
            {
              required: true,
              message: 'Please input!'
            }
            // {
            //   validator: (rule, value, callback) =>
            //     validateQuantity(rule, value, callback, record.id)
            // }
          ]}>
          <InputNumber style={{ width: '100%' }} size="small" />
        </Form.Item>
      )
    },
    {
      title: 'Price',
      key: 'price',
      render: (text, record, index) => (
        <Form.Item name={`price_${record.form}_${index}`} {...inputRule}>
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
        form: 'new',
        createdAt: moment(new Date()).toISOString()
      })
      return [...prevState]
    })
  }

  const onDelete = (e, id) => {
    console.log('id', id)
    e.preventDefault()

    setQuantityList((prevState) => {
      _.remove(prevState, (item) => {
        console.log('item', item.id)
        return item.id === id
      })
      return [...prevState]
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
