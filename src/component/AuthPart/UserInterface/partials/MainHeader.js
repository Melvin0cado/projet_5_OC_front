import React, { Component } from 'react'
import { ACTION_TYPE_AUTH } from '../../../../actions/types'
import { icons } from '../../../../assets/images/icons'
import { store } from '../../../../store'

class MainHeader extends Component {
  constructor(props) {
    super(props)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  handleDisconnect() {
    localStorage.removeItem('token')
    store.dispatch({
      type: ACTION_TYPE_AUTH.LOGOUT,
    })
  }

  render() {
    return (
      <div className="header">
        <div
          className="disconnectBtn btn waves-effect"
          onClick={this.handleDisconnect}
        >
          <img src={icons.powerOffDarkBlue3} alt="disconnect button" />
        </div>
      </div>
    )
  }
}

export default MainHeader
