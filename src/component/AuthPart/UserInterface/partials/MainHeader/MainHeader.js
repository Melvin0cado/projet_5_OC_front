import Axios from 'axios'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ACTION_TYPE_AMOUNT_MONEY, ACTION_TYPE_AUTH } from '../../../../../actions/types'
import { api, configApi } from '../../../../../config/parameters'
import { catchErr } from '../../../../../globalAction/CatchErr'
import { store } from '../../../../../store'
import Loading from '../../../../global/Loading'
import ModalToManageMoney from './partials/ModalToManageMoney'

class MainHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.handleDisconnect = this.handleDisconnect.bind(this)
    this.addToAmountMoney = this.addToAmountMoney.bind(this)
    this.removeToAmountMoney = this.removeToAmountMoney.bind(this)
  }

  componentDidMount() {
    const { id, token } = this.props
    const powerOff = document.getElementById('power-off')

    powerOff.style.width = `${powerOff.offsetHeight}px`

    const disconnectBtn = document.getElementById('disconnectBtn')

    disconnectBtn.style.width = `${disconnectBtn.offsetHeight}px`
    Axios.get(`${api}/api/amount/by-user/${id}`, configApi(token))
      .then(res => {
        store.dispatch({
          type: ACTION_TYPE_AMOUNT_MONEY.UPDATE_MONEY,
          money: res.data.amount.money,
        })
        this.setState({ loading: false })
      })
      .catch(err => catchErr(err.response))
  }

  handleDisconnect() {
    localStorage.removeItem('token')
    store.dispatch({
      type: ACTION_TYPE_AUTH.LOGOUT,
    })
  }

  addToAmountMoney(moneyToAdd) {
    const { money } = this.props
    store.dispatch({
      type: ACTION_TYPE_AMOUNT_MONEY.UPDATE_MONEY,
      money: money + moneyToAdd,
    })
  }

  removeToAmountMoney(moneyToRemove) {
    const { money } = this.props
    store.dispatch({
      type: ACTION_TYPE_AMOUNT_MONEY.UPDATE_MONEY,
      money: money - moneyToRemove,
    })
  }

  render() {
    const { id, token, actualPage, money } = this.props
    const { loading } = this.state

    return (
      <div className="header">
        {loading ? (
          <Loading size="small" />
        ) : (
          <div className="flex flex-between full-width">
            <h1 className="margin-l5 bold">{actualPage}</h1>
            <div className="money-container">
              <div className="label-money">Mes &eacute;conomies</div>
              <div className="money-value">
                <span className="flex">{money}</span>
                <span className="flex">
                  <i
                    data-target="add-amount-money"
                    className="material-icons modal-trigger"
                  >
                    add
                  </i>
                  <i
                    data-target="remove-amount-money"
                    className="material-icons modal-trigger"
                  >
                    remove
                  </i>
                </span>
              </div>
            </div>
          </div>
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
        <ModalToManageMoney
          id="add-amount-money"
          userId={id}
          mainTitle="Ajouter de l'argent des économies"
          token={token}
          type={0}
          addToAmountMoney={this.addToAmountMoney}
        />
        <ModalToManageMoney
          id="remove-amount-money"
          mainTitle="Retirer de l'argent des économies"
          userId={id}
          token={token}
          type={1}
          removeToAmountMoney={this.removeToAmountMoney}
        />
      </div>
    )
  }
}

MainHeader.propTypes = {
  id: PropTypes.number,
  token: PropTypes.string,
  actualPage: PropTypes.string,
  money: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    money: state.amount.money,
  }
}

export default connect(mapStateToProps)(MainHeader)
