import styled from 'styled-components'
import { Checkbox } from 'antd'

export const CheckSeo = styled(Checkbox.Group)`
  .ant-checkbox-group-item
    + .ant-checkbox-group-item
    + .ant-checkbox-group-item
    + .ant-checkbox-group-item
    + .ant-checkbox-group-item {
    margin-left: 1.5rem;
  }
`
