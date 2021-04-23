import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import {Switch, Button, Col, Popconfirm, Row, Space, Table, Typography,Form  } from 'antd'
import { ACTION } from 'utils/constants.js'
import ManageStyle from 'components/Settings/Style/ManageStyle'
import UpdateStyle from 'components/Settings/Style/UpdateStyle'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { createStyle, deleteStyle, getStyleList, isActiveStyle, getStyleById } from 'store/reducers/style'

const Style = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1);
  const [visibleEdit, setVisibleEdit] = useState(false)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

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
      render: (text, record, index) => <span>{Number(styleList.findIndex(FindPos=>FindPos.id===text.id)) + 1}</span>
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
          <a  onClick={(e) => onEdit(e, ACTION.EDIT, record.id)}>edit</a>
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

  const onClick = (e, action) => {
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (data) => {
    await setVisible(false)
    await dispatch(createStyle(data))
    await dispatch(getStyleList())
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
    await dispatch(isActiveStyle(record.id, e));
  }

  const onEdit = async (e, action, id) => {
    let GetPosition = Number(styleList.findIndex(FindPos=>FindPos.id===id)) + 1;
    SetAntSelectNo(GetPosition);
    e.preventDefault()
    setAction(action)
    await dispatch(getStyleById(id))
    await dispatch(getStyleList())
    setVisibleEdit(true)
  }

  const onUpdateOk = async (id, data) => {
    await setVisibleEdit(false)
    // await dispatch(updateSize(id, data))
    // await dispatch(getSizeList())
  }

  const onUpdateCancel = () => {
    setVisibleEdit(false)
  }

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>Style List</Typography.Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button onClick={(e) => onClick(e, ACTION.CREATE)}>
              Add Style
            </Button>
          </Row>
        </Col>
      </Row>
      <Table
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
        />
      )}
      {visibleEdit && (
        <UpdateStyle
          visible={visibleEdit}
          onOk={onUpdateOk}
          onCancel={onUpdateCancel}
          action={action}
          TrNo={AntSelectNo}
        />
      )}
    </MainLayout>
  )
}

Style.propTypes = {}

export default Style
