import { Form, Button, Col, Input, Row, Typography } from 'antd'
import MainLayout from 'components/Layout/MainLayout'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { getSettingList, updateSetting } from 'store/reducers/setting'

const setting = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { settingList } = useSelector(
    (state) => ({
      settingList: state.setting.SettingTypeList
    }),
    []
  )
  console.log(settingList)

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
    const formData = new FormData()
    formData.set('title', data.title)
    formData.set('email', data.email)
    formData.set('telephone', Number(data.telephone))
    formData.set('address', data.address)
    formData.set('facebook', data.facebook)
    formData.set('line', data.line)
    formData.set('google_analytics', data.google_analytics)
    formData.set('facebook_pixel', data.facebook_pixel)
    await dispatch(updateSetting(formData))
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
            <Typography.Title level={3}>Website settings</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form
              form={form}
              name="manageWebSetting"
              onFinish={onFinish}
              layout="vertical">
              <Form.Item
                label="Title"
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
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!'
                  }
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Telephone"
                name="telephone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your telephone!'
                  }
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Please input your discount address!'
                  }
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Facebook"
                name="facebook"
                rules={[
                  {
                    required: true,
                    message: 'Please input your facebook!'
                  }
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Line"
                name="line"
                rules={[
                  {
                    required: true,
                    message: 'Please input your line!'
                  }
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Google Analytics"
                name="google_analytics"
                rules={[
                  {
                    required: true,
                    message: 'Please input your google analytics!'
                  }
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Facebook Pixel"
                name="facebook_pixel"
                rules={[
                  {
                    required: true,
                    message: 'Please input your google facebook pixel!'
                  }
                ]}>
                <Input />
              </Form.Item>
            </Form>
            <Button
              form="manageWebSetting"
              key="ok"
              type="primary"
              htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

export default setting
