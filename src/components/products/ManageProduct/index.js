import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION } from 'utils/constants.js'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Button, Col, Form, Modal, Row, Steps } from 'antd'
import { getCategoryList } from 'store/reducers/category'
import { getCategoryTypeList } from 'store/reducers/categoryType'
import useDeepEffect from 'utils/hooks/useDeepEffect'
import StepProduct from 'components/products/ManageProduct/StepProduct'
import StepImage from 'components/products/ManageProduct/StepImage'
import StepQuantity from 'components/products/ManageProduct/StepQuantity'

const ManageProducts = (props) => {
  const { visible, onOk, onCancel, action, productSelected } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [quantityList, setQuantityList] = useState([])
  const [current, setCurrent] = React.useState(0)

  const { Step } = Steps

  const { categoryList, typeList } = useSelector(
    (state) => ({
      categoryList: state.category.categoryList,
      typeList: state.categoryType.categoryTypeList
    }),
    []
  )

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  // console.log(typeList)
  useDeepEffect(() => {
    async function fetchData() {
      await dispatch(getCategoryList())
      await dispatch(getCategoryTypeList())
    }
    fetchData()
  }, [])

  // const onEdit = async (e, record) => {
  //   const GetPosition =
  //     Number(
  //       productsList[0].product_quantity_price.findIndex(
  //         (FindPos) => FindPos.id === record.id
  //       )
  //     ) + 1
  //   e.preventDefault()
  //   await setPositionOfQP(GetPosition)
  //   await SetGetRecordQP(record)
  //   await setQPAction('Edit')
  //   await SetEditQP(true)
  // }

  const onFinish = (values) => {
    const quantityDataList = []
    quantityList.forEach((item, index) => {
      quantityDataList.push({
        id: action === ACTION.EDIT?0:item.id,
        quantity: values[`quantity_${item.id}_${index}`],
        price: values[`price_${item.id}_${index}`]
      })
    })

    const data = {
      productData: {
        code: values.code,
        name: values.name,
        category_type: values.type,
        detail: values.detail,
        price: values.price,
        weight: values.weight,
        size: values.size
      },
      quantityList: quantityDataList
    }

    if (action === ACTION.EDIT) {
      data.id = productSelected.id
    }

    if (current === steps.length - 1) {
      onOk(data)
    } else {
      next()
    }
  }

  const steps = [
    {
      title: 'Product',
      content: (
        <StepProduct
          productSelected={productSelected}
          action={action}
          form={form}
          categoryList={categoryList}
          typeList={typeList}
        />
      )
    },
    {
      title: 'Image',
      content: <StepImage product={productSelected} />
    },
    {
      title: 'Quantity',
      content: (
        <StepQuantity
          form={form}
          product={productSelected}
          quantityList={quantityList}
          setQuantityList={setQuantityList}
        />
      )
    }
  ]

  return (
    <Modal
      width={750}
      closable={false}
      title={`${action} Product`}
      visible={visible}
      destroyOnClose={true}
      footer={[
        <Row key="1" gutter={8} justify="end">
          <Col>
            <Button key="cancel" onClick={onCancel}>
              Cancel
            </Button>
          </Col>
          <Col>
            {current > 0 && (
              <Button key="previous" onClick={() => prev()}>
                Previous
              </Button>
            )}
          </Col>
          <Col>
            <div key="2">
              {current < steps.length - 1 && (
                <Button
                  form="manageProduct"
                  key="next"
                  type="primary"
                  htmlType="submit">
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  form="manageProduct"
                  key="ok"
                  type="primary"
                  htmlType="submit">
                  Submit
                </Button>
              )}
            </div>
          </Col>
        </Row>
      ]}>
      <Form
        form={form}
        name="manageProduct"
        onFinish={onFinish}
        layout="vertical">
        <Steps current={current} style={{ marginBottom: 15 }}>
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
          {current === 2 && (
            <div style={{ display: current === 2 ? 'block' : 'none' }}>
              {steps[2].content}
            </div>
          )}
        </div>
      </Form>
    </Modal>
  )
}

ManageProducts.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  action: PropTypes.string
}

export default ManageProducts
