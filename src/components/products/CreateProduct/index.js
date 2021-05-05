import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Steps, Button, Form, Input, Modal, Switch, Select, InputNumber, message } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { getCategoryList } from 'store/reducers/category'
import { getCategoryTypeList } from 'store/reducers/categoryType'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { ACTION } from 'utils/constants.js'
const CreateProducts = (props) => {
  const { visible, onOk, onCancel, action, TrNo, typeSelected} = props
  const [form] = Form.useForm()
  const [type, settype] = useState([])
  const dispatch = useDispatch()
  const [current, setCurrent] = React.useState(0);
  const { Step } = Steps;

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    dispatch(getCategoryList())
    dispatch(getCategoryTypeList())
  }, [])

  useDeepEffect(() => {
    if (action === ACTION.EDIT && !_.isNull(typeSelected)) {
      // console.log(typeSelected)
      form.setFieldsValue({
      code: typeSelected.code,
      name: typeSelected.name,
      detail: typeSelected.detail,
      price: typeSelected.price,
      weight: typeSelected.weight,
      size: typeSelected.size
      })
 
    }
  }, [typeSelected])

  const { categoryList, isLoading, typeList, productsList } = useSelector(
    (state) => ({
      productsList: state.products.productsList,
      categoryList: state.category.categoryList,
      isLoading: state.category.isLoading,
      typeList: state.categoryType.categoryTypeList
    }),
    []
  )
// console.log(productsList)
  // const onSelectCategory = async (value) => {
  //   await settype(typeList.filter((key) => key.category == value))
  // }

  const onFinish = (values) => {
    const dataList = {
     data:{
      code: values.code,
      name: values.name,
      category_type: values.type,
      detail: values.detail,
      price: values.price,
      weight: values.weight,
      size: values.size
     },
     images:
       
       []
        
     ,
     quantity:[
      {
        quantity:0,
        price:0
      }
     ]
 
    }
    if (action === ACTION.EDIT) {
      dataList.id = typeSelected.id
    }
    //  console.log(dataList)
    onOk(dataList)
  }

  const steps = [
    {
      title: 'First',
      content: 
     <> 
      <Form.Item
      label="Prodcut Code"
      name="code"
      rules={[
        {
          required: true,
          message: 'Please input your Code!'
        }
      ]}>
      <Input />
    </Form.Item>
    <Form.Item
    label="Product Name"
    name="name"
    rules={[
      {
        required: true,
        message: 'Please input your Type Name!'
      }
    ]}>
    <Input />
  </Form.Item>
  <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input your Category!'
              }
            ]}
            >
              {/* onChange={onSelectCategory} */}
            <Select 
            >
              {categoryList.map((val) => (
                <Select.Option key={val.id} value={val.id}>
                  {val.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please input your Type!'
              }
            ]}>
            <Select>
              {typeList.map((val2) => (
                <Select.Option key={val2.id} value={val2.id}>
                  {val2.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Detail" name="detail">
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Size"
            name="size"
            rules={[
              {
                required: true,
                message: 'Please input your Size!'
              }
            ]}>
            <Input placeholder="W x H x L" />
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
            <InputNumber value="0" />
          </Form.Item>
          <Form.Item
            label="Weight"
            name="weight"
            rules={[
              {
                required: true,
                message: 'Please input your Weight!'
              }
            ]}>
            <InputNumber value="0" />
          </Form.Item>
  </>,
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: <>
      <Form.Item valuePropName="checked" label="Active" name="is_active">
            <Switch />
          </Form.Item>
      </>,
    },
  ];

  return (
    <Modal
      closable={false}
      title={`${action} Type`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button form="manageType" key="ok" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}>
   <Form form={form} name="manageType" onFinish={onFinish} layout="vertical">
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
      </Form>
    </Modal>
  )
}

CreateProducts.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default CreateProducts
