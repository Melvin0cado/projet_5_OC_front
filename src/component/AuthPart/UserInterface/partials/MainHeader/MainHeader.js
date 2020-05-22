import Axios from 'axios'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ACTION_TYPE_AUTH } from '../../../../../actions/types'
import { api, configApi } from '../../../../../config/parameters'
import { catchErr } from '../../../../../globalAction/CatchErr'
import { store } from '../../../../../store'
import Loading from '../../../../global/Loading'
import ModalToAddMoney from './partials/ModalToAddMoney'

class MainHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  componentDidMount() {
    const { id, token } = this.props
    const powerOff = document.getElementById('power-off')

    powerOff.style.width = `${powerOff.offsetHeight}px`

    const disconnectBtn = document.getElementById('disconnectBtn')

    disconnectBtn.style.width = `${disconnectBtn.offsetHeight}px`
    Axios.get(`${api}/api/amount/by-user/${id}`, configApi(token))
      .then(res => {
        this.setState(
          { money: res.data.amount.money, loading: false },
          () => {}
        )
      })
      .catch(err => catchErr(err.response))
  }

  handleDisconnect() {
    localStorage.removeItem('token')
    store.dispatch({
      type: ACTION_TYPE_AUTH.LOGOUT,
    })
  }

  render() {
    const { id, token } = this.props
    const { money, loading } = this.state

    return (
      <div className="header">
        {loading ? (
          <Loading size="small" />
        ) : (
          <>
            <div className="money-container">
              <div className="label-money">Mes &eacute;conomies</div>
              <div
                data-target="add-money"
                className="money-value modal-trigger"
              >
                <span>{money}</span>
                <i className="material-icons">add_box</i>
              </div>
            </div>
          </>
        )}
        <div
          id="disconnectBtn"
          className="disconnectBtn btn waves-effect"
          onClick={this.handleDisconnect}
        >
          <i id="power-off" className="power-off material-icons">
            power_settings_new
          </i>
        </div>
        <ModalToAddMoney id="add-money" userId={id} token={token} />
      </div>
    )
  }
}

MainHeader.propTypes = {
  id: PropTypes.number,
  token: PropTypes.string,
}

export default MainHeader
