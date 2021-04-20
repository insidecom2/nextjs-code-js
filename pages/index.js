import React from 'react'
import { LoginLayout } from 'styles/login/index.style'
import { Card, Col, Row, Form, Input, Checkbox, Button } from 'antd'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { login } from 'store/reducers/auth'
import Cookies from 'js-cookie'

const Login = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    const data = {
      email: values.username,
      password: values.password
    }
    await dispatch(login(data))
    const token = Cookies.get('token')
    if (token) await router.push(`/dashboard`)
  }

  return (
    <LoginLayout>
      <Row>
        <Col span={8} />
        <Col span={8}>
          <Card style={{ width: '100%' }}>
            <Form
              name="loginForm"
              layout="vertical"
              initialValues={{
                remember: true,
                username: 'admin',
                password: '12345678'
              }}
              onFinish={onFinish}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' }
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}>
                <Input.Password />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}>
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8} />
      </Row>
    </LoginLayout>
  )
}

export default Login
