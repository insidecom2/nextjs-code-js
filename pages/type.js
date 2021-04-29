import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import {
  Button,
  Form,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  Switch,
  Typography
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

const Type = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [form] = Form.useForm()

  const { categoryTypeList, isLoading } = useSelector(
    (state) => ({
      categoryTypeList: state.categoryType.categoryTypeList,
      isLoading: state.categoryType.isLoading
    }),
    []
  )

  const setActive = async (e, record) => {
    await dispatch(updateActiveCategoryType(record.id, e))
  }

  const fetchData = async () => {
    await dispatch(getCategoryTypeList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteCategoryType(record.id))
    await fetchData()
  }
  
  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index, e) => 
      <span>{Number(categoryTypeList.findIndex(FindPos=>FindPos.id===text.id)) + 1}
    
      </span>

    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text.toString().toUpperCase()}</span>
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
        <Form form={form} name="typeActive" layout="vertical">
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

  const onClick = async (e, action) => {
    e.preventDefault()
    SetAntSelectNo(categoryTypeList.length + 1)
    await dispatch(getCategoryList())
    setAction(action)
    setVisible(true)
  }

  const onEdit = async (e, action, id) => {
    const GetPosition = Number(categoryTypeList.findIndex((FindPos) => FindPos.id === id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    setAction(action)
    await dispatch(getCategoryTypeListById(id))
    await dispatch(getCategoryList())
    await setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
  }

  const onOk = async (GetId, data) => {
    await setVisible(false)
    String(action) !== 'Edit'
      ? await dispatch(createCategoryType(data))
      : await dispatch(updateCategoryType(GetId, data))
      await dispatch(getCategoryTypeList())
  }


  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>Type List</Typography.Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button onClick={(e) => onClick(e, ACTION.CREATE)}>Add Type</Button>
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
          TrNo={AntSelectNo}
        />
      )}
    </MainLayout>
  )
}

Type.propTypes = {}

export default Type
