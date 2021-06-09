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
import ManagePromotion from 'components/Settings/ManagePromotion'

import {
  deletePromotion,
  getPromotionList,
  updateActivePromotion,
  updatePromotion,
  createPromotion
} from 'store/reducers/promotion'

const promotion = () => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [typeSelected, setTypeSelected] = useState(null)
  const { isLoading, promotionList } = useSelector(
    (state) => ({
      isLoading: state.promotion.isLoading,
      promotionList: state.promotion.PromotionTypeList
    }),
    []
  )

  // console.log(promotionList)

  const fetchData = async () => {
    await dispatch(getPromotionList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const setActive = async (e, record) => {
    await dispatch(updateActivePromotion(record.id, e))
    await dispatch(getPromotionList())
  }

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deletePromotion(record.id))
    await fetchData()
  }

  const onEdit = async (e, action, record) => {
    e.preventDefault()
    const GetPosition =
      Number(promotionList.findIndex((FindPos) => FindPos.id === record.id)) + 1
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
    formData.set('title', data.title)
    formData.set('detail', data.detail)
    formData.set('discount', Number(data.discount))
    formData.set('discount_type', data.discount_type)
    formData.set('minimun', data.minimun)
    formData.set('start_date', data.start_date)
    formData.set('end_date', data.end_date)
    formData.append('image', data.image)
    if (action === ACTION.CREATE) {
      await dispatch(createPromotion(formData))
    } else if (action === ACTION.EDIT) {
      await dispatch(updatePromotion(data.id, formData))
    }
    await dispatch(getPromotionList())
  }

  const onClick = async (e, action) => {
    e.preventDefault()
    SetAntSelectNo(promotionList.length + 1)
    await dispatch(getPromotionList())
    setAction(action)
    setVisible(true)
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index) => (
        <span>
          {promotionList.findIndex((FindPos) => FindPos.id === text.id) + 1}
        </span>
      )
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
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
            <Typography.Title level={3}>Shipping</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <Button onClick={(e) => onClick(e, ACTION.CREATE)}>
                Add Promotion
              </Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              bordered
              columns={columns}
              loading={isLoading}
              dataSource={promotionList}
              rowKey={(record) => record.id}
            />
            {visible && (
              <ManagePromotion
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

export default promotion
