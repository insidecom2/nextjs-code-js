import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ACTION } from 'utils/constants.js'
import { beforeUpload, getBase64 } from 'utils/images'
//import _ from 'lodash';

const ManagePrintSide = (props) => {
  const { visible, onOk, onCancel, action, TrNo, allData } = props
  const [form] = Form.useForm()
  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState()
  const { typeName, typeCode, typeId, defaultImage, PrintSideValue } = useSelector(
    (state) => ({
      typeId: action==='Edit'?state.printSide.categoryType.id:"",
      defaultImage:
        action === 'Edit'
          ? state.printSide.categoryType.image
          : '',
       PrintSideValue: state.printSide.categoryType
    }),
    []
  )

  const onFinish = (values) => {
    const data = {
      name: values.name,
      code: values.code,
      image: values.image===undefined?[]:values.image.file.originFileObj
    }
    if (action===ACTION.EDIT) {
      data.id = typeId;
    } 
    //if (action===ACTION.EDIT || Number(_.filter(allData,{"name":data.name}).length)===0) {
      onOk(data)
    //} else {
    //  console.log("ชื่อซ้ำ")
    //}
  }

useEffect(() => {
  if (action === ACTION.EDIT) {
    form.setFieldsValue({
      name:PrintSideValue.name,
      code:PrintSideValue.code
    })    
} 
setimageUrl(defaultImage);
},[PrintSideValue]);

   const handleChange = info => {
     if (info.file.status === 'uploading') {
       setloading(true)
       getBase64(info.file.originFileObj, imageUrl =>
        setimageUrl(imageUrl)
      );
       return;
     }
     if (info.file.status === 'done') {
       // Get this url from response in real world.
       setloading(false)
     }
   };

  return (
    <Modal
      closable={false}
      title={`${action} Print Sides`}
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
      <Form form={form} name="manageType" onFinish={onFinish} layout="vertical" >
        <p>No : {TrNo}</p>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="code"
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your code!'
            }
          ]}
          >
          <Input />
        </Form.Item>
     
        <Form.Item label="Image" name="image" >
         
          <Upload 
            fileList={null}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}>
            <div>
  
               
           
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ height: '100px' }} />
              ) : (
                <div style={{ marginTop: 8 }}>
                  {
                   loading ? <LoadingOutlined /> : 
                     <div><PlusOutlined /><br/><label>Upload</label></div>  
                  }
                </div>
              )
              }
              
          
              
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

ManagePrintSide.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManagePrintSide
