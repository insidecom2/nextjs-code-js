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
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import Router from 'next/router'

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
    margin: 0 0 !important;
  }


  .ant-layout-content .ant-col.ant-col-6 .jamDOl,.ant-layout-content .ant-col.jamDOl {
    background: #FFFFFF !important;
    mix-blend-mode: normal !important;
    border-radius: 30px !important;
  }
  
  .ant-layout-content {
    padding:0 !important;
    margin:0 !important;
  }
  .tox-notification.tox-notification--in.tox-notification--warning {
    display:none;
  }
  .ant-layout-sider {
     background-color: unset;
  }
  .ant-layout-sider-trigger {
    display: none;
  }
  .ant-switch.ant-switch-checked {
    background: #60CECE;
  }
  .ant-table-thead th {
    text-align: center !important;
    border-right: none !important;
    border-left: none !important;
    font-style: normal;
font-weight: normal;
font-size: 15px;
color: #6A707E !important;
  }
  .ant-table.ant-table-bordered > .ant-table-container {
    border: none;
  }
  .ant-table-tbody td{
    text-align: center !important;
    color: #6A707E !important;
  }

  .ant-pagination-item-link {
    border: 3px solid #DADADA !important;
border-radius: 18.5px !important;
width: 48px !important;
height: 27px !important;
max-width: 100% !important;
max-height: 100% !important;
  }

  .ant-pagination-item {
border-radius: 18.5px !important;
width: 48px !important;
height: 27px !important;
max-width: 100% !important;
max-height: 100% !important;
  }

  .anticon.anticon-left svg,.anticon.anticon-right svg {
    padding-bottom: 6px !important;
  }
  .ant-table-tbody tr td:first-child {
    border-left:1px solid #f0f0f0;
  }

  .ant-table-tbody tr:first-child td:first-child {
      border-top-left-radius: 28px;
  }
  .ant-table-tbody tr:first-child td:last-child {
     border-top-right-radius: 28px;
  }
  .ant-table-tbody tr:last-child td:first-child {
      border-bottom-left-radius: 28px;
  }
  .ant-table-tbody tr:last-child td:last-child {
      border-bottom-right-radius: 28px;
  }
  .ant-table-thead tr th {
    border:none;
  }
  .ant-table-tbody tr:first-child td {
    border-top:1px solid #f0f0f0;
  }
`

const WrappedApp = ({ Component, pageProps }) => {
  const store = useStore((state) => {
    return state
  })
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

  return (
    <>
      <Head>
        <title>Digiboxs</title>
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
