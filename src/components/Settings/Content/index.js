import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, message, Modal, Row, Select, Upload } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import _ from 'lodash'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { getContentTypeList } from 'store/reducers/contentType'
import { beforeUpload, getBase64 } from 'utils/images'

const ManageContent = (props) => {
  const { visible, onOk, onCancel, action, typeSelected } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}
  const { contentTypeList } = useSelector(
    (state) => ({
      contentTypeList: state.contentType.ContentTypeList
    }),
    []
  )

  //   console.log(typeSelected)

  useDeepEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
  }, [])

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
        detail: typeSelected.detail,
        seo_title: typeSelected.seo_title,
        seo_meta_description: typeSelected.seo_meta_description
      })
      setImageUrl(typeSelected.image)
    }
  }, [typeSelected])

  const onFinish = (values) => {
    const data = {
      title: values.title,
      content_type: values.content_type,
      detail: values.detail,
      seo_title: values.seo_title,
      seo_meta_description: values.seo_meta_description,
      image: values.image === undefined ? [] : values.image.file.originFileObj
    }

    if (action === ACTION.EDIT) {
      data.id = typeSelected.id
    }

    onOk(data)
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
      width={1000}
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
        <Form.Item
          label="Detail"
          name="detail"
          rules={[
            {
              required: true,
              message: 'Please input your Detail!'
            }
          ]}>
          <Input />
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
          <div className="mt-4">
            <h2>Using CKEditor 5 build in React</h2>
            {editorLoaded ? (
              <CKEditor
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={(editor) => {
                  console.log('Editor is ready to use!', editor)
                }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  console.log({ event, editor, data })
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor)
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor)
                }}
              />
            ) : (
              <div>loading...</div>
            )}
          </div>
        </Row>
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
