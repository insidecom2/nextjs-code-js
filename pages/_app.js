import React from 'react'
import { wrapper } from 'store'
import { PersistGate } from 'redux-persist/integration/react'
import { createGlobalStyle } from 'styled-components'
import { useStore } from 'react-redux'
import Head from 'next/head'
import 'antd/dist/antd.css'
import locale from 'antd/lib/locale/th_TH'
import { ConfigProvider } from 'antd'
import { AuthProvider } from 'components/AuthProvider'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;500&family=Open+Sans:wght@400;700&display=swap');
  * {
  box-sizing: border-box;
  word-wrap: break-word;
  }
  
  body {
    font-family: 'Kanit', sans-serif;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: .03rem;
    margin: 0 auto;
    background-color: #FFFFFF;
  }
    
  .ant-form-item {
    margin-bottom: 5px !important;
  }
  
  .ant-table-tbody > tr {
    cursor: pointer;
  }

  .ant-divider-horizontal {
    margin: 12px 0 !important;
  }

  // เพิ่มเอง

  .ant-layout-sider-children div {
    background: #2E26D9;
    margin-top:0 !important;
    height:32px;
    max-height:100% !important;
    font-weight: 500 !important;
    font-size: 37px !important;
  }
  .ant-divider-horizontal {
    margin: 0 0 !important;
  }
  .ant-layout-sider-children  .ant-menu-submenu-title {
    background: #F9F9FF !important;
    font-size: 16px !important;
    padding-top:9px !important;
    height:56px !important;
    max-height:100% !important;
  }

  .ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-selected .ant-menu-submenu-title{
    padding-top:9px !important;
    height:56px !important;
    max-height:100% !important;
  }
  .ant-layout-sider-children .ant-menu-submenu-open .ant-menu-submenu-title {
    border-right: 3px solid #7F63F4 !important;
  }
  .ant-layout-sider-children {
    background: #F9F9FF !important;
    box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.3) !important;
  }

  .ant-layout-header {
    background: #2E26D9 !important;
     box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.08) !important;
  }

  .ant-menu.ant-menu-dark.ant-menu-root.ant-menu-inline {
    background:#F9F9FF;
  }
  .ant-menu-item,.ant-menu-submenu-title {
    font-style: normal;
font-weight: normal;
font-size: 16px !important;
line-height: 51px;
align-items: center !important;
color: #6A707E !important;
  }
  .ant-menu.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow::before,.ant-menu.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow::after {
    background: #F0EEFF !important;
  }

  .ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,.ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after {
    background: #7F63F4 !important;
  }
  .ant-menu-item {
    height:56px !important;
    max-height:100% !important;
    padding-top:10px !important;
    margin:0 !important;
  }
  .ant-menu-item.ant-menu-item-selected {
    background: #E5E5E5 !important;
    border-right: 3px solid #7F63F4 !important;
  }

  .ant-menu-item.ant-menu-item-selected span,.ant-menu-submenu-open .ant-menu-submenu-title span {
    color: #7F63F4 !important;
    font-size: 16px !important;
    font-style: normal;
    font-weight: 500;
}
.ant-layout-sider-trigger {
  background: #F9F9FF !important;
  font-style: normal !important;
font-weight: normal !important;
font-size: 16px !important;
color: #7F63F4 !important; 
}

.ant-menu.ant-menu-dark.ant-menu-inline-collapsed.ant-menu-root.ant-menu-vertical {
  background:#F9F9FF !important;
}
.ant-layout-content {
  background:#F0EEFF !important;
}
.ant-layout-content .ant-col.ant-col-6 .jamDOl,.ant-layout-content .ant-col.jamDOl {
  background: #FFFFFF !important;
  mix-blend-mode: normal !important;
  border-radius: 30px !important;
}

.ant-menu-submenu.ant-menu-submenu-inline ul{
  background:#F9F9FF !important;
}
.ant-menu-submenu.ant-menu-submenu-inline ul li {
  color: #7F63F4 !important;
  font-weight: 300 !important;
   font-size: 16px !important;
}

.ant-menu-submenu.ant-menu-submenu-inline ul li:hover {
   background: #F0EEFF !important;
}

.ant-menu-submenu.ant-menu-submenu-inline .ant-menu-submenu-title {
  margin:0 !important;
}

h2 {
  font-style: normal;
font-weight: 500;
font-size: 30px;
line-height: 40px;
color: #7F63F4;
}

.ant-layout-content {
  padding:0 !important;
  margin:0 !important;
}

.ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-open .ant-menu-submenu-title {
  background: #F0EEFF !important;
}

.ant-menu-submenu.ant-menu-submenu-inline ul li.ant-menu-item-selected {
  border-right: 3px solid #7F63F4 !important;
  background: #F0EEFF !important;
}

.ant-menu-item:hover{
  background:#F0EEFF !important;
}

.DashboardCard__DashboardCardDiv-sc-14tysqb-0.jamDOl.custom_css02, .DashboardCard__DashboardCardDiv-sc-14tysqb-0.jamDOl.custom_css03 {
  border:20px solid #F5F4FF;
}
.DashboardCard__DashboardCardDiv-sc-14tysqb-0.jamDOl.custom_css02 {
  height:162.1px;
  max-height:100%;
  padding:10px;
  width:400px;
  max-width:100%;
}
.custom_css01.up:before {
 content:url('https://media.discordapp.net/attachments/775978814693441568/843736502297952276/Group.png')
}
.custom_css01.down:before {
  content:url('https://media.discordapp.net/attachments/775978814693441568/843743023904849981/Group_1.png')
}
.custom_css02 .span01 {
font-style: normal;
font-weight: normal;
font-size: 15px;
line-height: 16px;
color: #6A707E;
}

.custom_css02 .span02 {
  font-family: Open Sans;
font-style: normal;
font-weight: bold;
font-size: 30px;
line-height: 24px;
color: #222B45;
}
.custom_css02 .span03 {
font-family: Open Sans;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
color: #6A707E;
}  

label.custom_css04 span:first-child {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
  color: #7F63F4;
  
}

label.custom_css04 span:last-child {
  font-style: normal;
font-weight: normal;
font-size: 15px;
line-height: 16px;
color: #6A707E;
}
`

const WrappedApp = ({ Component, pageProps }) => {
  const store = useStore((state) => {
    return state
  })

  return (
    <>
      <Head>
        <title>Digibox</title>
      </Head>
      <GlobalStyle />
      <PersistGate persistor={store.__persistor} loading={null}>
        <ConfigProvider locale={locale}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ConfigProvider>
      </PersistGate>
    </>
  )
}

export default wrapper.withRedux(WrappedApp)
