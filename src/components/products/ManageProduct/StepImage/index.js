import React, { useEffect, useState } from 'react'
import { Modal, Upload } from 'antd'
import { beforeUpload, getPreviewBase64 } from 'utils/images'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import _ from 'lodash'
import {
  deleteProductImage,
  getProductsList,
  updateProductImage
} from 'store/reducers/products'
import { useDispatch, useSelector } from 'react-redux'

const StepImage = (props) => {
  const { product } = props
  const [loading, setLoading] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])

  const dispatch = useDispatch()

  const { productImageUpdate } = useSelector(
    (state) => ({
      productImageUpdate: state.products.productImageUpdate
    }),
    []
  )

  useDeepEffect(() => {
    if (!_.isEmpty(product)) {
      product.product_image.forEach((item) => {
        setFileList((prevState) => {
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
      setFileList((prevState) => {
        prevState.push({
          uid: productImageUpdate.id,
          url: productImageUpdate.image
        })
        return [...prevState]
      })
    }
  }, [productImageUpdate])

  const handleChange = async (info) => {
    console.log('info', info.file)
    console.log('status', info.file.status)

    if (info.file.status === 'removed') {
      setFileList(info.fileList)

      await dispatch(deleteProductImage(info.file.uid))
      await dispatch(getProductsList())
    }

    if (info.file.status === 'uploading') {
      setLoading(true)
      const formData = new FormData()
      formData.set('product', product.id)
      formData.append('image', info.file.originFileObj)
      await dispatch(updateProductImage(formData))
      await dispatch(getProductsList())
      setLoading(false)
    }

    if (info.file.status === 'done') {
      await dispatch(getProductsList())
      setLoading(false)
    }
  }

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

  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        fileList={fileList}
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
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={onCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

StepImage.propTypes = {
  product: PropTypes.object
}

export default StepImage
