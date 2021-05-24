import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd'
import { useSelector } from 'react-redux'
import { ACTION } from 'utils/constants.js'

const ManageCategory = (props) => {
  const { visible, onOk, onCancel, action, TrNo } = props
  const [form] = Form.useForm()

  const { typeId, CategoryValue } = useSelector(
    (state) => ({
      CategoryValue: state.category.category,
      typeId: action === ACTION.EDIT ? state.category.category.id : ''
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

  useEffect(() => {
    if (action === ACTION.EDIT) {
      form.setFieldsValue({
        name: CategoryValue.name,
        code: CategoryValue.code
      })
    }
  }, [CategoryValue])

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
          ]}>
          {action !== 'Edit' ? <Input /> : <label>{CategoryValue.code}</label>}
        </Form.Item>
        <Form.Item
          label="Category Name:"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Category Name!'
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
