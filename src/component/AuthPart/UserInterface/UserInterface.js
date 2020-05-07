import PropTypes from 'prop-types'
import React from 'react'
import MainHeader from './partials/MainHeader'
import Sidebar from './partials/Sidebar'

const UserInterface = props => {
  const { authenticated, children } = props

  return (
    <>
      {authenticated === true ? (
        <div className="allContainer">
          <Sidebar />
          <div className="containerRight">
            <MainHeader />
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
