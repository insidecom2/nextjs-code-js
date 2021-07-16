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
import ManageStyle from 'components/Settings/Style/ManageStyle'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import {
  createStyle,
  deleteStyle,
  getStyleList,
  updateActiveStyle,
  getStyleById,
  updateStyle
} from 'store/reducers/style'
import { AddCreate } from 'styles/BtnCreate/index.style'
import { NewTable } from 'styles/NewTable/index.style'

const Style = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const { styleList, isLoading } = useSelector(
    (state) => ({
      styleList: state.style.styleList,
      isLoading: state.style.isLoading
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getStyleList())
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
          {Number(styleList.findIndex((FindPos) => FindPos.id === text.id)) + 1}
        </span>
      )
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
        styleList[
          Number(styleList.findIndex((FindPos) => FindPos.id === text.id))
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

  const onClick = (e, action) => {
    SetAntSelectNo(styleList.length + 1)
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteStyle(record.id))
    await dispatch(getStyleList())
  }

  const onCancel = () => {
    setVisible(false)
  }
  const setActive = async (e, record) => {
    await dispatch(updateActiveStyle(record.id, e))
    await dispatch(getStyleList())
  }

  const onEdit = async (e, action, id) => {
    let GetPosition =
      Number(styleList.findIndex((FindPos) => FindPos.id === id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    setAction(action)
    await dispatch(getStyleById(id))
    await dispatch(getStyleList())
    setVisible(true)
  }

  const onOk = async (GetId, data) => {
    await setVisible(false)
    String(action) !== 'Edit'
      ? await dispatch(createStyle(data))
      : await dispatch(updateStyle(GetId, data))
    await dispatch(getStyleList())
  }

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>รายการคุณลักษณะ</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>
                เพิ่ม คุณลักษณะ
              </AddCreate>
            </Row>
          </Col>
        </Row>
        <NewTable
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={styleList}
          rowKey={(record) => record.id}
        />
        {visible && (
          <ManageStyle
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

Style.propTypes = {}

export default Style
