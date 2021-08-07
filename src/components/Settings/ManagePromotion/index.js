import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  Icon,
  message,
  DatePicker
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import { beforeUpload, getBase64 } from 'utils/images'
import moment, { defaultFormatUtc } from 'moment'

const ManagePromotion = (props) => {
  const { visible, onOk, onCancel, action, TrNo, typeSelected } = props
  const [form] = Form.useForm()
  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState()
  const StartDate = new Date()
  const dateFormat = 'YYYY-MM-DD'
  const currentDate =
    StartDate.getFullYear() +
    '-' +
    ('0' + (StartDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + (StartDate.getDay() + 1)).slice(-2)
  const [defaultDate, setDefaultDate] = useState([currentDate, currentDate])

  const onFinish = (values) => {
    const data = {
      title: values.title,
      detail: values.detail,
      discount: values.discount,
      discount_type: values.discount_type,
      minimun: values.minimum,
      start_date: defaultDate[0],
      end_date: defaultDate[1],
      image: values.image === undefined ? [] : values.image.file.originFileObj
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
        detail: typeSelected.detail,
        discount: typeSelected.discount,
        discount_type: typeSelected.discount_type,
        minimum: typeSelected.minimun
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
        <Button
          form="managePromotion"
          key="ok"
          type="primary"
          htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form
        form={form}
        name="managePromotion"
        onFinish={onFinish}
        layout="vertical">
        <p>No : {TrNo}</p>
        <Form.Item
          label="หัวข้อ"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your title!'
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
          label="Discount"
          name="discount"
          rules={[
            {
              required: true,
              message: 'Please input your discount!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Discount type"
          name="discount_type"
          rules={[
            {
              required: true,
              message: 'Please input your discount type!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Minimum"
          name="minimum"
          rules={[
            {
              required: true,
              message: 'Please input your minimum!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Start date / End date">
          <DatePicker.RangePicker
            defaultValue={[
              moment(defaultDate, dateFormat),
              moment(defaultDate, dateFormat)
            ]}
            onChange={(date, dateString) => setDefaultDate(dateString)}
          />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Upload
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
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

ManagePromotion.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManagePromotion
