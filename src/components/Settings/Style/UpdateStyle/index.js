import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Switch, Select, Upload, Icon } from 'antd'
import { useSelector } from 'react-redux'

const UpdateStyle = (props) => {
  const { visible, onOk, onCancel, action, TrNo } = props
  const [form] = Form.useForm()

  const { ThePosition } = useSelector(
    (state) => ({
      ThePosition: state.style.categoryType
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input name!'
            }
          ]}
          initialValue={ThePosition.name}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[
            {
              required: true,
              message: 'Please input image!'
            }
          ]}
          initialValue={ThePosition.image}>
          <Input />
        </Form.Item>
        <Form.Item
          label="2D"
          name="2d"
          rules={[
            {
              required: true,
              message: 'Please input 2D!'
            }
          ]}
          initialValue={ThePosition.render_2d}>
              
          <Input />
        </Form.Item>
        <Form.Item
          label="3D"
          name="3d"
          rules={[
            {
              required: true,
              message: 'Please input 3D!'
            }
          ]}
          initialValue={ThePosition.render_3d}>
              
          <Input />
        </Form.Item>
        <Form.Item
          label="Video"
          name="video"
          rules={[
            {
              required: true,
              message: 'Please input video!'
            }
          ]}
          initialValue={ThePosition.video_link}>
              
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  )
}

UpdateStyle.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default UpdateStyle
