import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Empty, Form, Input, Modal, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import { beforeUpload, getBase64 } from 'utils/images'
import { UploadEx } from 'styles/Upload/index.style'

const ManagBanner = (props) => {
  const { visible, onOk, onCancel, action, TrNo, typeSelected } = props
  const [form] = Form.useForm()
  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState()
  const onFinish = (values) => {
    const data = {
      link: values.link === undefined ? '' : values.link,
      image: values.image === undefined ? null : values.image.file.originFileObj
    }
    if (action === ACTION.EDIT) {
      data.id = typeSelected.id
    }
    onOk(data)
  }

  useEffect(() => {
    if (action === ACTION.EDIT) {
      form.setFieldsValue({
        link: typeSelected.link
      })
      setimageUrl(typeSelected.image)
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
      title={`${action} Promotion`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="ManagBanner" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form
        form={form}
        name="ManagBanner"
        onFinish={onFinish}
        layout="vertical">
        <p>No : {TrNo}</p>
        <Form.Item label="Link" name="link">
          <Input />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <UploadEx
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
          </UploadEx>
        </Form.Item>
      </Form>
    </Modal>
  )
}

ManagBanner.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManagBanner
