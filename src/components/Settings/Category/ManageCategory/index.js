import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd';
import { useSelector } from 'react-redux';

const ManageCategory = (props) => {
  const { visible, onOk, onCancel, action, TrNo } = props
  const [form] = Form.useForm()

  const { typeCode, typeName, typeId } = useSelector(
    (state) => ({
      typeCode: action==='Edit'?state.category.category.code:"",
      typeName: action==='Edit'?state.category.category.name:"",
      typeId: action==='Edit'?state.category.category.id:""
    }),
    []
  )

  const onFinish = (values) => {
    const data = {
      code: values.code,
      name: values.name
    }
    onOk(typeId, data)
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
        <Button form="updateCategory" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <h4>No : {TrNo}</h4>
      <Form
        form={form}
        name="updateCategory"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Category Code:"
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your Category Code!'
            }
          ]}
          initialValue={typeCode}>
         { action!=='Edit'?<Input />:<label>{typeCode}</label>

}
        </Form.Item>
        <Form.Item
          label="Category Name:"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Category Name!'
            }
          ]}
          initialValue={typeName}>
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
