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
import { useDispatch , useSelector} from 'react-redux'
import { logout } from 'store/reducers/auth'
import { setMenu } from 'store/reducers/menu';
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

const MainLayout = (props) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const dispatch = useDispatch()


  const { selectedMenu } = useSelector(
    (state) => ({
      selectedMenu:state.menu.selectedMenu
    }),
    []
  )

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  const onClick = async (e, url) => {
    await router.push(`/${url}`)
    await dispatch(setMenu(e.key))
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
          <TitleDashboard>Digiboxs</TitleDashboard>
        </div>
        <Divider />
        <Menu theme="dark" selectedKeys={[selectedMenu]} mode="inline" defaultOpenKeys={['sub1']}>
          <Menu.Item
            key="1"
            icon={<PieChartOutlined />}
            onClick={(e) => onClick(e,'dashboard')}>
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="9"
            icon={<ShoppingOutlined />}
            onClick={(e) => onClick(e,'product')}>
            Products
          </Menu.Item>
          <Menu.Item
            key="10"
            icon={<ShoppingOutlined />}
            onClick={(e) => onClick(e,'media')}>
            Media
          </Menu.Item>
          <SubMenu key="sub1" icon={<SettingOutlined />} title="Setting" >
            <Menu.Item key="2" onClick={(e) => onClick(e,'category')}>
              Category
            </Menu.Item>
            <Menu.Item key="3" onClick={(e) => onClick(e,'type')}>
              Type
            </Menu.Item>
            <Menu.Item key="4" onClick={(e) => onClick(e,'style')}>
              Style
            </Menu.Item>
            <Menu.Item key="5" onClick={(e) => onClick(e,'size')}>
              Size
            </Menu.Item>
            <Menu.Item key="6" onClick={(e) => onClick(e,'material')}>
              Material
            </Menu.Item>
            <Menu.Item key="7" onClick={(e) => onClick(e,'printFinish')}>
              Print Finish
            </Menu.Item>
            <Menu.Item key="8" onClick={(e) => onClick(e,'printSides')}>
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
