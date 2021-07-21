import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Switch,
  Table,
  Typography
} from 'antd'
import { ACTION } from 'utils/constants.js'
import  ManageShops  from 'components/Shops'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import _ from 'lodash'

import {
  createProducts,
  updateActiveProducts
} from 'store/reducers/products'

import {
  getShopsList,
  deleteShops,
  updateShops
} from 'store/reducers/shops'

import {
  NewTable
} from 'styles/NewTable/index.style'

import {
  AddCreate
} from 'styles/BtnCreate/index.style'

import {
  AllDivImageEveryPage
} from 'styles/divImgEveryPage/index.style'

const Products = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()
  const [ShopsSelected, setShopsSelected] = useState(null)

  const { shopsList, isLoading } = useSelector(
    (state) => ({
      shopsList: state.shops.shopsList,
      isLoading: state.shops.isLoading,
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getShopsList());
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteShops(record.id))
    await dispatch(getShopsList())
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text) => (
        <span>
          {Number(shopsList.findIndex((FindPos) => FindPos.id === text.id)) +
            1}
        </span>
      )
    }
    ,
    {
      title: 'ร้านค้า',
      dataIndex: 'logo',
      key: 'logo',
      render: (text) => <AllDivImageEveryPage><img src={text!=undefined?text:''} /></AllDivImageEveryPage>
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text.substring(0,15)+(text.length>15?"...":"")}</span>
    },
    {
      title: 'Domain name',
      dataIndex: 'domain_name',
      key: 'domain_name',
      render: (text) => (
        <span>{text}</span>
      )
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: (text) => (
        <span>{text}</span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) =>
        shopsList[
          Number(shopsList.findIndex((FindPos) => FindPos.id === text.id))
        ].is_active && (
          <Space>
            <a onClick={(e) => onEdit(e, ACTION.EDIT, record)}>แก้ไข</a>
            <Popconfirm
              title="คุณแน่ใจที่จะลบ?"
              onConfirm={(e) => confirm(e, record)}>
              <a>ลบ</a>
            </Popconfirm>
          </Space>
        )
    },
    {
      title: 'Active',
      key: 'is_active',
      dataIndex: 'is_active',
      render: (text, record, index) => (
        <Switch onChange={(e) => setActive(e, record)} checked={text} />
      )
    }
  ]

  const onClick = (e, action) => {
    SetAntSelectNo(shopsList.length + 1)
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (data) => {                                                                                           
    const formData = new FormData()
    formData.set('domain_name', data.domain_name)
    formData.set('name', data.name)
    formData.set('url', data.url)
    formData.append('logo', data.logo)
    if (action === ACTION.CREATE) {
      await dispatch(createProducts(formData))
    } else if (action === ACTION.EDIT) {
      await dispatch(updateShops(formData))
    }
    await dispatch(getShopsList())
    await setVisible(false)
  }

  const onCancel = () => {
    setVisible(false)
    setShopsSelected(null)
  }

  const setActive = async (e, record) => {
    await dispatch(updateActiveProducts(record.id, e))
    await dispatch(getShopsList())
  }

  const onEdit = async (e, action, record) => {
    const GetPosition =
      Number(shopsList.findIndex((FindPos) => FindPos.id === record.id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    await setShopsSelected(record)
    await setAction(action)
    await setVisible(true)
  }

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>รายการ สินค้า</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>
                เพิ่ม สินค้า
              </AddCreate>
            </Row>
          </Col>
        </Row>
        <NewTable
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={shopsList}
          rowKey={(record) => record.id}
        />
        {visible && (
          <ManageShops
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            action={action}
            TrNo={AntSelectNo}
            ShopsSelected={ShopsSelected}
          />
        )}
      </div>
    </MainLayout>
  )
}

Products.propTypes = {}

export default Products
