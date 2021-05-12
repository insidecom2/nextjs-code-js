import React, { useState } from 'react'
import MainLayout from 'components/Layout/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes, { arrayOf } from 'prop-types'
import {
  Image,
  ConfigProvider,
    DatePicker, 
    Typography,
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
  } from 'antd';
import { MinusCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import { getMedia, deleteMedia, createMedia } from 'store/reducers/media'
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
const media =()=> {
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState([]);
    const StartDate = new Date();
    const [mediaDate,setMediaDate] = useState([StartDate.getFullYear(),("0" + (StartDate.getMonth() + 1)).slice(-2)]);
    const dispatch = useDispatch()
    const { MonthPicker } = DatePicker;

    const { mediaList } = useSelector(
        (state) => ({
            mediaList: state.media.productsList
        }),
        []
      )
      

      const fetchData = () => {
        let dateUrl = "?year="+String(mediaDate[0])+"&month="+String(mediaDate[1])
        dispatch(getMedia(dateUrl))
  }
  
  const setDefaultImg =async()=>{
    const defaultImg = []
       await fetchData();
       await mediaList.map((ListImg)=>defaultImg.push({url:ListImg.name})) 
       await setFileList(defaultImg)
  };

    const onOkUpload= async data=> {
        const formData = new FormData()
        formData.append('image', data.image)
        await dispatch(createMedia(formData));
        await setDefaultImg();
    };

    const onFinish = (values) => {
      const data ={
        image: values.file.originFileObj,
      }
      onOkUpload(data)
    };

      const [modalRemoveMedia,setModalRemoveMedia] = useState(false)
      const [urlImageName,setUrlImageName] = useState()

      useDeepEffect(() => {
        console.log(mediaList)
        setDefaultImg()
      }, [mediaList,mediaDate])

      const confirm = async () => {
        await dispatch(deleteMedia(urlImageName))
        await setDefaultImg()
        await setModalRemoveMedia(false)
      }
      
      const onPreview = async file => {
        let PositionOfImg = fileList.indexOf(file);
        let PositionOfName = mediaList[PositionOfImg].name;
        await setUrlImageName(PositionOfName)
        await setModalRemoveMedia(true)
      }
     
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
      const handleChange  = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true)
          return
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          setLoading(false)
          getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl))
        }
        onFinish(info)
      }

      const handleDatePickerChange = (date, dateString)=> {
        let Res = dateString.split("-");
        setMediaDate(Res)
      };


    return( <MainLayout>
     
<Row>
        <Col span={12}>
          <Typography.Title level={3}>Media</Typography.Title>
        </Col>
      </Row>
    
      <Row>
      <Form form={form} name="manageMedia" onFinish={onFinish} layout="vertical">
      <Form.Item label="Upload image" name="uploadImage" valuePropName="upload">
 

      
      <Upload
               name="avatar"
               listType="picture-card"
               className="avatar-uploader"
               showUploadList={false}
               beforeUpload={beforeUpload}
               onChange={handleChange}
              >
              
           
              <div>
                {imageUrl&&loading ? (
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

          </Form>
          </Row>
          <Row>
          <Col span={24}>
          <Typography.Title level={3}>Gallery</Typography.Title>
        </Col>
        <Row>
      <Col span={24}>
      <ConfigProvider locale={locale} >
      <MonthPicker defaultValue={moment(mediaDate[0]+'-'+mediaDate[1], 'YYYY-MM')} size='default' placeholder="Select Month" style={{margin:"10px"}} onChange={(date, dateString) =>handleDatePickerChange(date, dateString)} />
      </ConfigProvider>
        </Col>
     
      </Row>
      <Row>
      
        </Row>
      
      <Modal
           visible={modalRemoveMedia}
          onOk={confirm}
          onCancel={()=>setModalRemoveMedia(false)}
          okText="Remove"
          cancelText="Cancel"
        >
          <Image
      width={200}
      src={urlImageName}
    />
          
        </Modal>

          <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              fileList={fileList}
              onRemove={onPreview}
              onPreview={onPreview}
              >
                
              
            </Upload>

              </Row>
        <Row>
    
          </Row>
    </MainLayout>
    )
};

export default  media;