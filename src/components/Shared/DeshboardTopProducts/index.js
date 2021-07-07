import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { DashboardCardDiv, HrBar, Shocked } from 'styles/dashboard/index.style'
import { CardProducts } from '../CardProducts'


const DashboardTopProducts = (props) => {
  const { value, image, post, detail, date } = props

  return (
    <DashboardCardDiv>
      <Row>
        <Col span={24}>
          <Row><Shocked>{value}</Shocked></Row>
           
          <Row>
            <Col lg={8} md={24}>
             {<CardProducts Ranking={1} theImg="https://media.discordapp.net/attachments/775978814693441568/862241835484839977/6.jpg" ratingProduct={5}head="กล่องฝาเสียบก้นเสียบ" detail="กระดาษอาร์ตการ์ด 350g..." />}
            </Col>
            <Col lg={8} md={24}>
            {<CardProducts  Ranking={2} theImg="https://media.discordapp.net/attachments/775978814693441568/862244418086240266/Untitled-1_1.png" ratingProduct={4} head="กล่องไลด์" detail="กระดาษอาร์ตการ์ด 350g..." />}
            </Col>
            <Col lg={8} md={24}>
            {<CardProducts Ranking={3} theImg="https://media.discordapp.net/attachments/775978814693441568/862244530857574450/image_18.jpg" ratingProduct={3} head="ถุงกระดาษ" detail="กระดาษอาร์ตการ์ด 350g..."  />}
            </Col>
          </Row>    

        </Col>
      </Row>
    </DashboardCardDiv>
  )
}

DashboardTopProducts.propTypes = {
  value: PropTypes.string
}

export default DashboardTopProducts
