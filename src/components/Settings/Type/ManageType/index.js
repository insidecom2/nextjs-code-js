import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  Icon,
  message,
  Row
} from 'antd'
import { useSelector } from 'react-redux'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import _ from 'lodash'

const ManageType = (props) => {
  const { visible, onOk, onCancel, action, typeSelected } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const { categoryList, categoryType } = useSelector(
    (state) => ({
      categoryList: state.category.categoryList
    }),
    []
  )

  const onFinish = (values) => {
    console.log('values', values)

    const data = {
      code: values.code,
      name: values.name,
      image: values.image === undefined ? '' : values.image.file.originFileObj,
      category: values.category
    }

    if (action === ACTION.EDIT) {
      data.id = typeSelected.id
    }

    onOk(data)
  }

  useEffect(() => {
    if (action === ACTION.EDIT && !_.isNull(typeSelected)) {
      form.setFieldsValue({
        category: typeSelected.id,
        name: typeSelected.name,
        code: typeSelected.code
      })
      setImageUrl(typeSelected.image)
    }
  }, [typeSelected])

  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!'
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
              message: 'Please input your code!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Row justify="center">
          <Form.Item label="Image" name="image">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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

ManageType.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageType
