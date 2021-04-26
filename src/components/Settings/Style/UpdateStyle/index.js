import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select, Upload, Icon, message } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const UpdateStyle = (props) => {
  const { visible, onOk, onCancel, action } = props
  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState()
  const [form] = Form.useForm()
  const { type } = useSelector(
    (state) => ({
      type: state.style.categoryType
    }),
    []
  )
// console.log(type)
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  const onFinish = (values) => {
    // console.log(values.image)
    const data = {
      name: values.name,
      image: values.image.file,
      render_2d: values.render_2d,
      render_3d: values.render_3d,
      video_link: values.video
    }
    console.log(values)
//    onOk(type.id, data)
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
        <p>No : {1}</p>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!'
            }
          ]}
          initialValue={type.name ? type.name : ''}>
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
          initialValue={type.render_2d ? type.render_2d : ''}>
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
          initialValue={type.render_3d ? type.render_3d : ''}>
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
          initialValue={type.video_link ? type.video_link : ''}>
          <Input />
        </Form.Item>

        <Form.Item label="Image" name="image" >
         
          <Upload 
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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

UpdateStyle.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default UpdateStyle
