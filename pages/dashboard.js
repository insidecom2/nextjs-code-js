import MainLayout from 'components/Layout/MainLayout'
import React from 'react'
import { Col, Row } from 'antd'
import { DashboardCardDiv } from 'styles/dashboard/index.style'
import DashboardCardItem from 'components/Shared/DashboardCardItem'
import DashboardCard from 'components/Shared/DashboardCard'
import { HeaderTitle } from 'styles/shared.style'

const Dashboard = (props) => {
  return (
    <MainLayout>
      <Row
        style={{
          paddingLeft: '52px',
          paddingTop: '12px',
          background: '#FFF',
          borderBottom: '20px solid #F5F4FF',
          boxShadow: '0.5px 3px 10px rgba(255, 255, 255, 0.1)'
        }}>
        <HeaderTitle>Dashboard</HeaderTitle>
      </Row>
      <div style={{ padding: '30px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <DashboardCard
              value={350897}
              status={false}
              name="การเข้าถึง"
              text="Since last month"
              percent={3.48}
            />
          </Col>
          <Col span={6}>
            <Row
              className="DashboardCard__DashboardCardDiv-sc-14tysqb-0 jamDOl custom_css02"
              gutter={[16, 16]}>
              <Col span={16}>
                <span className="span01">ผู้ใช้รายใหม่</span>
                <br />
                <span className="span02">2,356</span>
                <br />
                <span className="span03">
                  3.48
                  <br />
                  Since last month
                </span>
              </Col>
              <Col className="custom_css01 down" span={6}></Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row
              className="DashboardCard__DashboardCardDiv-sc-14tysqb-0 jamDOl custom_css02"
              gutter={[16, 16]}>
              <Col span={16}>
                <span className="span01">การสั่งซื้อ</span>
                <br />
                <span className="span02">924</span>
                <br />
                <span className="span03">
                  1.1
                  <br />
                  Since last yesterday
                </span>
              </Col>
              <Col className="custom_css01 down" span={6}></Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row
              className="DashboardCard__DashboardCardDiv-sc-14tysqb-0 jamDOl custom_css02"
              gutter={[16, 16]}>
              <Col span={16}>
                <span className="span01">ปิดการขาย</span>
                <br />
                <span className="span02">49</span>
                <br />
                <span className="span03">
                  12
                  <br />
                  Since last month
                </span>
              </Col>
              <Col className="custom_css01 up" span={6}></Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingTop: '30px' }}>
          <Col span={12}>
            <DashboardCardItem value="Test" />
          </Col>
          <Col span={6}>
            <DashboardCardItem value="Test2222" />
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

export default Dashboard
