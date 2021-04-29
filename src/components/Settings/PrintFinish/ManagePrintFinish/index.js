import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ACTION } from 'utils/constants.js'

const ManagePrintFinish = (props) => {
  const { visible, onOk, onCancel, action, TrNo } = props
  const [form] = Form.useForm()
  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState()
  const { typeId, defaultImage, PrintFinishValue } = useSelector(
    (state) => ({
      typeId: action==='Edit'?state.printFinish.categoryType.id:"",
      defaultImage:
        action === 'Edit'
          ? 'http://' + state.printFinish.categoryType.image
          : '',
      PrintFinishValue: state.printFinish.categoryType     
    }),
    []
  )

  const onFinish = (values) => {
    const data = {
      name: values.name,
      code: values.code,
      image: values.image===undefined?"":values.image.file.originFileObj
    }
    onOk(typeId, data)
  }

  useEffect(() => {
    setimageUrl(defaultImage);
},[]);

useEffect(() => {
  if (action === ACTION.EDIT) {
    form.setFieldsValue({
      name:PrintFinishValue.name,
      code:PrintFinishValue.code
    })    
} 
},[PrintFinishValue]);

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
 }
   function beforeUpload(file) {
     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
     if (!isJpgOrPng) {
       message.error('You can only upload JPG/PNG file!');
     }
     const isLt2M = file.size / 1024 / 1024 < 2;
     if (!isLt2M) {
       message.error('Image must smaller than 2MB!');
     }
     return isJpgOrPng && isLt2M;
   }
   const handleChange = info => {
     if (info.file.status === 'uploading') {
       setloading(true)
       return;
     }
     if (info.file.status === 'done') {
       // Get this url from response in real world.
       setloading(false)
       getBase64(info.file.originFileObj, imageUrl =>
         setimageUrl(imageUrl)
       );
     }
   };

  return (
<Modal
      closable={false}
      title={`${action} Print Finish`}
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
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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

ManagePrintFinish.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManagePrintFinish
