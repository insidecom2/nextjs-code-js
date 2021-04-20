import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Switch } from 'antd'

const ManageMaterial = (props) => {
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
      title={`${action} Material`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="manageMaterial" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form
        form={form}
        name="manageMaterial"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Material Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Material Name!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Material Code"
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your Material Code!'
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

ManageMaterial.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageMaterial
