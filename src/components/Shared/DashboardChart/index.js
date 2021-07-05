import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import {
  DashboardCardDiv,
  Shocked,
  BtnLeft,
  BtnRight,
  BtnCenter
} from 'styles/dashboard/index.style'
import { LineAndChart } from 'components/Shared/Chart/LineChart'
import ClickDate from 'components/Shared/ClickAddActive'

const DashboardChart = (props) => {
  const { value } = props;
  const [clickDateStatus, setClickDateStatus] = useState([false, false, true])

  return (
    <DashboardCardDiv>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={4}>
              <Shocked>{value}</Shocked>
            </Col>
            <Col span={20}>
              <Row justify="end">
                <BtnLeft
                  onClick={(key) => setClickDateStatus( ClickDate(0,clickDateStatus))}
                  status={clickDateStatus[0]}
                  >
                  ปี
                </BtnLeft>
                <BtnCenter
                  onClick={(key) => setClickDateStatus( ClickDate(1,clickDateStatus))}
                  status={clickDateStatus[1]}
                  >
                  เดือน
                </BtnCenter>
                <BtnRight
                  onClick={(key) => setClickDateStatus( ClickDate(2,clickDateStatus))}
                  status={clickDateStatus[2]}
                  >
                  วัน
                </BtnRight>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className="lay" span={24}>
          <LineAndChart />
        </Col>
      </Row>
    </DashboardCardDiv>
  )
}

DashboardChart.propTypes = {
  value: PropTypes.string
}

export default DashboardChart
