import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Switch } from 'antd'
import { useSelector } from 'react-redux'

const UpdateCategory = (props) => {
  const { visible, onOk, onCancel, action } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    const data = {
      name: values.name
    }
    onOk(category.id, data)
  }

  const { category, isLoading } = useSelector(
    (state) => ({
      isLoading: state.category.isLoading,
      category: state.category.category
    }),
    []
  )

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
      <h4>Code : {category.code}</h4>
      <Form
        form={form}
        name="updateCategory"
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
          ]}
          initialValue={category.name}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

UpdateCategory.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default UpdateCategory
