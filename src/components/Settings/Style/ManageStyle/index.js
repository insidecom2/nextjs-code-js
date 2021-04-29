import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const ManageStyle = (props) => {
  const { visible, onOk, onCancel, action, TrNo } = props
  const [form] = Form.useForm()
  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState()

  const { typeName, type2D , type3D,typeVdo ,typeId, defaultImage } = useSelector(
    (state) => ({
      typeName: action==='Edit'?state.style.categoryType.name:"",
      type2D: action==='Edit'?state.style.categoryType.render_2d:"",
      type3D: action==='Edit'?state.style.categoryType.render_3d:"",
      typeVdo: action==='Edit'?state.style.categoryType.video_link:"",
      typeId: action==='Edit'?state.style.categoryType.id:"",
      defaultImage:
        action === 'Edit'
          ? 'http://' + state.style.categoryType.image
          : ''
    }),
    []
  )

  const onFinish = (values) => {
    const data = {
      name: values.name,
      image: values.image===undefined?"":values.image.file.originFileObj,
      render_2d: values.render_2d,
      render_3d: values.render_3d,
      video_link: values.video
    }

    onOk(typeId, data)
  }

  useEffect(() => {
    setimageUrl(defaultImage);
},[]);

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
      title={`${action} Category Type`}
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
          initialValue={typeName}>
          <Input />
        </Form.Item>
        <Form.Item
          label="2D"
          name="render_2d"
          rules={[
            {
              required: true,
              message: 'Please input your 2D!'
            }
          ]}
          initialValue={type2D}>
          <Input />
        </Form.Item>
        <Form.Item
          label="3D"
          name="render_3d"
          rules={[
            {
              required: true,
              message: 'Please input your 3D!'
            }
          ]}
          initialValue={type3D}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Video Link"
          name="video"
          rules={[
            {
              required: true,
              message: 'Please input your video link!'
            }
          ]}
          initialValue={typeVdo}>
          <Input />
        </Form.Item>

        <Form.Item label="Image" name="image" >
         
          <Upload 
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

ManageStyle.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageStyle
