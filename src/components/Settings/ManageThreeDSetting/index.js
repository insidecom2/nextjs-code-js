import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal } from 'antd'
import { ACTION } from 'utils/constants.js'

const ManageThreeDSetting = (props) => {
  const { visible, onOk, onCancel, action, TrNo, threeDSettingSelected } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    const data = {
      name: values.name,
      code: values.code,
    }
    if (action===ACTION.EDIT) {
        data.id = threeDSettingSelected.id;
    }
    onOk(data)
  }

  useEffect(() => {
    if (action === ACTION.EDIT) {
      form.setFieldsValue({
        name: threeDSettingSelected.name,
        code: threeDSettingSelected.code,
      })
    }
  }, [threeDSettingSelected])


  return (
    <Modal
      closable={false}
      title={`${action} การตั้งค่า ThreeDSetting`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="updateThreeDSettingSetting" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
      <h4>No : {TrNo}</h4>
      <Form
        form={form}
        name="updateThreeDSettingSetting"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Name:"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your ThreeDSetting Setting Name!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Code:"
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your code!'
            }
          ]}>
          <Input />
          
        </Form.Item>


      </Form>
    </Modal>
  )
}

ManageThreeDSetting.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageThreeDSetting
