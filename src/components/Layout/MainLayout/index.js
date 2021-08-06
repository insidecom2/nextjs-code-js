import React, { useState } from 'react'
import { Layout, Menu, Divider, Avatar, Dropdown } from 'antd'
import {
  AntDesignOutlined,
  AppstoreOutlined,
  BgColorsOutlined,
  HddFilled,
  ControlFilled,
  UserOutlined,
  ShoppingOutlined,
  TrophyOutlined,
  SendOutlined,
  HomeOutlined,
  FileTextOutlined,
  SettingOutlined,
  PicRightOutlined,
  ShopOutlined
} from '@ant-design/icons'
import { TitleDashboard } from 'styles/dashboard/index.style'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'store/reducers/auth'
import { setMenu } from 'store/reducers/menu'
import {
  HeaderEx,
  MenuEx,
  SiderEx,
  OutLayOut,
  SpreadLayout
} from 'styles/layout/index.style'
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu
import AvatarStatus from 'components/Shared/AvatarStatus'

const MainLayout = (props) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const dispatch = useDispatch()
  const { selectedMenu } = useSelector(
    (state) => ({
      selectedMenu: state.menu.selectedMenu
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

  const onOpenTab = async (e, url) => {
    window.open(url)
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
    <SpreadLayout>
      <div className="Digiboxs">
        <HeaderEx style={{ padding: 0 }}>
          <TitleDashboard>Digiboxs</TitleDashboard>
          <div style={{ float: 'right', margin: '0 10px', cursor: 'pointer' }}>
            <AvatarStatus name={'George Martin'} status={'Admin'} />
            <Dropdown overlay={menu} trigger={['click']}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </HeaderEx>
        <OutLayOut style={{ minHeight: '100vh' }}>
          <SiderEx collapsible collapsed={collapsed} onCollapse={onCollapse}>
            {/* <Divider /> */}
            <MenuEx
              selectedKeys={[selectedMenu]}
              mode="inline"
              //defaultOpenKeys={['sub1', 'sub2']}
            >
              <Menu.Item
                key="1"
                icon={<AppstoreOutlined />}
                onClick={(e) => onClick(e, 'dashboard')}>
                แดชบอร์ด
              </Menu.Item>
              <div
                style={{
                  display: 'block',
                  margin: 'auto',
                  textAlign: 'center',
                  borderBottom: '2px solid #DADADA',
                  paddingTop: 20,
                  width: '80%'
                }}></div>
              <Menu.Item
                key="15"
                icon={<HomeOutlined />}
                onClick={(e) => onOpenTab(e, 'http://18.223.136.75')}>
                หน้าแรก
              </Menu.Item>

              <Menu.Item
                key="2"
                icon={<ShoppingOutlined />}
                onClick={(e) => onClick(e, 'product')}>
                สินค้า
              </Menu.Item>

              <SubMenu key="sub2" icon={<FileTextOutlined />} title="บทความ">
                <Menu.Item key="16" onClick={(e) => onClick(e, 'contentType')}>
                  หมวดหมู่บทความ
                </Menu.Item>
                <Menu.Item key="17" onClick={(e) => onClick(e, 'content')}>
                  บทความ
                </Menu.Item>
              </SubMenu>

              {/* <Menu.Item
            key="3"
            icon={<AntDesignOutlined />}
            onClick={(e) => onClick(e, 'broadcast')}>
            บรอดแคสต์
          </Menu.Item> */}
              <Menu.Item
                key="4"
                icon={<TrophyOutlined />}
                onClick={(e) => onClick(e, 'promotion')}>
                จัดการแคมเปญ
              </Menu.Item>
              {/* <Menu.Item
            key="5"
            icon={<BgColorsOutlined />}
            onClick={(e) => onClick(e, 'broadcast')}>
            จัดการธีม
          </Menu.Item> */}
              <Menu.Item
                key="6"
                icon={<HddFilled />}
                onClick={(e) => onClick(e, 'media')}>
                คลังจัดเก็บ
              </Menu.Item>
              <Menu.Item
                key="7"
                icon={<SendOutlined />}
                onClick={(e) => onClick(e, 'shipping')}>
                การจัดส่ง
              </Menu.Item>
              <SubMenu
                key="sub1"
                icon={<ControlFilled />}
                title="ตั้งค่าสินค้า">
                <Menu.Item key="8" onClick={(e) => onClick(e, 'category')}>
                  หมวดหมู่
                </Menu.Item>
                <Menu.Item key="9" onClick={(e) => onClick(e, 'type')}>
                  ประเภท
                </Menu.Item>
                <Menu.Item key="10" onClick={(e) => onClick(e, 'style')}>
                  คุณลักษณะ
                </Menu.Item>
                <Menu.Item key="11" onClick={(e) => onClick(e, 'size')}>
                  ขนาด
                </Menu.Item>
                <Menu.Item key="12" onClick={(e) => onClick(e, 'material')}>
                     ชนิดกระดาษ
                 </Menu.Item>
                <Menu.Item key="13" onClick={(e) => onClick(e, 'printFinish')}>
                    รูปแบบการพิมพ์
                </Menu.Item>
                <Menu.Item key="14" onClick={(e) => onClick(e, 'printSides')}>
                    รูปแบบการเคลือบ
                </Menu.Item>
                <Menu.Item key="15" onClick={(e) => onClick(e, 'printSides')}>
                    เทคนิคพิเศษ
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                key="100"
                icon={<SettingOutlined />}
                onClick={(e) => onClick(e, 'setting')}>
                ตั้งค่าเว็บไซต์
              </Menu.Item>
              <Menu.Item
                key="101"
                icon={<PicRightOutlined />}
                onClick={(e) => onClick(e, 'banner')}>
                แบนเนอร์
              </Menu.Item>
              <Menu.Item
                key="102"
                icon={<ShopOutlined />}
                onClick={(e) => onClick(e, 'shops')}>
                ร้านค้า
              </Menu.Item>
              <Menu.Item
                key="103"
                icon={<ShopOutlined />}
                onClick={(e) => onClick(e, 'estimateSetting')}>
                ตั้งค่า Estimate
              </Menu.Item>
              <Menu.Item
                key="104"
                icon={<ShopOutlined />}
                onClick={(e) => onClick(e, 'threeDSetting')}>
                ตั้งค่า 3D
              </Menu.Item>
            </MenuEx>
          </SiderEx>
          <Layout>
            <Content style={{ margin: '0 16px', padding: 10 }}>
              {props.children}
            </Content>
          </Layout>
        </OutLayOut>
      </div>
    </SpreadLayout>
  )
}

export default MainLayout
