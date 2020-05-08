import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { sidebarConfig } from '../../../../config/userInterfaceConfig'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { location } = this.props
    return (
      <div className="sidebar">
        <div className="logo">Logo</div>
        {sidebarConfig.map(link => (
          <div key={link.name}>
            <Link
              className={`link-sidebar ${
                location.pathname === link.path ? 'active' : ''
              }`}
              to={link.path}
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
}

export default withRouter(Sidebar)
