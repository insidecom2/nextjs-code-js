import styled from 'styled-components'
import { Image } from 'antd'
import {
    CloseSquareOutlined
  } from '@ant-design/icons'

export const Headmediaimage = styled.div`
position: relative;
display: block;
margin: auto;
width: 200px;
height: 200px;
text-align: center;
max-width: 100%;
max-height: 100%;
`

export const Mediaimagelist = styled(Image)`
display: block;
margin: auto;
width: auto;
height: 200px;
max-width: 100%;
max-height: 100%;
`

export const Mediaicon = styled(CloseSquareOutlined)`
position: absolute; 
top:0; 
right:0;
z-index : 1;
color: red;
cursor: pointer;
background-color: white;
`