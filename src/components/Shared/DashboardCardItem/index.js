import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { DashboardCardDiv, HrBar, Shocked } from 'styles/dashboard/index.style'

const DashboardCardItem = (props) => {
  const { value, image, post, detail, date } = props

  return (
    <DashboardCardDiv>
      <Row>
        <Col span={24}>
          <Row><Shocked>{value}</Shocked></Row>
          <Row className='post' style={{ marginBottom: 10 }}>{post}</Row>
          <HrBar style={{ marginBottom: 20 }}/>
          <Row style={{ marginBottom: 20 }}>
            <img src={image}  />
          </Row>
          <Row className='sell-promotion' style={{ marginBottom: 10 }}>{detail[0]}</Row>  
          <Row className='date-promotion' style={{ marginBottom: 10 }}>{date[0]}</Row>
          <HrBar style={{ marginBottom: 10 }}/>
          <Row className='sell-promotion' style={{ marginBottom: 10 }}>{detail[1]}</Row>  
          <Row className='date-promotion' style={{ marginBottom: 10 }}>{date[1]}</Row>
        </Col>
      </Row>
    </DashboardCardDiv>
  )
}

DashboardCardItem.propTypes = {
  value: PropTypes.string
}

export default DashboardCardItem
