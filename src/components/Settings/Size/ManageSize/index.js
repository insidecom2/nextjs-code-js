import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, InputNumber, Modal, Row, Switch } from 'antd'

const ManageSize = (props) => {
  const { visible, onOk, onCancel, action } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    const data = {
      width: values.width,
      length: values.length,
      height: values.height
    }

    onOk(data)
  }

  return (
    <Modal
      closable={false}
      width={800}
      title={`${action} Size`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="manageSize" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form form={form} name="manageSize" onFinish={onFinish} layout="vertical">
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              label="Width"
              name="width"
              rules={[
                {
                  required: true,
                  message: 'Please input your width!'
                }
              ]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Length"
              name="length"
              rules={[
                {
                  required: true,
                  message: 'Please input your length!'
                }
              ]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Height"
              name="height"
              rules={[
                {
                  required: true,
                  message: 'Please input your height!'
                }
              ]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
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
