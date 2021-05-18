import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { DashboardCardDiv, Shocked } from 'styles/dashboard/index.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Rating =(props)=>{
    const { ratingValue } = props
    let CheckRating = [], negativeRating = 5-ratingValue;
    for(let Count=0;Count<ratingValue;Count++) {CheckRating.push("orange")}
    for(let Count=0;Count<negativeRating;Count++) {CheckRating.push("gray")}
    return<div>{CheckRating.map((SetColor)=><FontAwesomeIcon icon={faStar} color={SetColor} />)}</div>
  };
const DashboardBestSell = (props) => {
    const { name, text, image, headText, ratingProduct } = props
  return (
    <DashboardCardDiv >
    <Row >
       <Col span={12}>
       <Rating ratingValue={ratingProduct} />
        </Col>
      <Col span={12}>
        <Row className='span01'>{name}</Row>
      </Col>
    </Row>
    <Row>
       <Col span={12}>
           <Row >
              <img src={image} />
           </Row>
       </Col>
       <Col span={12}>
          <Row >
              <Shocked>
              {headText}
              </Shocked>    
          </Row>
          <Row >
           <span>{text}</span>    
          </Row>
       </Col>
    </Row>    
  </DashboardCardDiv>
  )
}

DashboardBestSell.propTypes = {
  value: PropTypes.string
}

export default DashboardBestSell
