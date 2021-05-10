import React, { useState } from 'react'
import { Button, Form, Popconfirm, Row, Space, Steps, Table } from 'antd'
import StepProduct from 'components/products/ManageProduct/StepProduct'
import PropTypes from 'prop-types'
import ManageQuantity from 'components/products/ManageQuantity'
import { ACTION } from 'utils/constants'
import { deleteQuantityPrice, getProductsList } from 'store/reducers/products'
import { useDispatch } from 'react-redux'

const StepQuantity = (props) => {
  const dispatch = useDispatch()
  const { isLoading, productsList } = props
  const [getRecordQP, setGetQPValue] = useState()
  const [positionOfQP, setPositionOfQP] = useState()
  const [qpAction, setQPAction] = useState('')
  const [editQP, setEditQP] = useState(false)

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteQuantityPrice(record.id))
    await dispatch(getProductsList())
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text) => (
        <span>
          {Number(
            productsList[0].product_quantity_price.findIndex(
              (FindPos) => FindPos.id === text.id
            )
          ) + 1}
        </span>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text) => <span>{text.toString().toUpperCase()}</span>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space>
          {/* <a onClick={(e) => onEdit(e, record)}>edit</a> */}
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={(e) => confirm(e, record)}>
            <a>delete</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const onClick = (e) => {
    setPositionOfQP(productsList[0].product_quantity_price.length + 1)
    e.preventDefault()
    setQPAction(ACTION.CREATE)
    setEditQP(true)
  }

  const QPCallBack = (GetStatus) => setEditQP(GetStatus)
  const CallBackQPValue = (CallQP) => setGetQPValue(CallQP)

  return (
    <div>
      <Form.Item valuePropName="Last" label="Last" name="is_Last">
        {!editQP && (
          <>
            <Row justify="end" style={{ marginBottom: 10 }}>
              <Button onClick={onClick}>Add Quantity</Button>
            </Row>
            <Table
              scroll={{ y: 450 }}
              bordered
              loading={isLoading}
              columns={columns}
              dataSource={productsList[0].product_quantity_price}
              rowKey={(record) => record.id}
              pagination={false}
            />
          </>
        )}
      </Form.Item>
      {editQP && (
        <ManageQuantity
          QPRecord={getRecordQP}
          QPNo={positionOfQP}
          qpCB={QPCallBack}
          ForAction={qpAction}
          ForQPValue={CallBackQPValue}
        />
      )}
    </div>
  )
}

StepQuantity.propTypes = {
  productsList: PropTypes.array,
  isLoading: PropTypes.bool
}

export default StepQuantity
