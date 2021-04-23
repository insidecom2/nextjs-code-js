import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Switch, Select, Upload, Icon } from 'antd'
import { useSelector } from 'react-redux'

const UpdateSize = (props) => {
  const { visible, onOk, onCancel, action, TrNo } = props
  const [form] = Form.useForm()

  const { ThePosition } = useSelector(
    (state) => ({
      ThePosition: state.size.categoryType,
    }),
    []
  )
  
  // console.log(ThePosition)

  const onFinish = (values) => {
    const data = {
      width: values.width,
      height: values.height,
      length: values.length
    }
     onOk(ThePosition.id, data)
  }

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
          ]}
          initialValue={ThePosition.width}>
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
          ]}
          initialValue={ThePosition.height}>
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
          ]}
          initialValue={ThePosition.length}>
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  )
}

UpdateSize.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default UpdateSize
