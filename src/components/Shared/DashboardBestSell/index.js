import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { DashboardCardDiv, Shocked } from 'styles/dashboard/index.style'
import Rating from 'components/Shared/Rating'
const DashboardBestSell = (props) => {
  const { name, text, image, headText, ratingProduct } = props
  return (
    <DashboardCardDiv>
      <Row>
        <Col span={12}>
          <Rating ratingValue={ratingProduct} />
        </Col>
        <Col span={12}>
          <Row className="span01">{name}</Row>
        </Col>
      </Row>
      <Row>
        <Col style={{ display: 'flex' }} span={10}>
          <Row>
            <img src={image} />
          </Row>
        </Col>
        <Col span={14}>
          <Row style={{ paddingTop: '60px' }}>
            <Shocked>{headText}</Shocked>
          </Row>
          <Row>
            <span>{text}</span>
          </Row>
        </Col>
      </Row>
    </DashboardCardDiv>
  )
}

DashboardBestSell.propTypes = {
  value: PropTypes.string
}

export default DashboardBestSell
