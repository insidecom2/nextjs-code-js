import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Switch } from 'antd'

const ManagePrintSide = (props) => {
  const { visible, onOk, onCancel, action } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    const data = {
      name: values.name,
      code: values.code
    }

    onOk(data)
  }

  return (
    <Modal
      closable={false}
      title={`${action} Print Side`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          form="managePrintSide"
          key="ok"
          type="primary"
          htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form
        form={form}
        name="managePrintSide"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Print Side Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Print Side Name!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Print Side Code"
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your Print Side Code!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item valuePropName="checked" label="Active" name="is_active">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

ManagePrintSide.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManagePrintSide
