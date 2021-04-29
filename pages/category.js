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
  Switch
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

const Category = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1);
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
      title: 'No.',
      key: 'no',
      render: (text, record, index) => <span>{index + 1}</span>
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
          <a onClick={(e) => onEdit(e, ACTION.EDIT, record.id)}>edit</a>
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
    let GetPosition = Number(categoryList.findIndex(FindPos=>FindPos.id===id)) + 1;
    SetAntSelectNo(GetPosition);
    e.preventDefault()
    setAction(action)
    await dispatch(getCategoryListById(id))
    setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
  }

  const onOk = async (GetId, data) => {
    await setVisible(false)
    String(action) !== 'Edit'
      ? await dispatch(createCategory(data))
      : await dispatch(updateCategory(GetId, data))
    await dispatch(getCategoryList())
  }

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>Category List</Typography.Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button onClick={(e) => onClick(e, ACTION.CREATE)}>
              Add Category
            </Button>
          </Row>
        </Col>
      </Row>
      <Table
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
    </MainLayout>
  )
}

export default Category
