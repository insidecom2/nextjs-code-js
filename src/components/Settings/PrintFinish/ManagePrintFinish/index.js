import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Switch } from 'antd'

const ManagePrintFinish = (props) => {
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
      title={`${action} Print Finish`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          form="managePrintFinish"
          key="ok"
          type="primary"
          htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form
        form={form}
        name="managePrintFinish"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Print Finish Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Print Finish Name!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Print Finish Code"
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your Print Finish Code!'
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

ManagePrintFinish.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManagePrintFinish
