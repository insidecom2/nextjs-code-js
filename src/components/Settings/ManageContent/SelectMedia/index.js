import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Col, DatePicker, Modal, Row, Typography } from 'antd'
import moment from 'moment'
import { getMedia } from 'store/reducers/media'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { MediaItem } from 'styles/shared.style'

const SelectMedia = (props) => {
  const dispatch = useDispatch()
  const { visible, onCancel, onOk, setImageList } = props
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

  const onChange = (date, dateString) => {
    console.log(date, dateString)
  }

  const onSelectImage = async (checkedValues) => {
    await document.querySelectorAll('.tox-icon.tox-tbtn__icon-wrap')[5].click()
    
    // setImageList(checkedValues)
  }

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
        <Button
          form="ManageContentType"
          key="ok"
          type="primary"
          onClick={() => onOk()}>
          Submit
        </Button>
      ]}>
      <Row>
        <Col span={24}>
          <Typography.Title level={3}>Gallery</Typography.Title>
        </Col>
        <Col span={24}>
          <DatePicker
            picker="month"
            placeholder="Select Month"
            style={{ margin: '10px' }}
            onChange={onChange}
          />
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
