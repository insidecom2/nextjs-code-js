import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd'
import { useSelector } from 'react-redux'
import { ACTION } from 'utils/constants.js'
import { beforeUpload, getBase64 } from 'utils/images'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const ManageCategory = (props) => {
  const { visible, onOk, onCancel, action, TrNo } = props
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
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
      name: values.name,
      description: values.description,
      image: values.image === undefined?[] : values.image.file.originFileObj,
    }
    if (action===ACTION.EDIT) {
        data.id = typeId;
    }
    onOk(data)
  }

  useEffect(() => {
    if (action === ACTION.EDIT) {
      form.setFieldsValue({
        name: CategoryValue.name,
        code: CategoryValue.code,
        description: CategoryValue.description
      })
      setImageUrl(CategoryValue.image)
    }
  }, [CategoryValue])

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false)
      getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl))
    }
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
        <Form.Item
          label="Description:"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your description!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Row justify="center">
          <Form.Item label="Image" name="image" valuePropName="upload">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}>
              <div>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ height: '100px' }}
                  />
                ) : (
                  <div style={{ marginTop: 8 }}>
                    {loading ? (
                      <LoadingOutlined />
                    ) : (
                      <div>
                        <PlusOutlined />
                        <br />
                        <label>Upload</label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Upload>
          </Form.Item>
        </Row>
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
