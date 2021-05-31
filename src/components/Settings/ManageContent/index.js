import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Row, Select, Upload } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { getContentTypeList } from 'store/reducers/contentType'
import { beforeUpload, getBase64 } from 'utils/images'
import _ from 'lodash'
import Editor from 'components/Shared/TextEditor'
import SelectMedia from 'components/Settings/ManageContent/SelectMedia'

const ManageContent = (props) => {
  const { visible, onOk, onCancel, action, typeSelected } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [contentEditor, setContentEditor] = useState('')
  const [mediaModal, setMediaModal] = useState(false)
  const [imageList, setImageList] = useState([])

  const { contentTypeList } = useSelector(
    (state) => ({
      contentTypeList: state.contentType.ContentTypeList
    }),
    []
  )

  useDeepEffect(() => {
    async function fetchData() {
      await dispatch(getContentTypeList())
    }
    fetchData()
  }, [])

  useDeepEffect(() => {
    if (action === ACTION.EDIT && !_.isNull(typeSelected)) {
      form.setFieldsValue({
        content_type: typeSelected.content_type.id,
        title: typeSelected.title,
        seo_title: typeSelected.seo_title,
        seo_meta_description: typeSelected.seo_meta_description
      })
      setImageUrl(typeSelected.image)
      setContentEditor(typeSelected.detail)
    }
  }, [typeSelected])

  const onFinish = (values) => {
    const data = {
      title: values.title,
      content_type: values.content_type,
      detail: contentEditor,
      seo_title: values.seo_title,
      seo_meta_description: values.seo_meta_description,
      image: values.image === undefined ? [] : values.image.file.originFileObj
    }

    if (action === ACTION.EDIT) {
      data.id = typeSelected.id
    }
    onOk(data)
  }
  
  // console.log(contentEditor)
  const changeEditor = (html) => setContentEditor(html)

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

  const okSelect = () => {
    setMediaModal(false)
  }

  const cancelSelect = () => {
    setMediaModal(false)
  }

  return (
    <Modal
      width={1500}
      closable={false}
      title={`${action} Content`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          form="ManageContentType"
          key="ok"
          type="primary"
          htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form
        form={form}
        name="ManageContentType"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Content type"
          name="content_type"
          rules={[
            {
              required: true,
              message: 'Please input your content type!'
            }
          ]}>
          <Select>
            {contentTypeList.map((val) => (
              <Select.Option key={val.id} value={val.id}>
                {val.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your Title!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="mt-4">
            <Button
              onClick={() => setMediaModal(true)}
              style={{ marginBottom: 10 }}>
              เพิ่มสื่อ
            </Button>
            <Editor textData={typeSelected.detail} changeEditor={changeEditor} />
          </div>
        </Form.Item>
        <Form.Item
          label="Seo title"
          name="seo_title"
          rules={[
            {
              required: true,
              message: 'Please input your seo title!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Meta description"
          name="seo_meta_description"
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
        {mediaModal && (
          <SelectMedia
            visible={mediaModal}
            onCancel={cancelSelect}
            onOk={okSelect}
            setImageList={setImageList}
          />
        )}
      </Form>
    </Modal>
  )
}

ManageContent.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageContent
