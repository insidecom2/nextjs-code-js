import React, { useEffect, useState } from 'react'
import { Modal, Upload } from 'antd'
import { beforeUpload, getPreviewBase64 } from 'utils/images'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import _ from 'lodash'
import { ACTION } from 'utils/constants.js'
import {
  deleteProductImage,
  getProductsList,
  updateProductImage
} from 'store/reducers/products'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'antd'

const StepImage = (props) => {
  const { product } = props
  const [loading, setLoading] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [fileImageList, setFileImageList] = useState([])
  const [FileAttribute,setFileAttribute] = useState({})

  const dispatch = useDispatch()
  const { action } = props

  const { productImageUpdate } = useSelector(
    (state) => ({
      productImageUpdate: state.products.productImageUpdate
    }),
    []
  )

  useDeepEffect(() => {
    if (!_.isEmpty(product)) {
      product.product_image.forEach((item) => {
        setFileImageList((prevState) => {
          prevState.push({
            uid: item.id,
            url: item.image
          })
          return [...prevState]
        })
      })
    }
  }, [])

  useDeepEffect(() => {
    if (!_.isEmpty(productImageUpdate)) {
      setFileImageList((prevState) => {
        prevState.push({
          uid: productImageUpdate.id,
          url: productImageUpdate.image
        })
        return [...prevState]
      })
    }
    const fileListProps = {fileList: fileImageList}, fileNullProps = {};
    action === ACTION.CREATE?setFileAttribute(fileNullProps):setFileAttribute(fileListProps)
  }, [productImageUpdate])

  const handleChange = async (info) => {
    // console.log('info', info.file)
    // console.log('status', info.file.status)
    if (info.file.status === 'removed' && action === ACTION.EDIT) {
      setFileImageList(info.fileImageList)

      await dispatch(deleteProductImage(info.file.uid))
      await dispatch(getProductsList())
    }

    if (info.file.status === 'uploading') {
      if (action === ACTION.EDIT) {
        setLoading(true)
        const formData = new FormData()
        formData.set('product', product.id)
        formData.append('image', info.file.originFileObj)
        await dispatch(updateProductImage(formData))
        await dispatch(getProductsList())
      } else {
        setFileImageList(info.fileImageList)
      }
        setLoading(false)
    }

    if (info.file.status === 'done') {
      if (action === ACTION.EDIT) {
        await dispatch(getProductsList())
      } 
      setLoading(false)
    }
  }

  // console.log(fileImageList)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getPreviewBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    )
    setPreviewVisible(true)
  }

  const onCancel = () => {
    setPreviewVisible(false)
    setPreviewTitle('')
    setPreviewImage('')
  }

  return<div>
      <Form.Item label="Image" name="image" valuePropName="upload">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        {...FileAttribute}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}>
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
        </Upload>
      </Form.Item >
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={onCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  
}

StepImage.propTypes = {
  product: PropTypes.object
}

export default StepImage
