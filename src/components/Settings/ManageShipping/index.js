import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Radio, Upload } from 'antd'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import { beforeUpload, getBase64 } from 'utils/images'

const ManageShipping = (props) => {
  const { visible, onOk, onCancel, action, TrNo, typeSelected } = props
  const [form] = Form.useForm()
  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState()

  const onFinish = (values) => {
    console.log(values)
    const data = {
      title: values.title,
      type: values.type,
      price: values.price,
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
        type: typeSelected.type,
        price: typeSelected.price
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
          label="หัวข้อ"
          name="title"
          rules={[
            {
              required: true,
              message: 'กรุณาระบุข้อมูล!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="ประเภท"
          name="type"
          rules={[
            {
              required: true,
              message: 'กรุณาระบุข้อมูล!'
            }
          ]}>
          <Radio.Group>
            <Radio.Button value="Pick-Up">Pick-Up</Radio.Button>
            <Radio.Button value="Drop-Off">Drop-Off</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="ราคา"
          name="price"
          rules={[
            {
              required: true,
              message: 'กรุณาระบุข้อมูล!'
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
