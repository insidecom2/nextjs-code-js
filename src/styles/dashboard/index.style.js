import styled from 'styled-components'

export const HrBar = styled.div`
   border: solid 0.1px #D2CCFF;   
`
export const TitleDashboard = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 20px;
    color: #F2F2F2;
}
`

export const Shocked = styled.label`
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 150%;
color: #7F63F4 !important;
&:after {
  content:url('https://media.discordapp.net/attachments/775978814693441568/844088044691914782/exclamation-circle_2.png');
     position: relative;
     top: 7px;
}
`

export const DashboardCardDiv = styled.div`
  padding: 1rem;
  max-height:100%;
  background-color: white;
  border-radius: 30px;
  border: 20px solid #f5f4ff;
  .sell-promotion,.date-promotion {
    font-family: Open Sans;
   font-style: normal;
   font-weight: normal;
   font-size: 13px;
   line-height: 16px;
  }
  .sell-promotion {
    color: #7F63F4;
  }
  .date-promotion {
    color: #6A707E;
  }

  .post {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 16px;
    color: #6A707E;
  }

span {
font-family: Open Sans;
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 16px;
color: #6A707E;
}
.span01 {
font-style: normal;
font-weight: normal;
font-size: 15px;
line-height: 16px;
color: #6A707E;
  }
  .span02 {
font-family: Open Sans;
font-style: normal;
font-weight: bold;
font-size: 30px;
line-height: 24px;
color: #222B45;
  }
  h4.ant-typography {
    font-size: 30px;
  }
`

export const ArrowItem = styled.div`
display:block;
margin:auto;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;

  ${(props) =>
    props.status &&
    `background-image: url('https://media.discordapp.net/attachments/775978814693441568/843743023904849981/Group_1.png');`}
  ${(props) =>
    !props.status &&
    `background-image: url('https://media.discordapp.net/attachments/775978814693441568/843736502297952276/Group.png');`}
`
