import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd'
import { useSelector } from 'react-redux'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import { beforeUpload, getBase64 } from 'utils/images'
const ManageStyle = (props) => {
  const { visible, onOk, onCancel, action, TrNo } = props
  const [form] = Form.useForm()
  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState()

  const { typeId, defaultImage, styleValue } = useSelector(
    (state) => ({
      typeId: action === 'Edit' ? state.style.categoryType.id : '',
      styleValue: state.style.categoryType,
      defaultImage: action === 'Edit' ? state.style.categoryType.image : ''
    }),
    []
  )

  const onFinish = (values) => {
    const data = {
      name: values.name,
      image: values.image ? values.image.file.originFileObj : null,
      render_2d: values.render_2d,
      render_3d: values.render_3d,
      video_link: values.video
    }

    onOk(typeId, data)
  }

  useEffect(() => {
    if (action === ACTION.EDIT) {
      form.setFieldsValue({
        name: styleValue.name,
        render_2d: styleValue.render_2d,
        render_3d: styleValue.render_3d,
        video: styleValue.video_link
      })
    }
    setimageUrl(defaultImage)
  }, [styleValue])
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
      title={`${action} Style`}
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
          label="2D"
          name="render_2d"
          rules={[
            {
              required: true,
              message: 'Please input your 2D!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="3D"
          name="render_3d"
          rules={[
            {
              required: true,
              message: 'Please input your 3D!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Video Link"
          name="video"
          rules={[
            {
              required: true,
              message: 'Please input your video link!'
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

ManageStyle.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageStyle
