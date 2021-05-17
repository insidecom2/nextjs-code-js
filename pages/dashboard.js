import MainLayout from 'components/Layout/MainLayout'
import React from 'react'
import { Col, Row } from 'antd'
import DashboardCard from 'components/Shared/DashboardCard'

const Dashboard = (props) => {
  return (
    
    <MainLayout>
      <Row style={{ paddingLeft: '52px',paddingTop: '12px', background:'#FFF',borderBottom:'20px solid #F5F4FF',boxShadow: '0.5px 3px 10px rgba(255, 255, 255, 0.1)'}}>
           <h2>Dashboard</h2> 
        </Row>
      <div style={{ padding: '30px' }}>
      
        <Row gutter={16}>
          <Col span={6}>
            <Row className='DashboardCard__DashboardCardDiv-sc-14tysqb-0 jamDOl custom_css02' gutter={[16, 16]}>
              <Col  span={16}>
                  <span className='span01'>การเข้าถึง</span><br/>
                  <span className='span02'>350,897</span><br/>
                  <span className='span03'>3.48<br/>
                  Since last month</span>
              </Col>
              <Col  className='custom_css01 up' span={6}>
                
              </Col>
            </Row>
          </Col>
          <Col span={6}>
          <Row className='DashboardCard__DashboardCardDiv-sc-14tysqb-0 jamDOl custom_css02' gutter={[16, 16]}>
              <Col  span={16}>
                  <span className='span01'>ผู้ใช้รายใหม่</span><br/>
                  <span className='span02'>2,356</span><br/>
                  <span className='span03'>3.48<br/>
                  Since last month</span>
              </Col>
              <Col  className='custom_css01 down' span={6}>
                
              </Col>
            </Row>
          </Col>
          <Col span={6}>
          <Row className='DashboardCard__DashboardCardDiv-sc-14tysqb-0 jamDOl custom_css02' gutter={[16, 16]}>
              <Col  span={16}>
                  <span className='span01'>การสั่งซื้อ</span><br/>
                  <span className='span02'>924</span><br/>
                  <span className='span03'>1.1<br/>
                  Since last yesterday</span>
              </Col>
              <Col  className='custom_css01 down' span={6}>
                
              </Col>
            </Row>
          </Col>
          <Col span={6}>
          <Row className='DashboardCard__DashboardCardDiv-sc-14tysqb-0 jamDOl custom_css02' gutter={[16, 16]}>
              <Col  span={16}>
                  <span className='span01'>ปิดการขาย</span><br/>
                  <span className='span02'>49</span><br/>
                  <span className='span03'>12<br/>
                  Since last month</span>
              </Col>
              <Col  className='custom_css01 up' span={6}>
                
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={16} style={{paddingTop:'30px'}}>
          <Col span={12} className='DashboardCard__DashboardCardDiv-sc-14tysqb-0 jamDOl custom_css03' gutter={[16, 16]}>
   aefw
          </Col>

          <Col span={6} className='DashboardCard__DashboardCardDiv-sc-14tysqb-0 jamDOl custom_css03' gutter={[16, 16]}>
       <label className='custom_css04'>
         <span>ความเคลื่อนไหว</span><br/><span>เผยแพร่ล่าสุด</span>
       </label><br/>
       <div></div>
          </Col>
          </Row>
      </div>
    </MainLayout>
  )
}

export default Dashboard
