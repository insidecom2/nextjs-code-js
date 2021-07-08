
import { DivCardProducts, TextTopProducts} from 'styles/dashboard/index.style'
import { Col, Row } from 'antd'
import Rating from 'components/Shared/Rating'
import HeadAndSpanProducts from 'components/Shared/HeadAndSpanProducts'

const CardProducts =(props)=> {
    const { ratingProduct, Ranking, head, detail, theImg } = props;

    return<DivCardProducts>
         <Col span={24}>
          <Row>
            <Col style={{paddingLeft:20}}>
            <TextTopProducts>
             <span>Top</span><br/>
             <span>{Ranking}</span>
            </TextTopProducts>   
            </Col>
             <Col style={{paddingTop:10,paddingLeft:5}}>
                 <Rating  ratingValue={ratingProduct} />
             </Col>
            </Row>    
            <Row>
              <HeadAndSpanProducts theImg={theImg} head={head} detail={detail} />
          </Row>    
                                             </Col>
        </DivCardProducts>
}

export { CardProducts };