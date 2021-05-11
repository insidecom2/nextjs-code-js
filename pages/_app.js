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
`

const WrappedApp = ({ Component, pageProps }) => {
  const store = useStore((state) => {
    return state
  })

  return (
    <>
      <Head>
        <title>Digibox Dashboard</title>
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
