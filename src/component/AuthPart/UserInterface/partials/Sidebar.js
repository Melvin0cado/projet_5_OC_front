import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { icons } from '../../../../assets/images/icons'
import { sidebarConfig } from '../../../../config/userInterfaceConfig'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClickLink = this.handleClickLink.bind(this)
  }

  handleClickLink(namePage) {
    const { setDataToParent } = this.props

    setDataToParent('actualPage', namePage)
  }

  render() {
    const { location } = this.props
    return (
      <div className="sidebar">
        <div className="logo">
          <img
            className="mainLogo"
            src={icons.logo}
            alt="logo de family saves"
          />
          <span className="margin-l5 bold-ligth">Family saves</span>
        </div>
        {sidebarConfig.map(link => (
          <div key={link.name}>
            <Link
              className={`link-sidebar ${
                location.pathname === link.path ? 'active' : ''
              }`}
              to={link.path}
              onClick={() => this.handleClickLink(link.name)}
            >
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

Sidebar.propTypes = {
  location: PropTypes.object,
  setDataToParent: PropTypes.func,
}

export default withRouter(Sidebar)
