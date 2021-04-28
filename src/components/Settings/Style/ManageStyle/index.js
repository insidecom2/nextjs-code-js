import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Switch } from 'antd'

const ManageStyle = (props) => {
  const { visible, onOk, onCancel, action } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    const data = {
      name: values.name,
      image: `https://picsum.photos/200`,
      render_2d: '',
      render_3d: '',
      video_link: ''
    }

    onOk(data)
  }

  return (
    <Modal
      closable={false}
      title={`${action} Style`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="manageStyle" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form
        form={form}
        name="manageStyle"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Style Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Style Name!'
            }
          ]}>
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  )
}

ManageStyle.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageStyle
