import PropTypes from 'prop-types'
import React from 'react'

const UserInterface = props => {
  const { authenticated, children } = props

  return (
    <>
      {authenticated === true ? (
        <div className="allContainer">
          <div className="sidebar">sidebar</div>
          <div className="containerRight">
            <div className="header">header</div>
            <div>{children}</div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  )
}

UserInterface.propTypes = {
  children: PropTypes.node.isRequired,
  authenticated: PropTypes.bool,
}

export default UserInterface
