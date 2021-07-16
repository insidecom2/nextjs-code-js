import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Col, Row, Typography } from 'antd'
import { numberWithCommas } from 'utils/number'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { StatusIcon, DashboardCardDiv } from 'styles/dashboard/index.style'

const DashboardCard = (props) => {
  const { name, value, percent, text, status } = props

  return (
    <DashboardCardDiv style={{ height: 175 }}>
      <Row>
        <Col span={14}>
          <Row className="span01">{name}</Row>
          <Row className="span02">
            <Typography.Title level={4} style={{ color: '#438AFE' }}>
              {numberWithCommas(value)}
            </Typography.Title>
          </Row>
        </Col>
        <Col span={10}>
          <StatusIcon status={status} />
        </Col>
      </Row>
      <Row style={{ height: 2, backgroundColor: '#82E3E3' }}></Row>
      <Row gutter={12}>
        <Col>
          <span>{percent}</span>
        </Col>
        <Col>
          <span>{text}</span>
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
