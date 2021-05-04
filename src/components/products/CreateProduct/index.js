import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Switch, Select, InputNumber } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { getCategoryList } from 'store/reducers/category'
import { getCategoryTypeList } from 'store/reducers/categoryType'

const CreateProducts = (props) => {
  const { visible, onOk, onCancel, action } = props
  const [form] = Form.useForm()
  const [type, settype] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoryList())
    dispatch(getCategoryTypeList())
  }, [])

  const { categoryList, isLoading, typeList } = useSelector(
    (state) => ({
      categoryList: state.category.categoryList,
      isLoading: state.category.isLoading,
      typeList: state.categoryType.categoryTypeList
    }),
    []
  )

  const onSelectCategory = async (value) => {
    await settype(typeList.filter((key) => key.category == value))
  }

  const onFinish = (values) => {
    const data = {
      code: values.code,
      name: values.name,
      category_type: values.category_type,
      detail: values.detail,
      price: values.price,
      weight: values.weight,
      size: values.size
    }
    onOk(data)
  }

  return (
    <Modal
      closable={false}
      title={`${action} Type`}
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
          label="Prodcut Code"
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your Code!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Name"
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
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: 'Please input your Category!'
            }
          ]}>
          <Select onChange={onSelectCategory}>
            {categoryList.map((val) => (
              <Select.Option key={val.id} value={val.id}>
                {val.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: 'Please input your Type!'
            }
          ]}>
          <Select>
            {type.map((val2) => (
              <Select.Option key={val2.id} value={val2.id}>
                {val2.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Detail" name="detail">
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Size"
          name="size"
          rules={[
            {
              required: true,
              message: 'Please input your Size!'
            }
          ]}>
          <Input placeholder="W x H x L" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input your Price!',
              default: 0
            }
          ]}>
          <InputNumber value="0" />
        </Form.Item>
        <Form.Item
          label="Weight"
          name="weight"
          rules={[
            {
              required: true,
              message: 'Please input your Weight!'
            }
          ]}>
          <InputNumber value="0" />
        </Form.Item>
        <Form.Item valuePropName="checked" label="Active" name="is_active">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

CreateProducts.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default CreateProducts
