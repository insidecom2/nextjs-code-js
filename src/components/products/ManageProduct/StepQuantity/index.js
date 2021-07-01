import moment from 'moment'
import React from 'react'
import {
  Button,
  Empty,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Table
} from 'antd'
import PropTypes from 'prop-types'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import _ from 'lodash'
import { inputRule } from 'utils/forms'
import { ACTION } from 'utils/constants.js'

const StepQuantity = (props) => {
  const { product, form, quantityList, setQuantityList, action } = props

  useDeepEffect(() => {
    if (!_.isEmpty(product) && action === ACTION.EDIT) {
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
            callback(`ไม่สามารถใส่ ปริมาณ ซ้ำได้`)
          } else {
            if (value < 0) {
              callback(`ไม่สามารถใส่ ปริมาณ ติดลบ`)
            } else {
              callback()
            }
          }
        })
      } else {
        callback('ไม่สามารถกรอกค่า 0 ')
      }
    } else {
      callback()
    }
  }

  const validatePrice = (rule, value, callback, id, indexInput) => {
    if (!_.isNull(value)) {
      if (value < 0) callback('กรอกเป็นค่าติดลบไม่ได้')
      callback()
    } else {
      callback()
    }
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index) => (
        <span>
          {quantityList.findIndex((FindPos) => FindPos.id === text.id) + 1}
        </span>
      )
    },
    {
      title: 'ปริมาณ',
      key: 'quantity',
      render: (text, record, index) => (
        <Form.Item 
          name={`quantity_${record.id}_${quantityList.findIndex(
            (FindPos) => FindPos.id === text.id
          )}`}
          rules={[
            {
              required: true,
              message: 'Please input!'
            },
            {
              validator: (rule, value, callback) =>
                validateQuantity(
                  rule,
                  value,
                  callback,
                  record.id,
                  quantityList.findIndex((FindPos) => FindPos.id === text.id)
                )
            }
          ]}>
          <InputNumber onChange={(e)=>onChange(e, record.id, "quantity")} style={{ width: '100%' }} size="small" />
        </Form.Item>
      )
    },
    {
      title: 'ราคา',
      key: 'price',

      render: (text, record, index) => (
        <Form.Item
          name={`price_${record.id}_${quantityList.findIndex(
            (FindPos) => FindPos.id === text.id
          )}`}
          rules={[
            {
              required: true,
              message: 'Please input!'
            },
            {
              validator: (rule, value, callback) =>
                validatePrice(
                  rule,
                  value,
                  callback,
                  record.id,
                  quantityList.findIndex((FindPos) => FindPos.id === text.id)
                )
            }
          ]}>
          <InputNumber onChange={ (e)=>onChange(e, record.id, "price")} style={{ width: '100%' }} size="small" />
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
    let VisualId = 0
    for (let Count = 0; Count < quantityList.length; Count++) {
      if (quantityList[Count].id !== undefined) {
        VisualId = VisualId + quantityList[Count].id
      }
    }
    VisualId++
    setQuantityList((prevState) => {
      prevState.push({
        id: VisualId,
        createdAt: moment(new Date()).toISOString()
      })
      return [...prevState]
    })
  }

  const onChange =(e,id,key)=> {
    let oldQuantityList = [...quantityList];
    let positionIndex = oldQuantityList.findIndex((FindPos) => FindPos.id === id)
    if (String(key)==="quantity") {
      oldQuantityList[positionIndex].quantity = e;
    }
    if (String(key)==="price") {
      oldQuantityList[positionIndex].price = e;
    }
    setQuantityList(oldQuantityList);
  }
 
  useDeepEffect(() => {
    if (!_.isEmpty(quantityList)) {
      quantityList.map((item, index) => {
          form.setFieldsValue({
            [`quantity_${item.id}_${index}`]: item.quantity,
            [`price_${item.id}_${index}`]: item.price
          })
      })
    }
  }, [quantityList])

  const onDelete = async (e, id) => {
     e.preventDefault()
    await setQuantityList((prevState) => {
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
        // rowKey={(record) => moment(record.createdAt).unix()}
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
