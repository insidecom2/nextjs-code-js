import React, { useState } from 'react'
import { Form, Modal, Upload } from 'antd'
import { beforeUpload, getBase64, getPreviewBase64 } from 'utils/images'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const StepImage = (props) => {
  const [loading, setLoading] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false)
    }
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getPreviewBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    )
    setPreviewVisible(true)
  }

  const onCancel = () => {
    setPreviewVisible(false)
    setPreviewTitle('')
    setPreviewImage('')
  }

  return (
    <div>
      <Form.Item name="image" valuePropName="upload">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={true}
          beforeUpload={beforeUpload}
          onPreview={handlePreview}
          onChange={handleChange}>
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
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={onCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Form.Item>
    </div>
  )
}

export default StepImage
