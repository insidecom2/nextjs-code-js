import styled from 'styled-components'
import { Layout, Menu } from 'antd'

const { Header, Sider } = Layout

export const SpreadLayout = styled.div`
  background: #82e3e3;
  padding: 60px;
  div.Digiboxs {
    background-color: #ffffff;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    border-radius: 42px !important;
    padding-bottom: 40px;
  }
`

export const OutLayOut = styled(Layout)`
  padding: 40px;
  margin-top: 10px;
  margin-right: 30px;
  margin-left: 30px;
  border-radius: 48px;
`

export const AvatarTextStatus = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #6a707e;
  padding-right: 10px;
  span:after {
    content: url('https://media.discordapp.net/attachments/775978814693441568/844422554948337684/Group_18.png');
    padding-left: 10px;
  }
`

export const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`

export const HeaderEx = styled(Header)`
  border-radius: 42px !important;
  background: #ffffff !important;
  padding-left: 20px !important;
`

export const SiderEx = styled(Sider)`
  .ant-menu.ant-menu-root.ant-menu-vertical.ant-menu-light {
    border-radius: 29px;
  }
  .ant-menu-item {
    display: flex;
  }
  .ant-menu-item svg {
    margin: auto;
  }
  .ant-layout-sider-children {
    height: 685px !important;
  }
  border-radius: 29px;
  .ant-menu.ant-menu-root.ant-menu-inline.ant-menu-light {
    border-radius: 29px;
  }
  .ant-layout-sider-children .ant-menu-submenu-title {
    font-size: 15px !important;
    /* padding-top: 5px !important; */
    height: 40px !important;
    max-height: 100% !important;
    color: #6a707e !important;
    border-radius: 34px;
  }

  .ant-layout-sider-children .ant-menu-submenu-title:hover {
    background: linear-gradient(180deg, #438afe -36.03%, #82e3e3 133.09%);
    border-radius: 34px;
    height: 40px !important;
  }
  .ant-layout-sider-children .ant-menu-submenu-title:hover span,
  .ant-layout-sider-children .ant-menu-submenu-title:hover i {
    color: white;
  }

  .ant-layout-sider-children {
    border-radius: 29px !important;
    background: #ffffff !important;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }

  .ant-layout-sider-trigger {
    background: unset !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 16px !important;
    color: #7f63f4 !important;
  }

  .ant-layout-sider-trigger {
    color: #6a707e !important;
    bottom: unset;
    // background-color: #f0eeff !important;
  }
`

export const MenuEx = styled(Menu)`
  .ant-menu-item {
    height: 56px !important;
    max-height: 100% !important;
    /* padding-top: 10px !important; */
    margin: 0 !important;
    border-radius: 34px !important;
    height: 41px !important;
    margin-top: 10px !important;
  }

  .ant-menu-item.ant-menu-item-selected {
    background: linear-gradient(180deg, #438afe -36.03%, #82e3e3 133.09%);
  }

  .ant-menu-item span {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 51px;
    color: #6a707e;
  }

  .ant-menu-item svg {
    padding-bottom: 2px;
  }
  .ant-menu-item .ant-menu-title-content {
    padding-bottom: 8px;
  }

  .ant-menu-item:hover span {
    color: #7f63f4;
  }

  .ant-menu-item.ant-menu-item-selected:hover {
    border-right: unset !important;
  }

  .ant-menu-item.ant-menu-item-selected span,
  .ant-menu-submenu-open .ant-menu-submenu-title span {
    color: white !important;
    font-size: 15px !important;
    font-style: normal;
    font-weight: 500;
  }

  .ant-menu-submenu.ant-menu-submenu-inline {
    padding-top: 15px;
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
    font-size: 15px !important;
  }

  .ant-menu-submenu.ant-menu-submenu-inline ul li:hover {
    background: linear-gradient(180deg, #438afe -36.03%, #82e3e3 133.09%);
  }

  .ant-menu-submenu.ant-menu-submenu-inline .ant-menu-submenu-title {
    margin: 0 !important;
  }

  .ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-open
    .ant-menu-submenu-title {
    background: linear-gradient(180deg, #438afe -36.03%, #82e3e3 133.09%);
  }

  .ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-open
    .ant-menu-submenu-title
    i {
    color: white;
  }

  .ant-menu-item:hover {
    background: linear-gradient(180deg, #438afe -36.03%, #82e3e3 133.09%);
  }
  .ant-menu-item:hover span {
    color: white;
  }
  .ant-menu-item::after {
    border-right: none;
  }
`
