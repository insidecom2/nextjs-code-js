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
import useDeepEffect from 'utils/hooks/useDeepEffect'
import ManageThreeDSetting from 'components/Settings/ManageThreeDSetting'
import { AddCreate } from 'styles/BtnCreate/index.style'
import { NewTable } from 'styles/NewTable/index.style'
import { getThreeDSettingList, updateActiveThreeDSetting, getThreeDSettingListById ,updateThreeDSetting, createThreeDSetting,  deleteThreeDSetting } from 'store/reducers/threeDSetting'

const threeDSetting = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [threeDSettingSelected, setThreeDSettingSelected] = useState(null)
  
  const { threeDSettingList, isLoading } = useSelector(
    (state) => ({
      threeDSettingList: state.threeDSetting.ThreeDSettingList,
      isLoading: state.threeDSetting.isLoading
    }),
    []
  )

  const setActive = async (e, record) => {
    await dispatch(updateActiveThreeDSetting(record.id, e))
    await dispatch(getThreeDSettingList())
  }

  const fetchData = async () => {
    await dispatch(getThreeDSettingList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteThreeDSetting(record.id))
    await dispatch(getThreeDSettingList())
  }

  const columns = [
    {
      title: 'ลำดับ.',
      key: 'no',
      render: (text, record, index) => <span>{index + 1}</span>
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
        threeDSettingList[
          Number(threeDSettingList.findIndex((FindPos) => FindPos.id === text.id))
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
    SetAntSelectNo(threeDSettingList.length + 1)
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onEdit = async (e, action, record) => {
    let GetPosition =
      Number(threeDSettingList.findIndex((FindPos) => FindPos.id === record.id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    await setThreeDSettingSelected(record)
    await setAction(action)
    await dispatch(getThreeDSettingListById(record.id))
    setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
    setThreeDSettingSelected(null)
  }

  const onOk = async (data) => {
    const formData = 
    {
     'name': data.name,
     'code': data.code,
    }
    await setVisible(false)
    String(action) !== 'Edit'
      ? await dispatch(createThreeDSetting(formData))
      : await dispatch(updateThreeDSetting(data.id, formData))
    await dispatch(getThreeDSettingList())
  }

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>รายการตั้งค่ากระดาษ Estimate</Typography.Title>
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
          dataSource={threeDSettingList}
          rowKey={(record) => record.id}
        />
        {visible && (
          <ManageThreeDSetting
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            action={action}
            TrNo={AntSelectNo}
            threeDSettingSelected={threeDSettingSelected}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default threeDSetting;
