import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, message, Modal, Row, Select, Upload } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import _ from 'lodash'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { getContentTypeList } from 'store/reducers/contentType'

const ManageContentType = (props) => {
  const { visible, onOk, onCancel, action, typeSelected } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useDeepEffect(() => {
    async function fetchData() {
      await dispatch(getContentTypeList())
    }
    fetchData()
  }, [])

  useDeepEffect(() => {
    if (action === ACTION.EDIT && !_.isNull(typeSelected)) {
      form.setFieldsValue({
        name: typeSelected.name,
      })
    }
  }, [typeSelected])

  const onFinish = (values) => {
    const data = {
      name: values.name
    }

    if (action === ACTION.EDIT) {
      data.id = typeSelected.id
    }

    onOk(data)
  }

  return (
    <Modal
      closable={false}
      title={`${action} หมวดหมู่บทความ`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="ManageContentType" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <Form form={form} name="ManageContentType" onFinish={onFinish} layout="vertical">
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
      </Form>
    </Modal>
  )
}

ManageContentType.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageContentType
