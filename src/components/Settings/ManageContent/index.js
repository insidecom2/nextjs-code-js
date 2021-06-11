import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Space,
  Card,
  Checkbox,
  Col,
  Button,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION, CONTENT_PAGE } from 'utils/constants.js'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { getContentTypeList } from 'store/reducers/contentType'
import { beforeUpload, getBase64 } from 'utils/images'
import Editor from 'components/Shared/TextEditor'
import SelectMedia from 'components/Settings/ManageContent/SelectMedia'
import { UploadEx } from 'styles/Upload/index.style'

const ManageContent = (props) => {
  const { visible, onOk, onCancel, action, typeSelected } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [contentEditor, setContentEditor] = useState('')
  const [mediaModal, setMediaModal] = useState(false)
  const [imageList, setImageList] = useState([])
  const [abountCurSor, SetAbountCurSor] = useState()

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

  const plainOptions = [
    'Title',
    'Description',
    'Focus Key',
    'Content',
    'Image',
    'Link'
  ]
  const [options, setOptions] = useState([])
  const [Title, setTitle] = useState(
    action === ACTION.EDIT ? typeSelected.seo_title.length : 0
  )
  const [focusKeyphrase, setFocusKeyphrase] = useState(0)
  const [description, setDescription] = useState(
    action === ACTION.EDIT ? typeSelected.seo_meta_description.length : 0
  )
  const [detailContent, setDetailContent] = useState(0)
  const [searchFocus, setSearchFocus] = useState(null)
  const [contentInnerText, setContentInnerText] = useState()
  const [checkImage, setCheckImage] = useState()
  const [checkLink, setCheckLink] = useState()

  const stringToHTML = (str) => {
    var parser = new DOMParser()
    var doc = parser.parseFromString(str, 'text/html')
    return doc.body
  }

  const changeEditor = (editor) => {
    let str = editor.getContent({ format: 'text' })
    setContentEditor(editor.getContent())
    setCheckImage(
      stringToHTML(editor.getContent()).getElementsByTagName('img').length
    )
    setDetailContent(str.length)
    setContentInnerText(str)
    setCheckLink(
      stringToHTML(editor.getContent()).getElementsByTagName('a').length
    )
  }

  const FocusKey = (e) => {
    let ValueOf = e.target.value
    setSearchFocus(contentInnerText.search(ValueOf))
    setFocusKeyphrase(ValueOf.length)
  }

  useDeepEffect(() => {
    let countPlainOptions = [...plainOptions]
    Title >= CONTENT_PAGE.TITLE
      ? (countPlainOptions[0] = 'Title')
      : (countPlainOptions[0] = undefined)
    description >= CONTENT_PAGE.DESCRIPTION
      ? (countPlainOptions[1] = 'Description')
      : (countPlainOptions[1] = undefined)
    setOptions(countPlainOptions)
    focusKeyphrase > CONTENT_PAGE.FOCUSKEY &&
    searchFocus === CONTENT_PAGE.FOCUSKEY
      ? (countPlainOptions[2] = 'Focus Key')
      : (countPlainOptions[2] = undefined)
    setOptions(countPlainOptions)
    detailContent >= CONTENT_PAGE.CONTENT
      ? (countPlainOptions[3] = 'Content')
      : (countPlainOptions[3] = undefined)
    checkImage > 0
      ? (countPlainOptions[4] = 'Image')
      : (countPlainOptions[4] = undefined)
    checkLink > 0
      ? (countPlainOptions[5] = 'Link')
      : (countPlainOptions[5] = undefined)
    setOptions(countPlainOptions)
  }, [description, Title, focusKeyphrase, detailContent, checkImage, checkLink])

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

  const clickCurSor = (evt, editor) => {
    SetAbountCurSor({
      editor: editor
    })
  }

  const okSelect = () => {
    for (let Count = 0; Count < imageList.length; Count++) {
      let range = abountCurSor.editor.selection.getRng()
      let newNode = abountCurSor.editor.getDoc().createElement('img')
      newNode.src = imageList[Count]
      range.insertNode(newNode)
    }
    setContentEditor(abountCurSor.editor.getContent())
    setCheckImage(imageList.length)
    setMediaModal(false)
    // const pushImg = imageList.map((item)=>"<img  src={item}/>")
    // console.log(...pushImg)
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
        <Row>
          <Col span={20}>
            <Row>
              <Col span={24}>
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
              </Col>
            </Row>

            <Row>
              <Col span={24}>
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
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <div className="mt-4">
                  <Button
                    onClick={() => setMediaModal(true)}
                    style={{ marginBottom: 10 }}>
                    เพิ่มสื่อ
                  </Button>
                  <Form.Item>
                    <Row>
                      <Col span={24}>
                        <Editor
                          clickCurSor={clickCurSor}
                          textData={
                            action === ACTION.EDIT ? typeSelected.detail : ''
                          }
                          changeEditor={changeEditor}
                        />
                      </Col>
                      <Col span={4}></Col>
                    </Row>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Focus keyphrase"
                  name="focus_keyphrase"
                  help={
                    focusKeyphrase > CONTENT_PAGE.FOCUSKEY
                      ? searchFocus === CONTENT_PAGE.FOCUSKEY
                        ? undefined
                        : 'key not match!'
                      : 'Please input seo focus keyphrase!'
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Please input seo focus keyphrase!'
                    }
                  ]}>
                  <Input onChange={FocusKey} />
                </Form.Item>
                <Form.Item
                  label="Seo title"
                  name="seo_title"
                  help={
                    Title >= CONTENT_PAGE.TITLE
                      ? undefined
                      : Title === 0
                      ? 'Please input your seo title!'
                      : 'Title must be minimum ' +
                        String(CONTENT_PAGE.TITLE) +
                        ' characters.'
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Please input your seo title!'
                    },
                    {
                      min: 20,
                      message:
                        'Title must be minimum ' +
                        String(CONTENT_PAGE.TITLE) +
                        ' characters.'
                    }
                  ]}>
                  <Input onChange={(e) => setTitle(e.target.value.length)} />
                </Form.Item>
                <Form.Item
                  label="Meta description"
                  name="seo_meta_description"
                  help={
                    description >= CONTENT_PAGE.DESCRIPTION
                      ? undefined
                      : description === 0
                      ? 'Please input your description!'
                      : 'Description must be minimum ' +
                        String(CONTENT_PAGE.DESCRIPTION) +
                        ' characters.'
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Please input your description!'
                    },
                    {
                      min: CONTENT_PAGE.DESCRIPTION,
                      message:
                        'Description must be minimum ' +
                        String(CONTENT_PAGE.DESCRIPTION) +
                        ' characters.'
                    }
                  ]}>
                  <Input
                    onChange={(e) => setDescription(e.target.value.length)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row style={{ paddingLeft: 20 }}>
              <Space direction="vertical">
                <Card title="Check SEO">
                  <Checkbox.Group options={plainOptions} value={options} />
                </Card>
              </Space>
            </Row>
            <Row justify="center" style={{ paddingTop: 20, paddingLeft: 20 }}>
              <Form.Item
                label="รูปประจำเรื่อง"
                name="image"
                valuePropName="upload">
                <UploadEx
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}>
                  <div style={{ width: 200, maxWidth: '100%' }}>
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
                </UploadEx>
              </Form.Item>
            </Row>
          </Col>
        </Row>

        {mediaModal && (
          <SelectMedia
            visible={mediaModal}
            onCancel={cancelSelect}
            onOk={okSelect}
            setImageList={setImageList}
            abountCurSor={abountCurSor}
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
