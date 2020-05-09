import React, { Component } from 'react'
import { ACTION_TYPE_AUTH } from '../../../../actions/types'
import { store } from '../../../../store'

class MainHeader extends Component {
  constructor(props) {
    super(props)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  componentDidMount() {
    const powerOff = document.getElementById('power-off')

    powerOff.style.width = `${powerOff.offsetHeight}px`

    const disconnectBtn = document.querySelector('.disconnectBtn')

    disconnectBtn.style.width = `${disconnectBtn.offsetHeight}px`
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
          <i id="power-off" className="power-off material-icons">
            power_settings_new
          </i>
          {/* <img src={icons.powerOffDarkBlue3} alt="disconnect button" /> */}
        </div>
      </div>
    )
  }
}

export default MainHeader
