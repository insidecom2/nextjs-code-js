import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const ManageSize = (props) => {
  const { visible, onOk, onCancel, action, TrNo } = props
  const [form] = Form.useForm()

  const { typeWidth, typeHeight, typeLength, typeId } = useSelector(
    (state) => ({
      typeWidth: action==='Edit'?state.size.categoryType.width:"",
      typeHeight: action==='Edit'?state.size.categoryType.height:"",
      typeLength: action==='Edit'?state.size.categoryType.length:"",
      typeId: action==='Edit'?state.size.categoryType.id:""
    }),
    []
  )

  const onFinish = (values) => {
    const data = {
      width: values.width,
      height: values.height,
      length: values.length
    }
    onOk(typeId, data)
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
        initialValue={typeWidth}>
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
        initialValue={typeHeight}>
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
        initialValue={typeLength}>
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
