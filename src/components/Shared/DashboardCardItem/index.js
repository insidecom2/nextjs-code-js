import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { DashboardCardDiv } from 'styles/dashboard/index.style'

const DashboardCardItem = (props) => {
  const { value } = props

  return (
    <DashboardCardDiv>
      <Row>
        <Col span={20}>
          <Row style={{ marginBottom: 10 }}>{value}</Row>
        </Col>
        <Col span={4}></Col>
      </Row>
    </DashboardCardDiv>
  )
}

DashboardCardItem.propTypes = {
  value: PropTypes.string
}

export default DashboardCardItem
