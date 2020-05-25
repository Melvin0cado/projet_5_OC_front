import Axios from 'axios'
import { Modal } from 'materialize-css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ACTION_TYPE_AMOUNT_MONEY } from '../../../../../../actions/types'
import { api, configApi } from '../../../../../../config/parameters'
import { catchErr } from '../../../../../../globalAction/CatchErr'
import { SuccesSwal } from '../../../../../../globalAction/swal'
import { store } from '../../../../../../store'
import Button from '../../../../../global/Button'
import { clearInput } from '../../../../../global/function/materializeFunction'

class ModalToManageMoney extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabledBtn: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.inputRequiredVerification = this.inputRequiredVerification.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { id } = this.props
    const instanceModal = Modal.init(document.getElementById(id))

    this.setState({ instanceModal })
  }

  inputRequiredVerification() {
    const { money } = this.state

    let disabledBtn = !Number.isInteger(money) || money <= 0

    this.setState({ disabledBtn })

    return disabledBtn
  }

  handleChange(e) {
    const { name } = e.target
    let { value } = e.target

    if (Number.isInteger(parseFloat(value))) {
      value = parseInt(value)
    }

    this.setState({ [name]: value }, () => {
      this.inputRequiredVerification()
    })
  }

  handleSubmit() {
    const {
      id,
      token,
      userId,
      type,
      amountMoney,
      addToAmountMoney,
      removeToAmountMoney,
    } = this.props
    const { money, instanceModal } = this.state

    let data = {
      money,
    }

    if (id === 'add-amount-money' || id === 'remove-amount-money') {
      data.type = type

      let message = "L'ajout d'argent dans vos économies est réussi"

      if (type === 1) {
        message = "La soustraction d'argent dans vos économies est réussi"
      }

      return Axios.patch(
        `${api}/api/amount/by-user/${userId}`,
        data,
        configApi(token)
      )
        .then(res => {
          if (res.status === 200) {
            if (type === 0) {
              addToAmountMoney(money)
            } else if (type === 1) {
              removeToAmountMoney(money)
            }
            instanceModal.close()
            clearInput()
            SuccesSwal(message, null)
          }
        })
        .catch(err => catchErr(err.response))
    } else {
      const { budgetCard, amountId, getCardList } = this.props
      const { title } = budgetCard

      data.type = type
      data.budgetCardId = budgetCard.id
      data.amountId = amountId

      let message = `L'ajout d'argent de l'enveloppe ${title} est réussi`

      if (type === 1) {
        message = `La soustraction d'argent de l'enveloppe ${title} est réussi.\n L'argent est retourné dans vos économies`
      }

      return Axios.post(`${api}/api/deal/create`, data, configApi(token))
        .then(res => {
          if (res.status === 201) {
            getCardList()
            if (type === 0) {
              store.dispatch({
                type: ACTION_TYPE_AMOUNT_MONEY.UPDATE_MONEY,
                money: amountMoney - money,
              })
            } else if (type === 1) {
              store.dispatch({
                type: ACTION_TYPE_AMOUNT_MONEY.UPDATE_MONEY,
                money: amountMoney + money,
              })
            }

            instanceModal.close()
            clearInput()
            SuccesSwal(message, null)
          }
        })
        .catch(err => catchErr(err.response))
    }
  }

  render() {
    const { id, type, mainTitle } = this.props
    const { disabledBtn } = this.state

    let labelForMoney = type === 1 ? "Soustraction d'argent" : "Ajout d'argent"

    return (
      <div id={id} className="modal card">
        <div className="card-content">
          <div className="row bold text-dark-blue3 title-size">{mainTitle}</div>
          <form className="row">
            <div className="input-field col s12">
              <input
                name="money"
                type="number"
                onChange={this.handleChange}
                min={0}
                required
              />
              <label htmlFor="money">{labelForMoney}</label>
            </div>

            <Button
              type="button"
              text="Valider"
              disabled={disabledBtn}
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    )
  }
}

ModalToManageMoney.propTypes = {
  token: PropTypes.string,
  userId: PropTypes.number,
  amountId: PropTypes.number,
  type: PropTypes.number,
  id: PropTypes.string,
  budgetCard: PropTypes.object,
  title: PropTypes.string,
  mainTitle: PropTypes.string,
  addToAmountMoney: PropTypes.func,
  removeToAmountMoney: PropTypes.func,
  getCardList: PropTypes.func,
  amountMoney: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    amountMoney: state.amount.money,
  }
}

export default connect(mapStateToProps)(ModalToManageMoney)
