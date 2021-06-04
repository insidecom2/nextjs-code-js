import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Col, Row, Typography } from 'antd'
import { numberWithCommas } from 'utils/number'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { ArrowItem, DashboardCardDiv } from 'styles/dashboard/index.style'

const DashboardCard = (props) => {
  const { name, value, percent, text, status } = props

  return (
    <DashboardCardDiv style={{ height: 175 }}>
      <Row>
        <Col span={14}>
          <Row className="span01">{name}</Row>
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
        <Col span={10}>
          <ArrowItem status={status} />
        </Col>
      </Row>
    </DashboardCardDiv>
  )
}

DashboardCard.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  percent: PropTypes.number,
  value: PropTypes.number,
  status: PropTypes.bool
}

export default DashboardCard
