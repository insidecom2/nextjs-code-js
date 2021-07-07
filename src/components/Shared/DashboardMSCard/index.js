import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Typography } from 'antd'
import { numberWithCommas } from 'utils/number'
import { DonutChart } from 'components/Shared/Chart/DonutChart'
import {
  DashboardCardDiv,
  Shocked,
  BtnLeft,
  BtnRight,
  BtnCenter
} from 'styles/dashboard/index.style'
import ClickDate from 'components/Shared/ClickAddActive'

const DashboardMSCard = (props) => {
  const { name, value, percent, text } = props
  const [clickDateStatus, setClickDateStatus] = useState([false, false, true])

  return (
    <DashboardCardDiv>
      <Row>
      <Col span={24}>
          <Row>
            <Col span={8}>
              <Shocked>{value}</Shocked>
            </Col>
            <Col span={16}>
              <Row justify="end">
                <BtnLeft
                  onClick={(key) => setClickDateStatus( ClickDate(0,clickDateStatus))}
                  status={Boolean(clickDateStatus[0])}>
                  ปี
                </BtnLeft>
                <BtnCenter
                  onClick={(key) => setClickDateStatus( ClickDate(1,clickDateStatus))}
                  status={Boolean(clickDateStatus[1])}>
                  เดือน
                </BtnCenter>
                <BtnRight
                  onClick={(key) => setClickDateStatus( ClickDate(2,clickDateStatus))}
                  status={Boolean(clickDateStatus[2])}>
                  วัน
                </BtnRight>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className="lay" span={24}>
          <DonutChart setWidth={285} setHeight={335} setCX={140} setCY={170} setOuterRadius={140} />
        </Col>
      </Row>
    </DashboardCardDiv>
  //   <DashboardCardDiv>
  //   <Row>
  //     <Col span={13}>
  //       <Row style={{ paddingTop: 20 }} className="span01">
  //         {name}
  //       </Row>
  //       <Row className="span02">
  //         <Typography.Title level={4}>
  //           {numberWithCommas(value)}
  //         </Typography.Title>
  //       </Row>
  //       <Row gutter={8}>
  //         <Col>
  //           <span>{percent}</span>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <span>{text}</span>
  //       </Row>
  //     </Col>
  //     <Col className="lay" span={11}>
  //       <DonutChart />
  //     </Col>
  //   </Row>
  // </DashboardCardDiv>
  )
}

DashboardMSCard.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  percent: PropTypes.number,
  text: PropTypes.string
}

export default DashboardMSCard
