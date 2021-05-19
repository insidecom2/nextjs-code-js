import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { DashboardCardDiv, Shocked, BtnLeft, BtnRight, BtnCenter } from 'styles/dashboard/index.style'
import { LineAndChart } from 'styles/LineChart'

const DashboardChart = (props) => {
    const { value } = props
    const [clickDateStatus,setClickDateStatus] = useState([false,false,true])

    const ClickDate =(GetKeyValue)=> {
      let SetTrue = [...clickDateStatus]
      SetTrue.map((SetFalse,index)=>SetTrue[index]=false)
      SetTrue[GetKeyValue]=true;
      setClickDateStatus(SetTrue)
    };

  return (
    <DashboardCardDiv >
    <Row >
      <Col  span={24}>
       <Row >
           <label>
            <Shocked>
             {value}
            </Shocked>
            <span style={{position:'absolute', right: 0,top:7}}>
             <BtnLeft onClick={(key)=>ClickDate(0)}   status={clickDateStatus[0]}>ปี</BtnLeft>
             <BtnCenter onClick={(key)=>ClickDate(1)} status={clickDateStatus[1]}>เดือน</BtnCenter>
             <BtnRight onClick={(key)=>ClickDate(2)}  status={clickDateStatus[2]}>วัน</BtnRight>
             </span>   
           </label>    
           
       </Row>    
      </Col>
      <Col className='lay'  span={24}>
        <LineAndChart/>
       </Col>   
    </Row>
  </DashboardCardDiv>
  )
}

DashboardChart.propTypes = {
  value: PropTypes.string
}

export default DashboardChart
