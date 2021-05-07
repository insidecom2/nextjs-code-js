import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import _ from 'lodash'
import PropTypes, { arrayOf } from 'prop-types'
import {
  Popconfirm,
  Space,
  Table,
  Steps,
  Button,
  Form,
  Input,
  Modal,
  Switch,
  Select,
  InputNumber,
  message,
  Upload
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { getCategoryList } from 'store/reducers/category'
import { getCategoryTypeList } from 'store/reducers/categoryType'
import useDeepEffect from 'utils/hooks/useDeepEffect'
const CreateProducts = (props) => {
  const { visible, onOk, onCancel, action, TrNo, typeSelected } = props
  const [form] = Form.useForm()
  const [type, settype] = useState([])
  const dispatch = useDispatch()
  const [current, setCurrent] = React.useState(0)
  const { Step } = Steps
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [StatusOnSelect,SetStatusOnSelect] = useState(0);

  const { categoryList, typeList, productsList, isLoading } = useSelector(
    (state) => ({
      productsList: state.products.productsList,
      categoryList: state.category.categoryList,
      typeList: state.categoryType.categoryTypeList,
      isLoading: state.products.isLoading
    }),
    []
  )

  const next = () => {
      setCurrent(current + 1)
  }
  
  const prev = () => {
    setCurrent(current - 1)
  }

  const onSelectCategory = async (value) => {
    await SetStatusOnSelect(1);
    await settype(typeList.filter((key) => key.category.id == value))
  }

  // console.log(typeList)
  useDeepEffect(() => {
    async function fetchData() {
      await dispatch(getCategoryList())
      await dispatch(getCategoryTypeList())
    }
    fetchData()
  }, [])

  useDeepEffect(() => {
    if (StatusOnSelect && type.length>0) {
      form.setFieldsValue({
        type: type[0].id
      })
    }
  }, [type])

  useDeepEffect(() => {
    if (action === ACTION.EDIT && !_.isNull(typeSelected)) {
      if (typeList.length>0) {
         settype(typeList.filter((key) => key.category.id == typeSelected.category_type.category.id))
      }
      form.setFieldsValue({
        code: typeSelected.code,
        name: typeSelected.name,
        detail: typeSelected.detail,
        category: typeSelected.category_type.category.id,
        type: typeSelected.category_type.id,
        price: typeSelected.price,
        weight: typeSelected.weight,
        size: typeSelected.size,
        category:typeSelected.category_type.category.id, 
        type: typeSelected.category_type.id
      })
    }
    
  }, [typeList,typeSelected])
 
  const onFinish = (values) => {
    const dataList = {
      data: {
        code: values.code,
        name: values.name,
        category_type: values.type,
        detail: values.detail,
        price: values.price,
        weight: values.weight,
        size: values.size
      },
      images:
        values.image === undefined
          ? []
          : values.image.fileList.map((key) => key.originFileObj),
      quantity: [
        {
          quantity: 0,
          price: 0
        }
      ]
    }
    
    if (action === ACTION.EDIT) {
      dataList.id = typeSelected.id
    }
    if (current === steps.length - 1) {
      onOk(dataList)
    } else {
      next()
    }
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text) => (
        <span>
          {1}
        </span>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text.toString().toUpperCase()}</span>
    },
    {
      title: 'Category / Type',
      dataIndex: 'category_type',
      key: 'name',
      render: (text) => <span>{text.category.name + ' / ' + text.name}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space>
          <a >edit</a>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={(e) => confirm(e, record)}>
            <a>delete</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const steps = [
    {
      title: 'First',
      content: (
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
            ]}>
            {/* onChange={onSelectCategory} */}
            <Select onChange={onSelectCategory}>
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
            <Select >
              {type.map((val2) => (
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
        </>
      )
    },
    {
      title: 'Second',
      content: (
        <>
          <Form.Item label="Image" name="image" valuePropName="upload">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              beforeUpload={beforeUpload}
              onChange={handleChange}>
              <div>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ height: '100px' }}
                  />
                ) : (
                  <div style={{ marginTop: 8 }}>
                    {loading ? (
                      <LoadingOutlined />
                    ) : (
                      <div>
                        <PlusOutlined />
                        <br />
                        <label>Upload</label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Upload>
          </Form.Item>
        </>
      )
    },
    {
      title: 'Last',
      content: (
        <>
          <Form.Item valuePropName="Last" label="Last" name="is_Last">
            
            <Table
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={productsList}
        rowKey={(record) => record.id}
      />
          </Form.Item>
      
        </>
      )
    }
  ]

  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false)
      getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl))
    }
  }

  return (
    <Modal
      closable={false}
      title={`${action} Type`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <span key="span01" style={{ margin: '0 8px' }}>
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>
          {current > 0 && (
            <Button
              key="previous"
              style={{ margin: '0 8px' }}
              onClick={() => prev()}>
              Previous
            </Button>
          )}
        </span>
        ,
        <span key="span02" >
          {current < steps.length - 1 &&(
            <Button form="manageType" key="next" type="primary"  htmlType="submit">
             Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button form="manageType" key="ok" type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </span>
      ]}>
      <Form form={form} name="manageType" onFinish={onFinish} layout="vertical">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          <div style={{ display: current === 0 ? 'block' : 'none' }}>
            {steps[0].content}
          </div>
          <div style={{ display: current === 1 ? 'block' : 'none' }}>
            {steps[1].content}
          </div>
          <div style={{ display: current === 2 ? 'block' : 'none' }}>
            {steps[2].content}
          </div>
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
