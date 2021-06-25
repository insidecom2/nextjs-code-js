import styled from 'styled-components'
import { Image, Alert } from 'antd'
import { DeleteTwoTone, CopyTwoTone } from '@ant-design/icons'

export const Headmediaimage = styled.div`
  position: relative;
  display: block;
  margin: auto;
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

export const Mediaicon = styled(DeleteTwoTone)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  color: red;
  cursor: pointer;
  /* background-color: white; */
`

export const Copyicon = styled(CopyTwoTone)`
  position: absolute;
  top: 5px;
  right: 25px;
  z-index: 1;
  color: red;
  cursor: pointer;
`
