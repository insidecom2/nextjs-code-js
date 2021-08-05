import { Button, Col, Popconfirm, Row, Space, Table, Typography } from 'antd'
import MainLayout from 'components/Layout/MainLayout'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION } from 'utils/constants.js'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import ManageBanner from 'components/Settings/ManageBanner'
import { AddCreate } from 'styles/BtnCreate/index.style'
import { NewTable } from 'styles/NewTable/index.style'

import {
  deletebanner,
  getbannerList,
  updatebanner,
  createbanner
} from 'store/reducers/banner'

const banner = () => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [typeSelected, setTypeSelected] = useState(null)
  const { isLoading, bannerList } = useSelector(
    (state) => ({
      isLoading: state.promotion.isLoading,
      bannerList: state.banner.bannerTypeList
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getbannerList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  // const setActive = async (e, record) => {
  //   await dispatch(updateActivebanner(record.id, e))
  //   await dispatch(getbannerList())
  // }

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deletebanner(record.id))
    await fetchData()
  }

  const onEdit = async (e, action, record) => {
    e.preventDefault()
    const GetPosition =
      Number(bannerList.findIndex((FindPos) => FindPos.id === record.id)) + 1
    SetAntSelectNo(GetPosition)
    await setTypeSelected(record)
    await setAction(action)
    await setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
    setTypeSelected(null)
  }

  const onOk = async (data) => {
    await setVisible(false)
    const formData = new FormData()
    formData.set('link', data.link)
    formData.append('image', data.image)
    if (action === ACTION.CREATE) {
      await dispatch(createbanner(formData))
    } else if (action === ACTION.EDIT) {
      await dispatch(updatebanner(data.id, formData))
    }
    await dispatch(getbannerList())
  }

  const onClick = async (e, action) => {
    e.preventDefault()
    SetAntSelectNo(bannerList.length + 1)
    await dispatch(getbannerList())
    setAction(action)
    setVisible(true)
  }

  const styleCSS = {
    display: 'block',
    margin: 'auto',
    maxWidth: '100%',
    height: '300px'
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      width: '10%',
      render: (text, record, index) => (
        <span>
          {bannerList.findIndex((FindPos) => FindPos.id === text.id) + 1}
        </span>
      )
    },
    {
      title: 'Image',
      key: 'image',
      width: '40%',
      render: (text, record, index) => (
        <img style={styleCSS} src={record.image} />
      )
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: '20%'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space>
          <a onClick={(e) => onEdit(e, ACTION.EDIT, record)}>แก้ไข</a>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={(e) => confirm(e, record)}>
            <a>ลบ</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>Banner</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>
                เพิ่มข้อมูลแบนเนอร์
              </AddCreate>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <NewTable
              bordered
              columns={columns}
              loading={isLoading}
              dataSource={bannerList}
              rowKey={(record) => record.id}
            />
            {visible && (
              <ManageBanner
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                action={action}
                TrNo={AntSelectNo}
                typeSelected={typeSelected}
              />
            )}
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

export default banner
