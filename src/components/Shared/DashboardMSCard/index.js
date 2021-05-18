import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Typography } from 'antd'
import { DashboardCardDiv } from 'styles/dashboard/index.style'
import { numberWithCommas } from 'utils/number'

const DashboardMSCard = (props) => {
    const { name, value, percent, text } = props

  return (
    <DashboardCardDiv style={{ height: 175}}>
    <Row >
      <Col span={14}>
        <Row className='span01'>{name}</Row>
        <Row className='span02'>
          <Typography.Title level={4}>
            {numberWithCommas(value)}
          </Typography.Title>
        </Row>
        <Row gutter={8}>
          <Col>
            <span>{percent}</span>
          </Col>
        </Row>
        <Row>
          <span>{text}</span>
        </Row>
      </Col>
      <Col span={10}>
        <div>
            aefafewfewa

            </div>
      </Col>
    </Row>
  </DashboardCardDiv>
  )
}

DashboardMSCard.propTypes = {
  value: PropTypes.string
}

export default DashboardMSCard
