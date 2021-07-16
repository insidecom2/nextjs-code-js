import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import {
  Switch,
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  Typography,
  Form
} from 'antd'
import { ACTION } from 'utils/constants.js'
import ManageSize from 'components/Settings/Size/ManageSize'
import { useDispatch, useSelector } from 'react-redux'
import {
  createSize,
  deleteSize,
  getSizeList,
  getSizeTypeListById,
  updateActiveSizeType,
  updateSize
} from 'store/reducers/size'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import {
  AddCreate
} from 'styles/BtnCreate/index.style'
import {
  NewTable
} from 'styles/NewTable/index.style'

const Size = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const { sizeList, isLoading } = useSelector(
    (state) => ({
      sizeList: state.size.sizeList,
      isLoading: state.size.isLoading
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getSizeList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text, record, index) => (
        <span>
          {Number(sizeList.findIndex((FindPos) => FindPos.id === text.id)) + 1}
        </span>
      )
    },
    {
      title: 'Width',
      dataIndex: 'width',
      key: 'width'
    },
    {
      title: 'Length',
      dataIndex: 'length',
      key: 'length'
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => sizeList[Number(sizeList.findIndex((FindPos) => FindPos.id === text.id))].is_active&&(
        <Space>
<<<<<<< HEAD
          <a  onClick={(e) => onEdit(e, ACTION.EDIT, record.id)}>แก้ไข</a>
=======
          <a onClick={(e) => onEdit(e, ACTION.EDIT, record.id)}>edit</a>
>>>>>>> a534e9247d5e8ecdcd63fed6b3bded7cf05af97c
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

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteSize(record.id))
    await dispatch(getSizeList())
  }

  const onClick = (e, action) => {
    SetAntSelectNo(sizeList.length + 1)
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
  }

  const setActive = async (e, record) => {
<<<<<<< HEAD
    await dispatch(updateActiveSizeType(record.id, e));
    await dispatch(getSizeList())
=======
    await dispatch(updateActiveSizeType(record.id, e))
>>>>>>> a534e9247d5e8ecdcd63fed6b3bded7cf05af97c
  }

  const onEdit = async (e, action, id) => {
    let GetPosition =
      Number(sizeList.findIndex((FindPos) => FindPos.id === id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    setAction(action)
    await dispatch(getSizeTypeListById(id))
    await dispatch(getSizeList())
    setVisible(true)
  }

  const onOk = async (GetId, data) => {
    await setVisible(false)
    String(action) !== 'Edit'
      ? await dispatch(createSize(data))
      : await dispatch(updateSize(GetId, data))
    await dispatch(getSizeList())
  }

  return (
<<<<<<< HEAD
    <MainLayout><div style={{ margin: '0 16px', padding: 10 }}>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>รายการขนาด</Typography.Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>เพิ่ม ขนาด</AddCreate>
          </Row>
        </Col>
      </Row>
      <NewTable
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={sizeList}
        rowKey={(record) => record.id}
      />
      {visible && (
        <ManageSize
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          action={action}
          TrNo={AntSelectNo}
=======
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>Size List</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <Button onClick={(e) => onClick(e, ACTION.CREATE)}>
                Add Size
              </Button>
            </Row>
          </Col>
        </Row>
        <Table
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={sizeList}
          rowKey={(record) => record.id}
>>>>>>> a534e9247d5e8ecdcd63fed6b3bded7cf05af97c
        />
        {visible && (
          <ManageSize
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

Size.propTypes = {}

export default Size
