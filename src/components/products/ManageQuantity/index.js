import { Button, Form, Input, Space } from 'antd'
import { useDispatch } from 'react-redux'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { getProductsList, updateQuantityPrice } from 'store/reducers/products'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import React from 'react'

const ManageQuantity = (props) => {
  const { QPRecord, QPNo, qpCB, ForAction, ForQPValue } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useDeepEffect(() => {
    if (String(ForAction) === 'Edit') {
      form.setFieldsValue({
        quantity: QPRecord.quantity,
        price: QPRecord.price
      })
    }
  }, [])

  const OnOK = async (SendQP) => {
    await dispatch(updateQuantityPrice(QPRecord.id, SendQP))
    await dispatch(getProductsList())
  }

  // console.log(QPRecord)
  const onFinish = (values) => {
    const data = {
      quantity: values.quantity,
      price: values.price
    }
    if (String(ForAction) === 'Edit') {
      OnOK(data)
    } else {
      ForQPValue(values.adds)
    }
    qpCB(false)
  }

  return (
    <>
      <Form
        form={form}
        name="manageQuantity"
        layout="vertical"
        onFinish={onFinish}>
        {String(ForAction) === 'Edit' ? (
          <div>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: 'Please input your Quantity!'
                }
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input your Price!'
                }
              ]}>
              <Input />
            </Form.Item>
          </div>
        ) : (
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
        )}
      </Form>
      <Button
        key="CancelQP"
        type="primary"
        onClick={() => qpCB(false)}
        style={{ margin: '0 8px' }}>
        Cancel
      </Button>
      <Button
        form="manageQP"
        key="SaveQP"
        type="primary"
        htmlType="submit"
        style={{ margin: '0 8px' }}>
        Save
      </Button>
    </>
  )
}

export default ManageQuantity
