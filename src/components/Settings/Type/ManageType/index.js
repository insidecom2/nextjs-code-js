import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select } from 'antd'
import { useSelector } from 'react-redux'

const ManageType = (props) => {
  const { visible, onOk, onCancel, action } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    const data = {
      code: values.code,
      name: values.name,
      image: `https://picsum.photos/200`,
      category: values.category
    }

    onOk(data)
  }

  const { categoryList, isLoading } = useSelector(
    (state) => ({
      isLoading: state.categoryType.isLoading,
      categoryList: state.category.categoryList
    }),
    []
  )

  return (
    <Modal
      closable={false}
      title={`${action} Category Type`}
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
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: 'Please input your Type!'
            }
          ]}>
          <Select>
            {categoryList.map((val) => (
              <Select.Option key={val.id} value={val.id}>
                {val.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Type Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Type Name!'
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

ManageType.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageType
