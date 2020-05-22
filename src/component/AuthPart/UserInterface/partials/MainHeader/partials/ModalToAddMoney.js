import Axios from 'axios'
import { Modal } from 'materialize-css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { api, configApi } from '../../../../../../config/parameters'
import { catchErr } from '../../../../../../globalAction/CatchErr'
import { SuccesSwal } from '../../../../../../globalAction/swal'
import Button from '../../../../../global/Button'

class ModalToAddMoney extends Component {
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
    Modal.init(document.getElementById(id))
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

    this.setState({ [name]: value }, () => this.inputRequiredVerification())
  }

  handleSubmit() {
    const { id, token, userId, type } = this.props
    const { money } = this.state

    let data = {
      money,
    }

    if (id === 'add-money') {
      return Axios.patch(
        `${api}/api/amount/by-user/${userId}`,
        data,
        configApi(token)
      )
        .then(() => SuccesSwal("L'ajout d'argent est réussi", 'refresh'))
        .catch(err => catchErr(err.response))
    } else {
      const { budgetCard, amountId } = this.props
      const { title } = budgetCard

      data.type = type
      data.budgetCardId = budgetCard.id
      data.amountId = amountId

      let message = `L'ajout d'argent de l'enveloppe ${title} est réussi`

      if (type === 1) {
        message = `La soustraction d'argent de l'enveloppe ${title} est réussi.\n L'argent est retourné dans vos économies`
      }

      return Axios.post(`${api}/api/deal/create`, data, configApi(token))
        .then(() => SuccesSwal(message, 'refresh'))
        .catch(err => catchErr(err.response))
    }
  }

  render() {
    const { id, type } = this.props
    const { disabledBtn } = this.state
    return (
      <div id={id} className="modal card">
        <div className="card-content">
          <form>
            <div className="input-field col s12">
              <input
                name="money"
                type="number"
                onChange={this.handleChange}
                min={0}
                required
              />
              <label htmlFor="money">
                {type === 1 ? "Soustraction d'argent" : "Ajout d'argent"}
              </label>
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

ModalToAddMoney.propTypes = {
  token: PropTypes.string,
  userId: PropTypes.number,
  amountId: PropTypes.number,
  type: PropTypes.number,
  id: PropTypes.string,
  budgetCard: PropTypes.object,
  title: PropTypes.string,
}

export default ModalToAddMoney
