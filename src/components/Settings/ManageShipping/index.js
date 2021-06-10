import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd'
import { useSelector } from 'react-redux'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import { beforeUpload, getBase64 } from 'utils/images'

const ManageShipping = (props) => {
  const { visible, onOk, onCancel, action, TrNo, typeSelected } = props
  const [form] = Form.useForm()
  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState()

  const onFinish = (values) => {
    const data = {
      title: values.title,
      username: values.username,
      password: values.password,
      secert_key: values.secert_key,
      logo: values.image === undefined ? [] : values.image.file.originFileObj
    }
    if (action === ACTION.EDIT) {
      data.id = typeSelected.id
    }
    onOk(data)
  }

  //   console.log(typeSelected)

  useEffect(() => {
    if (action === ACTION.EDIT) {
      form.setFieldsValue({
        title: typeSelected.title,
        username: typeSelected.username,
        password: typeSelected.password,
        secert_key: typeSelected.secert_key
      })
      setimageUrl(typeSelected.logo)
    }
  }, [typeSelected])
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setloading(true)
      getBase64(info.file.originFileObj, (imageUrl) => setimageUrl(imageUrl))
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setloading(false)
    }
  }

  return (
    <Modal
      closable={false}
      title={`${action} Shipping`}
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
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your title!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Secert Key"
          name="secert_key"
          rules={[
            {
              required: true,
              message: 'Please input your secert key!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <Upload
            fileList={null}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}>
            <div>
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ height: '100px' }} />
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
      </Form>
    </Modal>
  )
}

ManageShipping.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageShipping
