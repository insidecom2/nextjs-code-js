import styled from 'styled-components'

export const TitleDashboard = styled.span`
  color: white;
  font-size: 20px;
`

export const DashboardCardDiv = styled.div`
  padding: 1rem;
  height: 175px;
  background-color: white;
  border-radius: 30px;
  border: 20px solid #f5f4ff;

  span {
    font-family: Open Sans, serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #6a707e;
  }
`

export const ArrowItem = styled.div`
  width: 100%;
  height: 100%;

  ${(props) =>
    props.status &&
    `background-image: url('https://media.discordapp.net/attachments/775978814693441568/843743023904849981/Group_1.png');`}
  ${(props) =>
    !props.status &&
    `background-image: url('https://media.discordapp.net/attachments/775978814693441568/843736502297952276/Group.png');`}
`
