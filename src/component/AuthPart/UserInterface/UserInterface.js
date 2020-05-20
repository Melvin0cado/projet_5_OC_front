import PropTypes from 'prop-types'
import React from 'react'
import MainHeader from './partials/MainHeader/MainHeader'
import Sidebar from './partials/Sidebar'

const UserInterface = props => {
  const { authenticated, children, id, token } = props

  return (
    <>
      {authenticated === true ? (
        <div className="allContainer">
          <Sidebar />
          <div className="containerRight">
            <MainHeader id={id} token={token} />
            <div className="main-container">{children}</div>
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
  id: PropTypes.number,
  token: PropTypes.string,
}

export default UserInterface
