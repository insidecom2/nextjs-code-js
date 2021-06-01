import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  UploadOutlined
} from '@ant-design/icons'
import { Button, Checkbox, Col, DatePicker, Modal, Row, Typography,  Upload } from 'antd'
import moment from 'moment'
import { getMedia, createMedia } from 'store/reducers/media'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { MediaItem } from 'styles/shared.style'
import { beforeUpload, getBase64 } from 'utils/images'

const SelectMedia = (props) => {
  const dispatch = useDispatch()
  const { visible, onCancel, onOk, setImageList, abountCurSor } = props
  const [onSubmit,setOnSubmit]=useState([])
  const StartDate = new Date()
  const { MonthPicker } = DatePicker
  const [defaultDate, setDefaultDate] = useState([
    StartDate.getFullYear(),
    ('0' + (StartDate.getMonth() + 1)).slice(-2)
  ])
  const { mediaList } = useSelector(
    (state) => ({
      mediaList: state.media.productsList
    }),
    []
  )

  const fetchData = async () => {
    const date = moment(new Date()).format('YYYY-MM').split('-')
    const year = date[0]
    const month = date[1]
    dispatch(getMedia(year, month))
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const onOkUpload = async (data) => {
    const formData = new FormData()
    formData.append('image', data.image)
    await dispatch(createMedia(formData))
    await  dispatch(getMedia(defaultDate[0], defaultDate[1]))
  }

  const onFinish = (values) => {
    const data = {
      image: values.file.originFileObj
    }
    onOkUpload(data)
  }

  const onChange =async(date, dateString) => {
    const Res = dateString.split('-')
    await dispatch(getMedia(Res[0], Res[1]))
  }
  
  const onSelectImage = async(checkedValues) => {
    await setOnSubmit(checkedValues)
    await setImageList(checkedValues)
  }

  const propsImg = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        return
      }
      onFinish(info)
    },
    beforeUpload(){beforeUpload}
  };

  return (
    <Modal
      width={1200}
      closable={false}
      title="Select Media"
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        abountCurSor&&onSubmit.length>0&&(
        <Button
          form="ManageContentType"
          key="ok"
          type="primary"
          onClick={() => onOk()}>
          Submit
        </Button>)
      ]}>
      <Row>
        <Col span={24}>
          <Typography.Title level={3}>Gallery</Typography.Title>
        </Col>
        <Col span={5}>
          <MonthPicker
            defaultValue={moment(defaultDate[0] + '-' + defaultDate[1])}
            size="default"
            placeholder="Select Month"
            style={{ margin: '10px' }}
            onChange={onChange}
          />
        </Col>
        <Col span={3}>
           <Upload {...propsImg}>
             <Button icon={<UploadOutlined />}>Click to Upload</Button>
           </Upload>
        </Col>
      </Row>
      <Checkbox.Group onChange={onSelectImage}>
        <Row gutter={[8, 8]}>
          {!_.isEmpty(mediaList) &&
            mediaList.map((item,index) => {
              return (
                <Col key={index} span={4}>
                  <MediaItem>
                    <Row>
                      <Checkbox value={item.name} />
                    </Row>
                    <img
                      src={item.name}
                      alt={item.etag}
                      width={150}
                      height={150}
                    />
                  </MediaItem>
                </Col>
              )
            })}
        </Row>
      </Checkbox.Group>
    </Modal>
  )
}

SelectMedia.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  setImageList: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default SelectMedia
