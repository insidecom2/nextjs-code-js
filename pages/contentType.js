import {
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  Switch,
  Typography
} from 'antd'
import MainLayout from 'components/Layout/MainLayout'
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION } from 'utils/constants.js'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import ManageContentType from 'components/Settings/ContentType'
import { getContentTypeList, updateActiveContentType, deleteContentType, updateContentType, createContentType } from 'store/reducers/contentType'

const contentType = () => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [typeSelected, setTypeSelected] = useState(null)
  const { contentTypeList, isLoading } = useSelector(
    (state) => ({
      contentTypeList: state.contentType.ContentTypeList,
      isLoading: state.contentType.isLoading
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getContentTypeList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const setActive = async (e, record) => {
    await dispatch(updateActiveContentType(record.id, e))
    await dispatch(getContentTypeList())
  }

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteContentType(record.id))
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
    await setVisible(false)
    const formData = data;
    if (action === ACTION.CREATE) {
      await dispatch(createContentType(formData))
    } else if (action === ACTION.EDIT) {
      await dispatch(updateContentType(data.id, formData))
    }

    await dispatch(getContentTypeList())
  }

  const onClick = async (e, action) => {
    e.preventDefault()
    SetAntSelectNo(contentTypeList.length + 1)
    await dispatch(getContentTypeList())
    setAction(action)
    setVisible(true)
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index) => (
        <span>
          {contentTypeList.findIndex((FindPos) => FindPos.id === text.id) + 1}
        </span>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space>
          <a onClick={(e) => onEdit(e, ACTION.EDIT, record)}>edit</a>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={(e) => confirm(e, record)}>
            <a>delete</a>
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
            <Typography.Title level={3}>รายการหมวดหมู่บทความ</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
            <Button onClick={(e) => onClick(e, ACTION.CREATE)}>Add ContentType</Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table bordered columns={columns}
                 loading={isLoading}
                 dataSource={contentTypeList}
                 rowKey={(record) => record.id}
            ></Table>
            {visible && (
        <ManageContentType
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

export default contentType
