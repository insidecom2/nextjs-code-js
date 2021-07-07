import { DashboardCardDiv } from 'styles/dashboard/index.style'
import { Col, Row } from 'antd'
import { DonutChart } from 'components/Shared/Chart/DonutChart'

const CardMsn =(props)=> {
   const  { setMsn , setSize , setDate } = props;
const styledBorder = {
    border:0,
    background: 'linear-gradient(90deg, #438AFE 0%, #54A1F7 0%, #82E3E3 100%)',
    padding:4,
};

const styleRight = {
    display:'flex' ,
    background: 'linear-gradient(90deg, #438AFE 0%, #54A1F7 0%, #82E3E3 100%)',
    borderRadius: 22
};

const styleSpan1 = {
    display: 'block',
    margin: 'auto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 10
};

const styleSpan2 = {
    display: 'block',
    margin: 'auto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 70,
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 10
};

const styleSpan3 = {
    display: 'block',
    margin: 'auto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 10
};


    return<DashboardCardDiv style={styledBorder}>
            <div style={{backgroundColor:"#FFF",borderRadius: 22}} >
            <Row >
        <Col lg={15} md={24}>
        <span className="lay" >
          <DonutChart setWidth={235} setHeight={285} setCX={120} setCY={140} setOuterRadius={100} />
        </span>
                 </Col>
                 <Col style={styleRight} lg={9} md={24}>
                  <div style={{margin:"auto"}}>
                  <span style={styleSpan1}>{setMsn}</span><br/>
                  <span style={styleSpan2}>{setSize}</span><br/>
                  <span style={styleSpan3}>{setDate}</span>
                  </div>    
                 </Col>
</Row>  
            </div>  
         
        </DashboardCardDiv>
}

export default CardMsn;