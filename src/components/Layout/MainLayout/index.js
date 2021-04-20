import React, { useState } from 'react'
import { Layout, Menu, Divider, Avatar, Dropdown } from 'antd'
import {
  SettingOutlined,
  PieChartOutlined,
  UserOutlined,
  ShoppingOutlined
} from '@ant-design/icons'
import { TitleDashboard } from 'styles/dashboard/index.style'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { logout } from 'store/reducers/auth'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

const MainLayout = (props) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const dispatch = useDispatch()

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  const onClick = async (url) => {
    await router.push(`/${url}`)
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={(e) => onLogout(e)}>Log out</a>
      </Menu.Item>
    </Menu>
  )

  const onLogout = async (e) => {
    e.preventDefault()
    await dispatch(logout())
    await router.push(`/`)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div style={{ textAlign: 'center', marginTop: 15 }}>
          <TitleDashboard>Digibox Dashboard</TitleDashboard>
        </div>
        <Divider />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item
            key="1"
            icon={<PieChartOutlined />}
            onClick={() => onClick('dashboard')}>
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="9"
            icon={<ShoppingOutlined />}
            onClick={() => onClick('product')}>
            Products
          </Menu.Item>
          <SubMenu key="sub1" icon={<SettingOutlined />} title="Setting">
            <Menu.Item key="2" onClick={() => onClick('category')}>
              Category
            </Menu.Item>
            <Menu.Item key="3" onClick={() => onClick('type')}>
              Type
            </Menu.Item>
            <Menu.Item key="4" onClick={() => onClick('style')}>
              Style
            </Menu.Item>
            <Menu.Item key="5" onClick={() => onClick('size')}>
              Size
            </Menu.Item>
            <Menu.Item key="6" onClick={() => onClick('material')}>
              Material
            </Menu.Item>
            <Menu.Item key="7" onClick={() => onClick('printFinish')}>
              Print Finish
            </Menu.Item>
            <Menu.Item key="8" onClick={() => onClick('printSides')}>
              Print Sides
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <div style={{ float: 'right', margin: '0 10px', cursor: 'pointer' }}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '0 16px', padding: 10 }}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
