import MainLayout from 'components/Layout/MainLayout'
import React from 'react'
import { Col, Row } from 'antd'
import { DashboardCardDiv } from 'styles/dashboard/index.style'
import DashboardCardItem from 'components/Shared/DashboardCardItem'
import DashboardCard from 'components/Shared/DashboardCard'
import DashboardMSCard from 'components/Shared/DashboardMSCard'
import DashboardBestSell from 'components/Shared/DashboardBestSell'
import DashboardChart from 'components/Shared/DashboardChart'
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
            <DashboardCard
              value={2356}
              status={true}
              name="ผู้ใช้รายใหม่"
              text="Since last month"
              percent={3.48}
            />
          </Col>
          <Col span={6}>
            <DashboardCard
              value={924}
              status={true}
              name="การสั่งซื้อ"
              text="Since last yesterday"
              percent={1.1}
            />
          </Col>
          <Col span={6}>
            <DashboardCard
              value={49}
              status={false}
              name="ปิดการขาย"
              text="Since last month"
              percent={1.2}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingTop: '30px' }}>
          <Col span={12}>
            <DashboardChart value="ยอดขาย" />
          </Col>
          <Col span={6}>
            <DashboardCardItem
              value="ความเคลื่อนไหว"
              post="เผยแพร่ล่าสุด"
              image="https://media.discordapp.net/attachments/775978814693441568/844072825182617670/Mask_Group.png"
              detail={[
                'Sale Promotion Design  “ค่าออกแบบเพียง 950 บาท”',
                'Sale Promotion Design  “ค่าออกแบบเพียง 950 บาท”'
              ]}
              date={['วันนี้, 3:59 am', '4 พ.ค., 6:50 am']}
            />
          </Col>
          <Col span={6}>
            <Row>
              <DashboardMSCard
                value={56}
                name="ข้อความ"
                text="Since last month"
                percent={4.5}
              />
            </Row>
            <Row style={{ paddingTop: '30px' }}>
              <DashboardBestSell
                name="สินค้าขายดี"
                headText="กล่องฝาเสียบก้นเสียบ"
                text="กระดาษอาร์ตการ์ด 350g..."
                image="https://media.discordapp.net/attachments/775978814693441568/844101568898662420/AW_PRO-JAN_BANGKOK_1.png"
                ratingProduct={4}
              />
            </Row>
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

export default Dashboard
