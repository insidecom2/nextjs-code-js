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
import { CheckSeo } from 'styles/checkSeo/index.style'

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
  const [headOne, setHeadOne] = useState(0)
  const [headTwo, setHeadTwo] = useState(0)
  const [headThree, setHeadThree] = useState(0)
  const [headFour, setHeadFour] = useState(0)
  const [headFive, setHeadFive] = useState(0)
  const [headSix, setHeadSix] = useState(0)
  const [options, setOptions] = useState([])
  const [Title, setTitle] = useState(
    action === ACTION.EDIT ? typeSelected.seo_title.length : 0
  )
  const [focusKeyphrase, setFocusKeyphrase] = useState(
    action === ACTION.EDIT ? typeSelected.focus_key.length : 0
  )
  const [searchFocus, setSearchFocus] = useState(null)
  const [description, setDescription] = useState(
    action === ACTION.EDIT ? typeSelected.seo_meta_description.length : 0
  )
  const [detailContent, setDetailContent] = useState(0)
  const [contentInnerText, setContentInnerText] = useState()
  const [checkImage, setCheckImage] = useState()
  const [checkLink, setCheckLink] = useState()

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
        seo_meta_description: typeSelected.seo_meta_description,
        focus_keyphrase: typeSelected.focus_key
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
    'Link',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    '1000Char'
  ]
  const listEffect = [
    Title,
    description,
    focusKeyphrase,
    options,
    checkImage,
    checkLink,
    headOne,
    headTwo,
    headThree,
    headFour,
    headFive,
    headSix,
    detailContent
  ]

  const stringToHTML = (str) => {
    let parser = new DOMParser()
    let doc = parser.parseFromString(str, 'text/html')
    return doc.body
  }

  const [detectFocusKey, setDetectFocusKey] = useState(
    action === ACTION.EDIT ? typeSelected.focus_key : ''
  )
  const [detectTitle, setDetectTitle] = useState(Title)
  const [detectSeoTitle, setDetectSeoTitle] = useState(
    action === ACTION.EDIT ? typeSelected.seo_meta_description : ''
  )
  const [detectDescription, setDetectDescription] = useState()
  const [detectContent, setDetectContent] = useState()

  const changeEditor = (editor) => {
    const str = editor.getContent({ format: 'text' })
    const theContent = String(editor.getContent()).replace(
      /<[^/>][^>]*>&nbsp;<\/[^>]+>/,
      ''
    )
    setContentEditor(theContent)
    setCheckImage(
      stringToHTML(editor.getContent()).getElementsByTagName('img').length
    )
    setDetailContent(str.length)
    setContentInnerText(str)
    setDetectContent(str)
    setCheckLink(
      stringToHTML(editor.getContent()).getElementsByTagName('a').length
    )
    if (action === ACTION.EDIT) {
      if (str[0] === typeSelected.focus_key[0]) {
        setSearchFocus(0)
      } else {
        setSearchFocus(null)
      }
    }
    setHeadOne(stringToHTML(theContent).getElementsByTagName('h1').length)
    setHeadTwo(stringToHTML(theContent).getElementsByTagName('h2').length)
    setHeadThree(stringToHTML(theContent).getElementsByTagName('h3').length)
    setHeadFour(stringToHTML(theContent).getElementsByTagName('h4').length)
    setHeadFive(stringToHTML(theContent).getElementsByTagName('h5').length)
    setHeadSix(stringToHTML(theContent).getElementsByTagName('h6').length)
  }

  const FocusKey = (e) => {
    let ValueOf = e.target.value
    setSearchFocus(contentInnerText.search(ValueOf))
    setFocusKeyphrase(ValueOf.length)
  }

  useDeepEffect(() => {
    const checkFocusList = [
      String(detectTitle).search(String(detectFocusKey)),
      String(detectSeoTitle).search(String(detectFocusKey)),
      String(detectDescription).search(String(detectFocusKey)),
      String(detectContent).search(String(detectFocusKey))
    ]
    let AllTrue = (arr) => arr.every((v) => v > -1)
    // console.log(AllTrue(checkFocusList))
    // console.log(checkFocusList)
    let countPlainOptions = [...plainOptions]
    for (let Count = 0; Count < listEffect.length; Count++) {
      if (Count < 2) {
        let checkCount =
          Count === 0 ? CONTENT_PAGE.TITLE : CONTENT_PAGE.DESCRIPTION
        if (listEffect[Count] >= checkCount) {
          countPlainOptions[Count] = plainOptions[Count]
        } else {
          countPlainOptions[Count] = undefined
        }
      }
      if (Count === 2) {
        if (
          Boolean(
            listEffect[Count] > CONTENT_PAGE.FOCUSKEY &&
              searchFocus === CONTENT_PAGE.FOCUSKEY &&
              AllTrue(checkFocusList) &&
              detectFocusKey !== ''
          )
        ) {
          countPlainOptions[Count] = plainOptions[Count]
        } else {
          countPlainOptions[Count] = undefined
        }
      }
      if (Count > 3) {
        if (listEffect[Count] > 0) {
          countPlainOptions[Count] = plainOptions[Count]
        } else {
          countPlainOptions[Count] = undefined
        }
      }
      if (Count === 12) {
        if (listEffect[Count] >= CONTENT_PAGE.CONTENT) {
          countPlainOptions[Count] = plainOptions[Count]
        } else {
          countPlainOptions[Count] = undefined
        }
      }
      const newValueChecker = [...options.filter((item, index) => index > 3)]
      let index = newValueChecker.indexOf(undefined)
      if (Number(index) === -1) {
        countPlainOptions[3] = plainOptions[3]
      } else {
        countPlainOptions[3] = undefined
      }
    }
    setOptions(countPlainOptions)
  }, [
    description,
    Title,
    focusKeyphrase,
    searchFocus,
    detailContent,
    checkImage,
    checkLink,
    headOne,
    headTwo,
    headThree,
    headFour,
    headFive,
    headSix,
    detectFocusKey,
    detectTitle,
    detectSeoTitle,
    detectDescription,
    detectContent
  ])

  // console.log(options)

  const onFinish = (values) => {
    const data = {
      title: values.title,
      content_type: values.content_type,
      detail: contentEditor,
      seo_title: values.seo_title,
      seo_meta_description: values.seo_meta_description,
      focus_key: values.focus_keyphrase,
      image:
        values.image === undefined ? false : values.image.file.originFileObj
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
                  onChange={(e) => setDetectTitle(e.target.value)}
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
                  onChange={(e) => setDetectFocusKey(e.target.value)}
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
                      required: false,
                      message: 'Please input seo focus keyphrase!'
                    }
                  ]}>
                  <Input onChange={FocusKey} />
                </Form.Item>
                <Form.Item
                  label="Seo title"
                  name="seo_title"
                  onChange={(e) => setDetectSeoTitle(e.target.value)}
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
                      required: false,
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
                  onChange={(e) => setDetectDescription(e.target.value)}
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
                      required: false,
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
                  <CheckSeo options={plainOptions} value={options} />
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
