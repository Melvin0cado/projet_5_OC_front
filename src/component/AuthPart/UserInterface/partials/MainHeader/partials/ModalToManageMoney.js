import Axios from 'axios'
import { FormSelect, Modal } from 'materialize-css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { api, configApi } from '../../../../../../config/parameters'
import { selectOptionTypeTransaction } from '../../../../../../config/selectOptionConfig'
import { catchErr } from '../../../../../../globalAction/CatchErr'
import { SuccesSwal } from '../../../../../../globalAction/swal'
import Button from '../../../../../global/Button'

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
    Modal.init(document.getElementById(id))
    FormSelect.init(document.querySelectorAll('select'))
  }

  inputRequiredVerification() {
    const { typeSelect } = this.props
    const { money, operationType } = this.state

    let disabledBtn = !Number.isInteger(money) || money <= 0

    if (typeSelect) {
      disabledBtn = disabledBtn || operationType === undefined
    }

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
      if (name === 'operationType') {
        FormSelect.init(document.querySelectorAll('select'))
      }
    })
  }

  handleSubmit() {
    const { id, token, userId, type } = this.props
    const { money, operationType } = this.state

    let data = {
      money,
    }

    if (id === 'add-amount-money') {
      data.type = operationType

      let message = "L'ajout d'argent dans vos économies est réussi"

      if (operationType === 1) {
        message = "La soustraction d'argent dans vos économies est réussi"
      }

      return Axios.patch(
        `${api}/api/amount/by-user/${userId}`,
        data,
        configApi(token)
      )
        .then(() => SuccesSwal(message, 'refresh'))
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
    const { id, type, typeSelect } = this.props
    const { disabledBtn, operationType } = this.state

    let labelForMoney = type === 1 ? "Soustraction d'argent" : "Ajout d'argent"

    if (operationType !== undefined) {
      labelForMoney =
        operationType === 1 ? "Soustraction d'argent" : "Ajout d'argent"
    }

    let defaultValueForOperationType =
      typeSelect === undefined ? type : 'select-label'

    return (
      <div id={id} className="modal card">
        <div className="card-content">
          <form className="row">
            <div className="input-field col s4">
              <select
                name="operationType"
                type="number"
                onChange={this.handleChange}
                defaultValue={defaultValueForOperationType}
                disabled={type !== undefined}
                required
              >
                <option value="select-label" disabled>
                  sélectionnez une option
                </option>
                {selectOptionTypeTransaction.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.name}
                  </option>
                ))}
              </select>
              <label htmlFor="money">{"type d'opération"}</label>
            </div>
            <div className="input-field col s8">
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
  typeSelect: PropTypes.bool,
}

export default ModalToManageMoney
