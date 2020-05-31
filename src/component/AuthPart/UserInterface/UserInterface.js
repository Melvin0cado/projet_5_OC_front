import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { sidebarConfig } from '../../../config/userInterfaceConfig'
import MainHeader from './partials/MainHeader/MainHeader'
import Sidebar from './partials/Sidebar'

class UserInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getDataFromChild = this.getDataFromChild.bind(this)
  }

  componentDidMount() {
    const { location } = this.props
    const { pathname } = location

    for (let i = 0; i < sidebarConfig.length; i++) {
      const sideBarItem = sidebarConfig[i]

      if (pathname === sideBarItem.path) {
        this.setState({ actualPage: sideBarItem.name })
        break
      }
    }
  }

  getDataFromChild(name, value) {
    this.setState({ [name]: value })
  }

  render() {
    const { authenticated, children, id, token } = this.props
    const { actualPage } = this.state

    return (
      <>
        {authenticated === true ? (
          <div className="allContainer">
            <Sidebar setDataToParent={this.getDataFromChild} />
            <div className="containerRight">
              <MainHeader id={id} token={token} actualPage={actualPage} />
              <div className="main-container">{children}</div>
            </div>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </>
    )
  }
}

UserInterface.propTypes = {
  children: PropTypes.node.isRequired,
  authenticated: PropTypes.bool,
  id: PropTypes.number,
  token: PropTypes.string,
  location: PropTypes.object,
}

export default withRouter(UserInterface)
