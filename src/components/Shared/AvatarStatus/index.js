import React from 'react'
import PropTypes from 'prop-types'
import { AvatarTextStatus } from 'styles/layout/index.style'
const AvatarStatus = (props) => {
  const { name, status } = props
  return (
    <AvatarTextStatus>
      <span>{name}</span> {status}
    </AvatarTextStatus>
  )
}

AvatarStatus.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string
}

export default AvatarStatus
