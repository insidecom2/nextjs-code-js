import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Switch } from 'antd'

const ManageCategory = (props) => {
  const { visible, onOk, onCancel, action } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    const data = {
      code: values.code,
      name: values.name
    }
    onOk(data)
  }

  return (
    <Modal
      closable={false}
      title={`${action} Category`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="manageCategory" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form
        form={form}
        name="manageCategory"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Category Name!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Code"
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your Code!'
            }
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

ManageCategory.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageCategory
