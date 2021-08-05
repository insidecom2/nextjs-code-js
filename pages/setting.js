import { Form, Button, Col, Input, Row, Typography } from 'antd'
import MainLayout from 'components/Layout/MainLayout'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { getSettingList, updateSetting } from 'store/reducers/setting'
import { AddCreate } from 'styles/BtnCreate/index.style'

const setting = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { settingList } = useSelector(
    (state) => ({
      settingList: state.setting.SettingTypeList
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getSettingList())
  }

  useDeepEffect(() => {
    if (settingList !== undefined) {
      form.setFieldsValue({
        title: settingList.title,
        email: settingList.email,
        telephone: settingList.telephone,
        address: settingList.address,
        facebook: settingList.facebook,
        line: settingList.line,
        google_analytics: settingList.google_analytics,
        facebook_pixel: settingList.facebook_pixel
      })
    }
    fetchData()
  }, [settingList])

  const onOk = async (data) => {
    // const formData = new FormData()
    // formData.set('title', data.title)
    // formData.set('email', data.email)
    // formData.set('telephone', data.telephone)
    // formData.set('address', data.address)
    // formData.set('facebook', data.facebook)
    // formData.set('line', data.line)
    // formData.set('google_analytics', data.google_analytics)
    // formData.set('facebook_pixel', data.facebook_pixel)

    await dispatch(updateSetting(data))
    await dispatch(getSettingList())
  }

  const onFinish = (values) => {
    const data = {
      title: values.title,
      email: values.email,
      telephone: values.telephone,
      address: values.address,
      facebook: values.facebook,
      line: values.line,
      google_analytics: values.google_analytics,
      facebook_pixel: values.facebook_pixel
    }
    onOk(data)
  }

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>ตั้งค่าเว็บไซต์</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form
              form={form}
              name="manageWebSetting"
              onFinish={onFinish}
              layout="vertical">
              <Form.Item label="หัวข้อ" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Telephone" name="telephone">
                <Input />
              </Form.Item>
              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="Facebook" name="facebook">
                <Input />
              </Form.Item>
              <Form.Item label="Line" name="line">
                <Input />
              </Form.Item>
              <Form.Item label="Google Analytics" name="google_analytics">
                <Input />
              </Form.Item>
              <Form.Item label="Facebook Pixel" name="facebook_pixel">
                <Input />
              </Form.Item>
            </Form>
            <AddCreate
              form="manageWebSetting"
              key="ok"
              type="primary"
              htmlType="submit">
              Submit
            </AddCreate>
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

export default setting
