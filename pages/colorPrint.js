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
import ManageColorPrint from 'components/Settings/ColorPrint'
import { updatecolorPrint, getcolorPrintById, updateActivecolorPrint, deletecolorPrint, createcolorPrint, getcolorPrintList } from 'store/reducers/colorPrint'
import { useDispatch, useSelector } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { AddCreate } from 'styles/BtnCreate/index.style'
import { NewTable } from 'styles/NewTable/index.style'

const colorPrint = (props) => {
  const [action, setAction] = useState(ACTION.CREATE)
  const [visible, setVisible] = useState(false)
  const [AntSelectNo, SetAntSelectNo] = useState(1)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [colorPrintSelected, setcolorPrintSelected] = useState(null)

  const { colorPrintList, isLoading } = useSelector(
    (state) => ({
      colorPrintList: state.colorPrint.colorPrintList,
      isLoading: state.colorPrint.isLoading,
    }),
    []
  )

//   console.log(colorPrintList)

  const fetchData = async () => {
    await dispatch(getcolorPrintList())
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
          {colorPrintList.findIndex((FindPos) => FindPos.id === text.id) + 1}
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
        colorPrintList[
          Number(colorPrintList.findIndex((FindPos) => FindPos.id === text.id))
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
    await dispatch(deletecolorPrint(record.id))
    await dispatch(getcolorPrintList())
  }

  const onClick = (e, action) => {
    SetAntSelectNo(colorPrintList.length + 1)
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
      await dispatch(createcolorPrint(formData))
    } else {
      await dispatch(updatecolorPrint (data.id, formData))
    }
    await dispatch(getcolorPrintList())
  }

  const setActive = async (e, record) => {
    await dispatch(updateActivecolorPrint(record.id, e))
    await dispatch(getcolorPrintList())
  }

  const onCancel = () => {
    setVisible(false)
    setcolorPrintSelected(null)
  }

  const onEdit = async (e, action, record) => {
    const GetPosition =
      Number(colorPrintList.findIndex((FindPos) => FindPos.id === record.id)) + 1
    SetAntSelectNo(GetPosition)
    e.preventDefault()
    setAction(action)
    await setcolorPrintSelected(record)
    await dispatch(getcolorPrintById(record.id))
    await dispatch(getcolorPrintList())
    setVisible(true)
  }

  return (
    <MainLayout>
      <div style={{ margin: '0 16px', padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>รายการสีพิมพ์</Typography.Title>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <AddCreate onClick={(e) => onClick(e, ACTION.CREATE)}>
                เพิ่ม สีพิมพ์
              </AddCreate>
            </Row>
          </Col>
        </Row>
        <NewTable
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={colorPrintList}
          rowKey={(record) => record.id}
        />
        {visible && (
          <ManageColorPrint
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            action={action}
            TrNo={AntSelectNo}
            colorPrintSelected={colorPrintSelected}
          />
        )}
      </div>
    </MainLayout>
  )
}

colorPrint.propTypes = {}

export default colorPrint
