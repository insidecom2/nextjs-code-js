import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Col, Row, Typography } from 'antd'
import { numberWithCommas } from 'utils/number'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const DashboardCardDiv = styled.div`
  padding: 1rem;
  height: 150px;
  background-color: white;
  border-radius: 5px;
`

const DashboardCard = (props) => {
  const { name, value, percent, percentStatus, status } = props

  const renderIcon = () => {
    if (percentStatus === 'up') {
      return <FontAwesomeIcon icon={faArrowUp} />
    } else {
      return <FontAwesomeIcon icon={faArrowDown} />
    }
  }

  return (
    <DashboardCardDiv>
      <Row>
        <Col span={20}>
          <Row style={{ marginBottom: 10 }}>{name}</Row>
          <Row>
            <Typography.Title level={4}>
              {numberWithCommas(value)}
            </Typography.Title>
          </Row>
          <Row gutter={8} style={{ marginTop: 10 }}>
            <Col>
              {renderIcon()}
              {percent}
            </Col>
            <Col>{status}</Col>
          </Row>
        </Col>
        <Col span={4}></Col>
      </Row>
    </DashboardCardDiv>
  )
}

DashboardCard.propTypes = {
  name: PropTypes.string,
  percent: PropTypes.number,
  value: PropTypes.number,
  status: PropTypes.string
}

export default DashboardCard
