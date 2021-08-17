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
import ManageFoiling from 'components/Settings/Foiling/ManageFoiling'
import { createfoilingTechnic, updatefoilingTechnic, deletefoilingTechnic, getfoilingTechnicById, updateActivefoilingTechnic, getfoilingTechnicList } from 'store/reducers/foilingTechnic'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { AddCreate } from 'styles/BtnCreate/index.style'
import { NewTable } from 'styles/NewTable/index.style'

const foilingTechnic = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [foilingTechnicSelected, setfoilingTechnicSelected] = useState(null)

  const { foilingTechnicList, isLoading } = useSelector(
    (state) => ({
      foilingTechnicList: state.foilingTechnic.foilingTechnicList,
      isLoading: state.foilingTechnic.isLoading
    }),
    []
  )

//   console.log(foilingTechnicList)

  const fetchData = async () => {
    await dispatch(getfoilingTechnicList())
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
          {foilingTechnicList.findIndex((FindPos) => FindPos.id === text.id) + 1}
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
        foilingTechnicList[
          Number(foilingTechnicList.findIndex((FindPos) => FindPos.id === text.id))
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
    await dispatch(deletefoilingTechnic(record.id))
    await dispatch(getfoilingTechnicList())
  }

  const onClick = (e, action) => {
    SetAntSelectNo(foilingTechnicList.length + 1)
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
      await dispatch(createfoilingTechnic(formData))
    } else {
      await dispatch(updatefoilingTechnic(data.id, formData))
    }
    await dispatch(getfoilingTechnicList())
  }

  const setActive = async (e, record) => {
    await dispatch(updateActivefoilingTechnic(record.id, e))
    await dispatch(getfoilingTechnicList())
  }

  const onCancel = () => {
    setVisible(false)
    setfoilingTechnicSelected(null)
  }

  const onEdit = async (e, action, record) => {
    const GetPosition =
      Number(foilingTechnicList.findIndex((FindPos) => FindPos.id === record.id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    setAction(action)
    await setfoilingTechnicSelected(record)
    await dispatch(getfoilingTechnicById(record.id))
    await dispatch(getfoilingTechnicList())
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
                เพิ่ม เทคนิคพิเศษ (ปั๊มฟอยล์)
              </AddCreate>
            </Row>
          </Col>
        </Row>
        <NewTable
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={foilingTechnicList}
          rowKey={(record) => record.id}
        />
        {visible && (
          <ManageFoiling
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            action={action}
            TrNo={AntSelectNo}
            foilingTechnicSelected={foilingTechnicSelected}
          />
        )}
      </div>
    </MainLayout>
  )
}

foilingTechnic.propTypes = {}

export default foilingTechnic
