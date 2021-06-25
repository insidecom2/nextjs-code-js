import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  Switch,
  Typography,
  Image
} from 'antd'
import { ACTION } from 'utils/constants.js'
import ManageType from 'components/Settings/Type/ManageType'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import {
  createCategoryType,
  deleteCategoryType,
  getCategoryTypeList,
  getCategoryTypeListById,
  updateCategoryType,
  updateActiveCategoryType
} from 'store/reducers/categoryType'
import { getCategoryList } from 'store/reducers/category'
import { unset } from 'lodash'

const Type = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [typeSelected, setTypeSelected] = useState(null)

  const { categoryTypeList, isLoading } = useSelector(
    (state) => ({
      categoryTypeList: state.categoryType.categoryTypeList,
      isLoading: state.categoryType.isLoading
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getCategoryTypeList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const setActive = async (e, record) => {
    await dispatch(updateActiveCategoryType(record.id, e))
    await dispatch(getCategoryTypeList())
  }

  const columns = [
    {
      title: 'ลำดับ.',
      key: 'no',
      render: (text, record, index, e) => (
        <span>
          {Number(
            categoryTypeList.findIndex((FindPos) => FindPos.id === text.id)
          ) + 1}
        </span>
      )
    },
    {
      title: 'ภาพ',
      key: 'image',
      dataIndex: 'image',
      render: (text, record, index) => <Image width={200} src={text} />,
      width: '10%'
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text.toString()}</span>
    },
    {
      title: 'หมวดหมู่',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <span>{text.name.toString()}</span>
    },
    {
      title: 'Active',
      key: 'is_active',
      dataIndex: 'is_active',
      render: (text, record, index) => (
        <Switch onChange={(e) => setActive(e, record)} checked={text} />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) =>
        categoryTypeList[
          Number(
            categoryTypeList.findIndex((FindPos) => FindPos.id === text.id)
          )
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
    }
  ]

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteCategoryType(record.id))
    await fetchData()
  }

  const onClick = async (e, action) => {
    e.preventDefault()
    SetAntSelectNo(categoryTypeList.length + 1)
    await dispatch(getCategoryList())
    setAction(action)
    setVisible(true)
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

    const formData = new FormData()
    formData.set('code', data.code)
    formData.set('name', data.name)
    formData.set('category', data.category)
    formData.append('image', data.image)

    if (action === ACTION.CREATE) {
      await dispatch(createCategoryType(formData))
    } else if (action === ACTION.EDIT) {
      await dispatch(updateCategoryType(data.id, formData))
    }

    await dispatch(getCategoryTypeList())
  }

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>รายการประเภท</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <Button onClick={(e) => onClick(e, ACTION.CREATE)}>
                เพิ่ม ประเภท
              </Button>
            </Row>
          </Col>
        </Row>
        <Table
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={categoryTypeList}
          rowKey={(record) => record.id}
        />
        {visible && (
          <ManageType
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            action={action}
            typeSelected={typeSelected}
            TrNo={AntSelectNo}
          />
        )}
      </div>
    </MainLayout>
  )
}

Type.propTypes = {}

export default Type
