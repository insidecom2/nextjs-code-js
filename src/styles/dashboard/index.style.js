import styled from 'styled-components'

export const HeadProducts = styled.span`
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 13px !important;
  line-height: 15px !important;
  color: #438afe !important;
`

export const SpanProducts = styled.span`
  font-style: normal !important;
  font-weight: 300 !important;
  font-size: 10px !important;
  line-height: 24px !important;
  color: #6a707e !important;
`

export const TextTopProducts = styled.span`
  background: linear-gradient(180deg, #438afe 0%, #82e3e3 100%);
  width: 31.73px;
  height: 43.48px;
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
  text-align: center;
  padding-top: 5px;
  span {
    font-style: normal;
    font-weight: bold !important;
    font-size: 12px;
    color: white !important;
  }

  @media (max-width: 1410px) {
    width: 25.73px;
    height: 43.48px;
    max-width: 100%;
    max-height: 100%;
    span {
      font-style: normal;
      font-weight: bold !important;
      font-size: 6px !important;
      color: white !important;
    }
  }
`

export const DivCardProducts = styled.div`
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 22px;
  margin: 10px;
  height: 167px;
  /* width: 285px; */
  max-width: 100%;
  max-height: 100%;
  @media (max-width: 1410px) {
    height: 140px;
    width: 160px;
    max-width: 100%;
    max-height: 100%;
  }
`

export const DivDashPage = styled.div`
  padding: '30px' !important;
  padding-top: 0 !important;
  background-color: '#f0f2f5' !important;
`

export const BtnLeft = styled.button`
  height: 24px;
  max-height: 100%;
  ${(props) =>
    props.status
      ? `background: linear-gradient(180deg, #438AFE 0%, #82E3E3 100%);`
      : `background:#FFFFFF;`}
  border: 1px solid #F3F4F6;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.05);
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  ${(props) => (props.status ? `color:#FFFFFF;` : `color:#6A707E;`)}
  text-align: center;
  width: 50px;
  max-width: 100%;
`

export const BtnRight = styled.button`
  height: 24px;
  max-height: 100%;
  ${(props) =>
    Boolean(props.status)
      ? `background: linear-gradient(180deg, #438AFE 0%, #82E3E3 100%);`
      : `background:#FFFFFF;`}
  border: 1px solid #F3F4F6;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.05);
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  ${(props) => (Boolean(props.status) ? `color:#FFFFFF;` : `color:#6A707E;`)}
  text-align: center;
  width: 50px;
  max-width: 100%;
`

export const BtnCenter = styled.button`
  height: 24px;
  max-height: 100%;
  ${(props) =>
    props.status
      ? `background: linear-gradient(180deg, #438AFE 0%, #82E3E3 100%);`
      : `background:#FFFFFF;`}
  border: 1px solid #F3F4F6;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  ${(props) => (props.status ? `color:#FFFFFF;` : `color:#6A707E;`)}
  text-align: center;
  width: 60px;
  max-width: 100%;
`

export const HrBar = styled.div`
  border: solid 0.1px #d2ccff;
`
export const TitleDashboard = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    color: #6A707E;
     background: #FFFFFF;
    margin-top: 0 !important;
    height: 64px;
    text-align:center;
    max-height: 100% !important;
    font-weight: 500 !important;
    font-size: 37px !important;
    margin-left:20px;
    float: left;
}
`

export const Shocked = styled.label`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
  color: #6a707e !important;
  &:after {
    content: url('https://media.discordapp.net/attachments/775978814693441568/844088044691914782/exclamation-circle_2.png');
    position: relative;
    top: 7px;
  }
`

export const DashboardCardDiv = styled.div`
  padding: 1rem;
  max-height: 100%;
  background-color: white;
  border-radius: 30px;
  border: 20px solid #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  .sell-promotion,
  .date-promotion {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
  }
  .sell-promotion {
    color: #7f63f4;
  }
  .date-promotion {
    color: #6a707e;
  }

  .post {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 16px;
    color: #6a707e;
  }

  span {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    color: #6a707e;
  }
  .span01 {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 16px;
    color: #6a707e;
  }
  .span02 {
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 24px;
    color: #222b45;
  }
  h4.ant-typography {
    font-size: 30px;
  }
  .lay .recharts-wrapper,
  .lay svg {
    display: block;
    margin: auto;
    max-height: 100%;
    max-width: 100%;
  }
  img {
    display: block;
    margin: auto;
    max-height: 100%;
    max-width: 100%;
  }
`

export const ArrowItem = styled.div`
  display: block;
  margin: auto;
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
export const StatusIcon = styled.span`
  &:before {
    position: absolute;
    right: 0;
    ${(props) =>
      props.status === 'eye' &&
      `content: url('https://media.discordapp.net/attachments/775978814693441568/861536766779588608/Group.png');`}
    ${(props) =>
      props.status === 'person' &&
      `content: url('https://media.discordapp.net/attachments/775978814693441568/861539083461197844/Group.jpg');`}
  ${(props) =>
      props.status === 'order' &&
      `content: url('https://media.discordapp.net/attachments/775978814693441568/861539176910815292/Group_1.jpg');`}
    ${(props) =>
      props.status === 'sell' &&
      `content: url('https://media.discordapp.net/attachments/775978814693441568/861539248275980308/Group_2.jpg');`}
  }
`
