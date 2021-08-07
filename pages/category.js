import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  Typography,
  Form,
  Switch,
  Image
} from 'antd'
import { ACTION } from 'utils/constants.js'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCategory,
  deleteCategory,
  getCategoryList,
  updateActiveCategory,
  getCategoryListById,
  updateCategory
} from 'store/reducers/category'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import ManageCategory from 'components/Settings/Category/ManageCategory'
import { AddCreate } from 'styles/BtnCreate/index.style'
import { NewTable } from 'styles/NewTable/index.style'

const Category = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const { categoryList, isLoading } = useSelector(
    (state) => ({
      categoryList: state.category.categoryList,
      isLoading: state.category.isLoading
    }),
    []
  )

  const setActive = async (e, record) => {
    await dispatch(updateActiveCategory(record.id, e))
    await dispatch(getCategoryList())
  }

  const fetchData = async () => {
    await dispatch(getCategoryList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteCategory(record.id))
    await dispatch(getCategoryList())
  }

  const columns = [
    {
      title: 'ลำดับ.',
      key: 'no',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: 'ภาพ',
      key: 'image',
      render: (text, record, index) => (
        <Image
          width={200}
          src={
            text.image === (undefined || '')
              ? 'http://188.166.184.117:9000/dev/media/2021/07/824724b8fc516c76d02cdaa8061d432b.jpeg'
              : String(text.image)
          }
        />
      ),
      width: '10%'
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) =>
        categoryList[
          Number(categoryList.findIndex((FindPos) => FindPos.id === text.id))
        ].is_active && (
          <Space>
            <a onClick={(e) => onEdit(e, ACTION.EDIT, record.id)}>แก้ไข</a>
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
        <Form form={form} name="CategoryActive" layout="vertical">
          <Form.Item
            valuePropName="checked"
            name={'active_' + record.id}
            initialValue={text ? true : false}>
            <Switch onChange={(e) => setActive(e, record)} />
          </Form.Item>
        </Form>
      )
    }
  ]

  const onClick = (e, action) => {
    SetAntSelectNo(categoryList.length + 1)
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onEdit = async (e, action, id) => {
    let GetPosition =
      Number(categoryList.findIndex((FindPos) => FindPos.id === id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    setAction(action)
    await dispatch(getCategoryListById(id))
    setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
  }

  const onOk = async (data) => {
    const formData = new FormData()
    formData.set('name', data.name)
    formData.set('code', data.code)
    formData.set('description', data.description)
    formData.append('image', data.image)
    await setVisible(false)
    String(action) !== 'Edit'
      ? await dispatch(createCategory(formData))
      : await dispatch(updateCategory(data.id, formData))
    await dispatch(getCategoryList())
  }

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>รายการหมวดหมู่</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>
                เพิ่ม หมวดหมู่
              </AddCreate>
            </Row>
          </Col>
        </Row>
        <NewTable
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={categoryList}
          rowKey={(record) => record.id}
        />
        {visible && (
          <ManageCategory
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            action={action}
            TrNo={AntSelectNo}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default Category
