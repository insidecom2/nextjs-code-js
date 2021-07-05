import MainLayout from 'components/Layout/MainLayout'
import React from 'react'
import { Col, Row } from 'antd'
import { DivDashPage } from 'styles/dashboard/index.style'
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
          paddingLeft: '52px'
        }}>
       
      </Row>
      <DivDashPage style={{padding:30, backgroundColor:"#f0f2f5"}}>
        <Row gutter={16}>
          <Col lg={6} md={24}>
            <DashboardCard
              value={350897}
              status={"eye"}
              name="การเข้าถึง"
              text="Since last month"
              percent={3.48}
            />
          </Col>
          <Col lg={6} md={24}>
            <DashboardCard
              value={2356}
              status={"person"}
              name="ผู้ใช้รายใหม่"
              text="Since last month"
              percent={3.48}
            />
          </Col>
          <Col lg={6} md={24}>
            <DashboardCard
              value={924}
              status={"order"}
              name="การสั่งซื้อ"
              text="Since last yesterday"
              percent={1.1}
            />
          </Col>
          <Col lg={6} md={24}>
            <DashboardCard
              value={49}
              status={"sell"}
              name="ปิดการขาย"
              text="Since last month"
              percent={1.2}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingTop: '30px' }}>
          <Col lg={15} md={24}>
            <DashboardChart value='ยอดขาย' /> 
          </Col>
          <Col lg={9} md={24}>
          <DashboardMSCard
               value={56}
               name="ข้อความ"
               text="Since last month"
               percent={4.5}
               />
            
          </Col>
          
        </Row>
              <Row gutter={16} style={{ paddingTop: '30px' }}>
                <Col lg={15} md={24}>
               

                <DashboardCardItem 
               value="ความเคลื่อนไหว"
               post='เผยแพร่ล่าสุด'
               image="https://media.discordapp.net/attachments/775978814693441568/844072825182617670/Mask_Group.png"
               detail={['Sale Promotion Design  “ค่าออกแบบเพียง 950 บาท”','Sale Promotion Design  “ค่าออกแบบเพียง 950 บาท”']}
               date={['วันนี้, 3:59 am','4 พ.ค., 6:50 am']}
            />

               </Col> 
               <Col lg={9} md={24}>
                <DashboardBestSell
               name="สินค้าขายดี"
               headText="กล่องฝาเสียบก้นเสียบ"
               text="กระดาษอาร์ตการ์ด 350g..."
               image="https://media.discordapp.net/attachments/775978814693441568/844101568898662420/AW_PRO-JAN_BANGKOK_1.png"
               ratingProduct={4}
               />
                </Col> 
              </Row>  
              <Row gutter={16} >
              <Col lg={10} md={24}>
                <DashboardBestSell
               name="สินค้าขายดี"
               headText="กล่องฝาเสียบก้นเสียบ"
               text="กระดาษอาร์ตการ์ด 350g..."
               image="https://media.discordapp.net/attachments/775978814693441568/844101568898662420/AW_PRO-JAN_BANGKOK_1.png"
               ratingProduct={4}
               />
                </Col> 
              </Row>

      </DivDashPage>
    </MainLayout>
  )
}

export default Dashboard
