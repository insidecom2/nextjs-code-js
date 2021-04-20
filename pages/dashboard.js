import MainLayout from 'components/Layout/MainLayout'
import React from 'react'
import { Col, Row } from 'antd'
import DashboardCard from 'components/Shared/DashboardCard'

const Dashboard = (props) => {
  return (
    <MainLayout>
      <div style={{ padding: '10px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <DashboardCard
              name="TRAFFIC"
              value={350897}
              percent={3.48}
              percentStatus="up"
              status="Since last month"
            />
          </Col>
          <Col span={6}>
            <DashboardCard
              name="NEW USERS"
              value={2356}
              percent={3.48}
              percentStatus="down"
              status="Since last week"
            />
          </Col>
          <Col span={6}>
            <DashboardCard
              name="SALES"
              percent={1.1}
              value={924}
              percentStatus="down"
              status="Since yesterday"
            />
          </Col>
          <Col span={6}>
            <DashboardCard
              name="PERFORMANCE"
              value={49}
              percent={12}
              percentStatus="up"
              status="Since last month"
            />
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

export default Dashboard
