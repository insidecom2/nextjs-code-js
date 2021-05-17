import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MinusCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ACTION } from 'utils/constants.js'
import _ from 'lodash'
import PropTypes, { arrayOf } from 'prop-types'
import {
  Popconfirm,
  Space,
  Table,
  Steps,
  Row,
  Button,
  Col,
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
import { deleteQuantityPrice, getProductsList, updateQuantityPrice } from 'store/reducers/products'

const ModalQP = (props) => {
const { QPRecord, QPNo, qpCB, ForAction, ForQPValue } = props;
const [form] = Form.useForm()
const dispatch = useDispatch()

useDeepEffect(() => {
  if (String(ForAction)==="Edit") {
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
let data = {
  quantity: values.quantity,
  price: values.price
}
if (String(ForAction)==="Edit") {
  OnOK(data)
} else
{
  ForQPValue(values.adds)
}
qpCB(false)
}

return<>
<label>No:{QPNo} mode:{ForAction}
</label>
<Form form={form} name="manageQP"  layout="vertical" onFinish={onFinish} >
  
  {String(ForAction)==="Edit"?<>
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
</>:<Form.List name="adds">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'quantity']}
                  fieldKey={[fieldKey, 'quantity']}
                  rules={[{ required: true, message: 'Missing Quantity' }]}
                >
                  <Input placeholder="Quantity" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'price']}
                  fieldKey={[fieldKey, 'price']}
                  rules={[{ required: true, message: 'Missing Price' }]}
                >
                  <Input placeholder="Price" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Quantity
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
}


 </Form> 
<span>
<Button key="CancelQP" type="primary" onClick={()=>qpCB(false)}  style={{ margin: '0 8px' }}>
             Cancel
            </Button>
<Button form="manageQP" key="SaveQP" type="primary"  htmlType="submit"  style={{ margin: '0 8px' }}>
             Save
            </Button>
  </span>  


</>
};

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
  const [QPAction,setQPAction] = useState("")
  const [GetQPValue, setGetQPValue] = useState([]);
  const [EditQP,SetEditQP] = useState(false);
  const [GetRecordQP, SetGetRecordQP] = useState();
  const [PositionOfQP, SetPositionOfQP] = useState();

  const { categoryList, typeList, productsList, isLoading } = useSelector(
    (state) => ({
      productsList: state.products.productsList,
      categoryList: state.category.categoryList,
      typeList: state.categoryType.categoryTypeList,
      isLoading: state.products.isLoading,
    }),
    []
  )

  const confirm = async (e, record) => {
    e.preventDefault()
    await dispatch(deleteQuantityPrice(record.id))
    await dispatch(getProductsList())
  }

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

  const CallBackQPValue=(CallQP)=>setGetQPValue(CallQP);
  const [fileList, setFileList] = useState([]);

  const setDefaultImg =()=>{
    const defaultImg = []
    const ImageList = productsList[0].product_image.map((ListImg)=>defaultImg.push({url:ListImg.image}))
    setFileList(defaultImg)
  };

  useDeepEffect(() => {
    async function fetchData() {
      await dispatch(getCategoryList())
      await dispatch(getCategoryTypeList())
    }
    fetchData()
    setDefaultImg()
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

  const onEdit = async (e, record) => {
    const GetPosition =
      Number(productsList[0].product_quantity_price.findIndex((FindPos) => FindPos.id === record.id)) + 1
    e.preventDefault()
    await SetPositionOfQP(GetPosition)  
    await SetGetRecordQP(record)
    await setQPAction("Edit")
    await SetEditQP(true)
  }

  const onClick = (e) => {
    SetPositionOfQP(productsList[0].product_quantity_price.length + 1)
    e.preventDefault()
    setQPAction("Add")
    SetEditQP(true)
  }

  const QPCallBack=(GetStatus)=>SetEditQP(GetStatus)
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
      quantity: GetQPValue===undefined?[]:GetQPValue
     }
    // console.log(dataList)
    if (action === ACTION.EDIT) {
      dataList.id = typeSelected.id
    }
    if (current === steps.length - 1) {
      onOk(dataList)
    } else {
      next()
    }
  }
  
  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onRemove = file => {
    let PositionOfImg = fileList.indexOf(file);
    let PositionOfId = productsList[0].product_image[PositionOfImg].id;
    let CopyFile = [...fileList]
    if (PositionOfImg > -1) {
      CopyFile.splice(PositionOfImg, 1);
    }
    setFileList(CopyFile)

    console.log(PositionOfId)
  }

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text) => (
        <span>
          {Number(productsList[0].product_quantity_price.findIndex((FindPos) => FindPos.id === text.id)) +
            1}
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
          <a onClick={(e) => onEdit(e, record)}>edit</a>
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
              onChange={handleChange}
              onPreview={onPreview}
              fileList={fileList}
              onRemove={onRemove}
              >
              
              
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
            {!EditQP &&
            (
            
            <>
         
          <Row justify="end">
            <Button onClick={onClick}>
              Add Quantity
            </Button>
          </Row>
       
            <Table
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={productsList[0].product_quantity_price}
        rowKey={(record) => record.id}
      />
      
      </>
      )
            }
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
          {!EditQP &&(<Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>)}
          {current > 0 && !EditQP && (
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
          {current === steps.length - 1 && !EditQP && (
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

      {EditQP &&
      (<ModalQP QPRecord={GetRecordQP} QPNo={PositionOfQP} qpCB={QPCallBack} ForAction={QPAction} ForQPValue={CallBackQPValue} />)
      }
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
