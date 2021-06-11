import styled from 'styled-components'
import { Upload } from 'antd'

export const UploadEx = styled(Upload)`
  display: block;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  .ant-upload.ant-upload-select-picture-card,
  .ant-upload.ant-upload-select-picture-card img {
    display: block;
    margin: auto;
    width: unset;
    /* width: 200px; */
    height: 200px;
    max-width: 100%;
    max-height: 100%;
  }
`
