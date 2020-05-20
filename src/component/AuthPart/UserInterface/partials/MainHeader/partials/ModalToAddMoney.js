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
    Modal.init(document.getElementById('add-money'))
  }

  inputRequiredVerification() {
    const { money } = this.state

    let disabledBtn = money === '' || money <= 0
    this.setState({ disabledBtn })

    return disabledBtn
  }

  handleChange(e) {
    const { name } = e.target
    let { value } = e.target

    if (Number.isInteger(parseInt(value))) {
      value = parseInt(value)
    }

    this.setState({ [name]: value }, () => this.inputRequiredVerification())
  }

  handleSubmit() {
    const { token, userId } = this.props
    const { money } = this.state

    const data = {
      money,
    }

    return Axios.patch(
      `${api}/api/amount/by-user/${userId}`,
      data,
      configApi(token)
    )
      .then(() => SuccesSwal("L'ajout d'argent est réussi", 'refresh'))
      .catch(err => catchErr(err.response))
  }

  render() {
    const { disabledBtn } = this.state
    return (
      <div id="add-money" className="modal card">
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
              <label htmlFor="money">Ajout d&apos;argent</label>
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
}

export default ModalToAddMoney
