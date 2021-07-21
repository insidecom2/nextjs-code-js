import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd'
import { ACTION } from 'utils/constants.js'
import { beforeUpload, getBase64 } from 'utils/images'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const ManageShops = (props) => {
  const { visible, onOk, onCancel, action, TrNo, ShopsSelected } = props
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  //console.log('On Modal',ShopsSelected)

  const onFinish = (values) => {
    console.log(values)
    const data = {
      domain_name: values.domain_name,
      name: values.name,
      url: values.url,
      logo: values.logo === undefined?'' : values.logo.file.originFileObj,
    }
    if (action===ACTION.EDIT) {
        data.id = ShopsSelected.id;
    }
    onOk(data)
  }

  useEffect(() => {
    if (action === ACTION.EDIT) {
      form.setFieldsValue({
        domain_name: ShopsSelected.domain_name,
        name: ShopsSelected.name,
        url: ShopsSelected.url
      })
      setImageUrl(ShopsSelected.logo)
    }
  }, [ShopsSelected])

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
      title={`${action} Shops`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="updateShops" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <h4>No : {TrNo}</h4>
      <Form
        form={form}
        name="updateShops"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Shops Name:"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Shops Name!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Domain name:"
          name="domain_name"
          rules={[
            {
              required: true,
              message: 'Please input your Domain name!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Url:"
          name="url"
          rules={[
            {
              required: true,
              message: 'Please input your Url!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Row justify="center">
          <Form.Item label="Logo" name="logo" valuePropName="upload">
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

ManageShops.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageShops
