/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
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
import ManageSpecialTechnic from 'components/Settings/SpecialTechnic/ManageSpecialTechnic'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { AddCreate } from 'styles/BtnCreate/index.style'
import { NewTable } from 'styles/NewTable/index.style'
import { updatespecialTechnic, getspecialTechnicById, updateActivespecialTechnic, deletespecialTechnic, createspecialTechnic, getspecialTechnicList } from 'store/reducers/specialTechnic'

const SpecialTechnic = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const [thisSelected,setThisSelected] = useState(null)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const { specialTechnicList, isLoading, dd } = useSelector(
    (state) => ({
      specialTechnicList: state.specialTechnic.specialTechnicList,
      isLoading: state.specialTechnic.isLoading,
      dd:state
    }),
    []
  )

  const fetchData = async () => {
    await dispatch(getspecialTechnicList())
  }

  useDeepEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: 'ลำดับ.',
      key: 'no',
      render: (text, record, index) => (
        <span>
          {specialTechnicList.findIndex((FindPos) => FindPos.id === text.id) + 1}
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
        specialTechnicList[
          Number(specialTechnicList.findIndex((FindPos) => FindPos.id === text.id))
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
        <Form form={form} name="typeActive" layout="vertical">
          <Form.Item
            valuePropName="checked"
            name={'active_' + record.id}
            initialValue={!!text}>
            <Switch onChange={(e) => setActive(e, record)} />
          </Form.Item>
        </Form>
      )
    }
  ]

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deletespecialTechnic(record.id))
    await dispatch(getspecialTechnicList())
  }

  const onClick = (e, action) => {
    SetAntSelectNo(specialTechnicList.length + 1)
    e.preventDefault()
    setAction(action)
    setVisible(true)
  }

  const onOk = async (data) => {
    const formData = new FormData()
    formData.set('name', data.name)
    formData.append('image', data.image)
    await setVisible(false)
    if (action === ACTION.CREATE) {
      await dispatch(createspecialTechnic(formData))
    } else {
      await dispatch(updatespecialTechnic(data.id, formData))
    }
    await dispatch(getspecialTechnicList())
  }

  const setActive = async (e, record) => {
    await dispatch(updateActivespecialTechnic(record.id, e))
    await dispatch(getspecialTechnicList())
  }

  const onCancel = () => {
    setThisSelected(null)
    setVisible(false)
  }

  const onEdit = async (e, action, record) => {
    const GetPosition =
      Number(specialTechnicList.findIndex((FindPos) => FindPos.id === record.id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    setAction(action)
    await setThisSelected(record)
    await dispatch(getspecialTechnicById(record.id))
    await dispatch(getspecialTechnicList())
    setVisible(true)
  }

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>รายการเทคนิคพิเศษ</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>
                เพิ่ม เทคนิคพิเศษ
              </AddCreate>
            </Row>
          </Col>
        </Row>
        <NewTable
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={specialTechnicList}
          rowKey={(record) => record.id}
        />
        {visible && (
          <ManageSpecialTechnic
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            action={action}
            TrNo={AntSelectNo}
            thisSelected={thisSelected}
          />
        )}
      </div>
    </MainLayout>
  )
}

SpecialTechnic.propTypes = {}

export default SpecialTechnic
