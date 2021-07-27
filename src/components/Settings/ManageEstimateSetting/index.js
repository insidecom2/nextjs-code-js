import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, InputNumber } from 'antd'
import { ACTION } from 'utils/constants.js'

const ManageEstimateSetting = (props) => {
  const { visible, onOk, onCancel, action, TrNo, estimateSettingSelected } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    const data = {
      size: values.size,
      name: values.name,
      unit: values.unit,
      price100: values.price100,
      price500: values.price500,
      price1000: values.price1000,
    }
    if (action===ACTION.EDIT) {
        data.id = estimateSettingSelected.id;
    }
    onOk(data)
  }

  useEffect(() => {
    if (action === ACTION.EDIT) {
      form.setFieldsValue({
        name: estimateSettingSelected.name,
        size: estimateSettingSelected.size,
        unit: estimateSettingSelected.unit,
        price100: estimateSettingSelected.price100,
        price500: estimateSettingSelected.price500,
        price1000: estimateSettingSelected.price1000
      })
    }
  }, [estimateSettingSelected])


  return (
    <Modal
      closable={false}
      title={`${action} การตั้งค่า Estimate`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="updateEstimateSetting" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <h4>No : {TrNo}</h4>
      <Form
        form={form}
        name="updateEstimateSetting"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Name:"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Estimate Setting Name!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Size:"
          name="size"
          rules={[
            {
              required: true,
              message: 'Please input your size!'
            }
          ]}>
          <InputNumber />
          
        </Form.Item>
        <Form.Item
          label="Unit:"
          name="unit"
          rules={[
            {
              required: true,
              message: 'Please input your unit!'
            }
          ]}>
          <Input />
          
        </Form.Item>
        <Form.Item
          label="ราคา 100 ใบ:"
          name="price100"
          rules={[
            {
              required: true,
              message: 'Please input your price!'
            }
          ]}>
          <InputNumber />
          
        </Form.Item>
        <Form.Item
          label="ราคา 500 ใบ:"
          name="price500"
          rules={[
            {
              required: true,
              message: 'Please input your price!'
            }
          ]}>
          <InputNumber />
          
        </Form.Item>
        <Form.Item
          label="ราคา 1000 ใบ:"
          name="price1000"
          rules={[
            {
              required: true,
              message: 'Please input your price!'
            }
          ]}>
          <InputNumber />
          
        </Form.Item>
      </Form>
    </Modal>
  )
}

ManageEstimateSetting.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageEstimateSetting
