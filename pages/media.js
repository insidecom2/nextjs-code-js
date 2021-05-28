import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Col, DatePicker, Form, Modal, Row, Typography, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { createMedia, deleteMedia, getMedia } from 'store/reducers/media'
import moment from 'moment'
import { beforeUpload, getBase64 } from 'utils/images'

const media = () => {
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const StartDate = new Date()
  const dispatch = useDispatch()
  const [statusPreview, setStatusPreview] = useState(true)
  const { MonthPicker } = DatePicker
  const [defaultDate, setDefaultDate] = useState([
    StartDate.getFullYear(),
    ('0' + (StartDate.getMonth() + 1)).slice(-2)
  ])
  const [modalRemoveMedia, setModalRemoveMedia] = useState(false)
  const [urlImageName, setUrlImageName] = useState()

  useDeepEffect(() => {
    fetchData(defaultDate[0], defaultDate[1])
  }, [])

  useDeepEffect(() => {
    setDefaultImg()
  }, [mediaList])

  const { mediaList } = useSelector(
    (state) => ({
      mediaList: state.media.productsList
    }),
    []
  )

  const fetchData = async (Year, Month) => {
    dispatch(getMedia(Year, Month))
  }

  const setDefaultImg = async () => {
    const defaultImg = []
    await mediaList.map((ListImg) => defaultImg.push({ url: ListImg.name }))
    await setFileList(defaultImg)
  }

  const onOkUpload = async (data) => {
    const formData = new FormData()
    formData.append('image', data.image)
    await dispatch(createMedia(formData))
    await fetchData(defaultDate[0], defaultDate[1])
    await setDefaultImg()
  }

  const onFinish = (values) => {
    const data = {
      image: values.file.originFileObj
    }
    onOkUpload(data)
  }

  const confirm = async () => {
    if (!statusPreview) {
      await dispatch(deleteMedia(urlImageName))
      await fetchData(defaultDate[0], defaultDate[1])
      await setDefaultImg()
    }
    await setModalRemoveMedia(false)
  }

  const onPreview = async (file, actionThis) => {
    const PositionOfImg = fileList.indexOf(file)
    const PositionOfName = mediaList[PositionOfImg].name
    await setStatusPreview(actionThis)
    await setUrlImageName(PositionOfName)
    await setModalRemoveMedia(true)
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
    onFinish(info)
  }

  const handleDatePickerChange = async (date, dateString) => {
    const Res = dateString.split('-')
    await fetchData(Res[0], Res[1])
  }

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>Media</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Form
            form={form}
            name="manageMedia"
            onFinish={onFinish}
            layout="vertical">
            <Form.Item
              label="Upload image"
              name="uploadImage"
              valuePropName="upload">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}>
                <div>
                  {imageUrl && loading ? (
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
          </Form>
        </Row>
        <Row>
          <Col span={24}>
            <Typography.Title level={3}>Gallery</Typography.Title>
          </Col>
          <Row>
            <Col span={24}>
              <MonthPicker
                defaultValue={moment(defaultDate[0] + '-' + defaultDate[1])}
                size="default"
                placeholder="Select Month"
                style={{ margin: '10px' }}
                onChange={(date, dateString) =>
                  handleDatePickerChange(date, dateString)
                }
              />
            </Col>
          </Row>
          <Modal
            title={statusPreview ? '' : 'Are you sure to remove this image?'}
            visible={modalRemoveMedia}
            onOk={confirm}
            onCancel={() => setModalRemoveMedia(false)}
            okText="Ok"
            cancelText="Cancel">
            <img style={{ width: '100%' }} src={urlImageName} alt="" />
          </Modal>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}
            fileList={fileList}
            onRemove={(file, actionThis) => onPreview(file, false)}
            onPreview={(file, actionThis) => onPreview(file, true)}
          />
        </Row>
      </div>
    </MainLayout>
  )
}

export default media
