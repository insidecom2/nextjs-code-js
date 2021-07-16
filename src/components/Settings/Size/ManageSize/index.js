import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd'
import { useSelector } from 'react-redux'
import { ACTION } from 'utils/constants.js'
const ManageSize = (props) => {
  const { visible, onOk, onCancel, action, TrNo } = props
  const [form] = Form.useForm()

  const { SizeValue } = useSelector(
    (state) => ({
      SizeValue: state.size.categoryType
    }),
    []
  )

  const onFinish = (values) => {
    const data = {
      width: values.width,
      height: values.height,
      length: values.length
    }
    onOk(SizeValue.id, data)
  }

  useEffect(() => {
    if (action === ACTION.EDIT) {
      form.setFieldsValue({
        width: SizeValue.width,
        height: SizeValue.height,
        length: SizeValue.length
      })
    }
  }, [SizeValue])

  return (
    <Modal
      closable={false}
      title={`${action} Size`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="manageType" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form form={form} name="manageType" onFinish={onFinish} layout="vertical">
        <p>No : {TrNo}</p>
        <Form.Item
          label="Width"
          name="width"
          rules={[
            {
              required: true,
              message: 'Please input width!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Height"
          name="height"
          rules={[
            {
              required: true,
              message: 'Please input height!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Length"
          name="length"
          rules={[
            {
              required: true,
              message: 'Please input length!'
            }
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

ManageSize.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageSize
