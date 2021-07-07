import { HeadProducts, SpanProducts,  } from 'styles/dashboard/index.style'
import { Col, Row } from 'antd'

const HeadAndSpanProducts =(props)=> {
    const { head, detail, theImg } = props;
    const styledImage = {
        display: 'block',
        margin:'auto',
        maxwidth: '100%',
        maxHeight: '100%'
    }

    return<div style={{margin:25}}>
           <Row>
               <Col lg={16} md={24}>
                 <HeadProducts>
                    {head}
                 </HeadProducts><br/>
                 <SpanProducts>
                    {detail}
                </SpanProducts>  
               </Col> 
               <Col lg={8} md={24}>
                    <img style={styledImage} src={theImg}/>
               </Col>
               </Row>
        </div>
};


export default HeadAndSpanProducts;