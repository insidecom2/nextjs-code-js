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
import ManageEstimateSetting from 'components/Settings/ManageEstimateSetting'
import { AddCreate } from 'styles/BtnCreate/index.style'
import { NewTable } from 'styles/NewTable/index.style'
import { getEstimateSettingList, updateActiveEstimateSetting, getEstimateSettingListById ,updateEstimateSetting, createEstimateSetting,  deleteEstimateSetting } from 'store/reducers/estimateSetting'

const estimateSetting = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [estimateSettingSelected, setEstimateSettingSelected] = useState(null)

  const { estimateSettingList, isLoading } = useSelector(
    (state) => ({
      estimateSettingList: state.estimateSetting.EstimateSettingList,
      isLoading: state.estimateSetting.isLoading,
    }),
    []
  )
  
  const setActive = async (e, record) => {
    await dispatch(updateActiveEstimateSetting(record.id, e))
    await dispatch(getEstimateSettingList())
  }

  const fetchData = async () => {
    await dispatch(getEstimateSettingList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteEstimateSetting(record.id))
    await dispatch(getEstimateSettingList())
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
        estimateSettingList[
          Number(estimateSettingList.findIndex((FindPos) => FindPos.id === text.id))
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
    SetAntSelectNo(estimateSettingList.length + 1)
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onEdit = async (e, action, record) => {
    let GetPosition =
      Number(estimateSettingList.findIndex((FindPos) => FindPos.id === record.id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    await setEstimateSettingSelected(record)
    await setAction(action)
    await dispatch(getEstimateSettingListById(record.id))
    setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
    setEstimateSettingSelected(null)
  }

  const onOk = async (data) => {
    const formData = 
    {
      'name': data.name,
    'size': data.size,
    'unit': data.unit,
    'price100': data.price100,
    'price500': data.price500,
    'price1000': data.price1000
    }
    await setVisible(false)
    String(action) !== 'Edit'
      ? await dispatch(createEstimateSetting(formData))
      : await dispatch(updateEstimateSetting(data.id, formData))
    await dispatch(getEstimateSettingList())
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
          dataSource={estimateSettingList}
          rowKey={(record) => record.id}
        />
        {visible && (
          <ManageEstimateSetting
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            action={action}
            TrNo={AntSelectNo}
            estimateSettingSelected={estimateSettingSelected}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default estimateSetting;
