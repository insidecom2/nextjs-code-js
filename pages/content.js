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
import MainLayout from 'components/Layout/MainLayout'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION } from 'utils/constants.js'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import ManageContent from 'components/Settings/ManageContent'
import {
  createContent,
  deleteContent,
  getContentList,
  updateActiveContent,
  updateContent
} from 'store/reducers/content';

import {
  AddCreate
} from 'styles/BtnCreate/index.style';

import {
  NewTable
} from 'styles/NewTable/index.style';

const content = () => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [typeSelected, setTypeSelected] = useState(null)
  const { contentList, isLoading } = useSelector(
    (state) => ({
      contentList: state.content.ContentTypeList,
      isLoading: state.content.isLoading
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getContentList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const setActive = async (e, record) => {
    await dispatch(updateActiveContent(record.id, e))
    await dispatch(getContentList())
  }

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteContent(record.id))
    await fetchData()
  }

  const onEdit = async (e, action, record) => {
    e.preventDefault()
    await setTypeSelected(record)
    await setAction(action)
    await setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
    setTypeSelected(null)
  }

  const onOk = async (data) => {
    // console.log(data)
    await setVisible(false)
    const formData = new FormData()
    formData.set('title', data.title)
    formData.set('content_type', data.content_type)
    formData.set('detail', data.detail)
    formData.set('seo_title', data.seo_title)
    formData.set('focus_key', data.focus_key)
    formData.set('seo_meta_description', data.seo_meta_description)
    formData.append('image', data.image)
    if (action === ACTION.CREATE) {
      await dispatch(createContent(formData))
    } else if (action === ACTION.EDIT) {
      await dispatch(updateContent(data.id, formData))
    }

    await dispatch(getContentList())
  }

  const onClick = async (e, action) => {
    e.preventDefault()
    SetAntSelectNo(contentList.length + 1)
    await dispatch(getContentList())
    setAction(action)
    setVisible(true)
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index) => (
        <span>
          {contentList.findIndex((FindPos) => FindPos.id === text.id) + 1}
        </span>
      )
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'seo title',
      dataIndex: 'seo_title',
      key: 'seo_title'
    },
    {
      title: 'content type',
      render: (text) => <Space>{text.content_type.name}</Space>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => contentList[Number(contentList.findIndex((FindPos) => FindPos.id === text.id))].is_active&&(
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

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>รายการบทความ</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>
                เพิ่ม บทความ
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
              dataSource={contentList}
              rowKey={(record) => record.id}
            />
            {visible && (
              <ManageContent
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                action={action}
                typeSelected={typeSelected}
                TrNo={AntSelectNo}
              />
            )}
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

export default content
