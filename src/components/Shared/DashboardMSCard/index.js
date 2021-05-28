import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Typography } from 'antd'
import { DashboardCardDiv } from 'styles/dashboard/index.style'
import { numberWithCommas } from 'utils/number'
import { DonutChart } from 'styles/../Chart/DonutChart'

const DashboardMSCard = (props) => {
  const { name, value, percent, text } = props

  return (
    <DashboardCardDiv>
      <Row>
        <Col span={13}>
          <Row style={{ paddingTop: 20 }} className="span01">
            {name}
          </Row>
          <Row className="span02">
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
        <Col className="lay" span={11}>
          <DonutChart />
        </Col>
      </Row>
    </DashboardCardDiv>
  )
}

DashboardMSCard.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  percent: PropTypes.number,
  text: PropTypes.string
}

export default DashboardMSCard
