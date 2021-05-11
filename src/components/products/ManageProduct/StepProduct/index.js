import React, { useState } from 'react'
import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import PropTypes from 'prop-types'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { ACTION } from 'utils/constants'
import _ from 'lodash'

const StepProduct = (props) => {
  const { action, categoryList, typeList, productSelected, form } = props

  useDeepEffect(() => {
    if (action === ACTION.EDIT && !_.isEmpty(productSelected)) {
      form.setFieldsValue({
        code: productSelected.code,
        name: productSelected.name,
        detail: productSelected.detail,
        category: productSelected.category_type.category.id,
        type: productSelected.category_type.id,
        price: productSelected.price,
        weight: productSelected.weight,
        size: productSelected.size
      })
    }
  }, [productSelected])

  return (
    <div>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Product Code"
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input your Code!'
              }
            ]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Type Name!'
              }
            ]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input your Category!'
              }
            ]}>
            <Select>
              {categoryList.map((val) => (
                <Select.Option key={val.id} value={val.id}>
                  {val.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please input your Type!'
              }
            ]}>
            <Select>
              {typeList.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Detail" name="detail">
        <TextArea />
      </Form.Item>
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            label="Size"
            name="size"
            rules={[
              {
                required: true,
                message: 'Please input your Size!'
              }
            ]}>
            <Input placeholder="W x H x L" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input your Price!'
              }
            ]}>
            <InputNumber value="0" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Weight"
            name="weight"
            rules={[
              {
                required: true,
                message: 'Please input your Weight!'
              }
            ]}>
            <InputNumber value="0" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

StepProduct.propTypes = {
  typeList: PropTypes.array,
  categoryList: PropTypes.array,
  productSelected: PropTypes.object,
  action: PropTypes.string,
  form: PropTypes.any
}

export default StepProduct
