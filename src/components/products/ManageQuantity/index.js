import { Button, Form, Input, Row, Space } from 'antd'
import { useDispatch } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { getProductsList, updateQuantityPrice } from 'store/reducers/products'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { ACTION } from 'utils/constants'
import PropTypes from 'prop-types'

const ManageQuantity = (props) => {
  const {
    quantitySelected,
    setVisibleEdit,
    action,
    setQuantitySelected
  } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useDeepEffect(() => {
    if (action === ACTION.EDIT) {
      form.setFieldsValue({
        quantity: quantitySelected.quantity,
        price: quantitySelected.price
      })
    }
  }, [])

  const onOk = async (data) => {
    await dispatch(updateQuantityPrice(quantitySelected.id, data))
    await dispatch(getProductsList())
  }

  // console.log(QPRecord)
  const onFinish = async (values) => {
    const data = {
      quantity: values.quantity,
      price: values.price
    }
    if (action === ACTION.EDIT) {
      await onOk(data)
    } else {
      setQuantitySelected(values.adds)
    }
    setVisibleEdit(false)
  }

  return (
    <>
      <Form
        form={form}
        name="manageQuantity"
        layout="vertical"
        onFinish={onFinish}>
        <Form.List name="adds">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'quantity']}
                    fieldKey={[fieldKey, 'quantity']}
                    rules={[{ required: true, message: 'Missing Quantity' }]}>
                    <Input placeholder="Quantity" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'price']}
                    fieldKey={[fieldKey, 'price']}
                    rules={[{ required: true, message: 'Missing Price' }]}>
                    <Input placeholder="Price" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}>
                  Add Quantity
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
      <Row justify="end">
        <Button onClick={() => setVisibleEdit(false)}>Back</Button>
      </Row>
    </>
  )
}

ManageQuantity.propTypes = {
  action: PropTypes.string,
  quantitySelected: PropTypes.object,
  setQuantitySelected: PropTypes.func,
  setVisibleEdit: PropTypes.bool
}

export default ManageQuantity
