import styled from 'styled-components'
import { Layout, Menu } from 'antd'

const { Header, Sider } = Layout

export const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`

export const HeaderEx = styled(Header)`
  background: #2e26d9 !important;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.08) !important;
`

export const SiderEx = styled(Sider)`
  .ant-layout-sider-children div {
    background: #2e26d9;
    margin-top: 0 !important;
    height: 32px;
    max-height: 100% !important;
    font-weight: 500 !important;
    font-size: 37px !important;
  }

  .ant-layout-sider-children .ant-menu-submenu-title {
    background: #f9f9ff !important;
    font-size: 16px !important;
    padding-top: 9px !important;
    height: 56px !important;
    max-height: 100% !important;
  }

  .ant-layout-sider-children {
    background: #f9f9ff !important;
    box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.3) !important;
  }
  .ant-layout-sider-trigger {
    background: #f9f9ff !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 16px !important;
    color: #7f63f4 !important;
  }
`

export const MenuEx = styled(Menu)`

  .ant-menu-item {
    height: 56px !important;
    max-height: 100% !important;
    padding-top: 10px !important;
    margin: 0 !important;
  }

  .ant-menu-item span{
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 51px;
    color: #6A707E; 
  }

  .ant-menu-item::after,.ant-menu-submenu-open .ant-menu-submenu-title {
    border-right: 3px solid #7f63f4 !important;
  }
 
  .ant-menu-item.ant-menu-item-selected span,
  .ant-menu-submenu-open .ant-menu-submenu-title span {
    color: #7f63f4 !important;
    font-size: 16px !important;
    font-style: normal;
    font-weight: 500;
  }

  .ant-menu.ant-menu-dark.ant-menu-inline-collapsed.ant-menu-root.ant-menu-vertical {
    background: #f9f9ff !important;
  }

  .ant-menu-submenu.ant-menu-submenu-inline ul {
    background: #f9f9ff !important;
  }
  .ant-menu-submenu.ant-menu-submenu-inline ul li {
    color: #7f63f4 !important;
    font-weight: 300 !important;
    font-size: 16px !important;
  }

  .ant-menu-submenu.ant-menu-submenu-inline ul li:hover {
    background: #f0eeff !important;
  }

  .ant-menu-submenu.ant-menu-submenu-inline .ant-menu-submenu-title {
    margin: 0 !important;
  }

  .ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-open
    .ant-menu-submenu-title {
    background: #f0eeff !important;
  }

  .ant-menu-item:hover {
    background: #f0eeff !important;
  }
`
