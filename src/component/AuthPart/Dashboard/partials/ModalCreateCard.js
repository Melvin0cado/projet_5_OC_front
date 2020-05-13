import Axios from 'axios'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, configApi } from '../../../../config/parameters'
import { catchErr } from '../../../../globalAction/CatchErr'
import { SuccesSwal } from '../../../../globalAction/swal'
import Button from '../../../global/Button'
import DatePicker from '../../../global/DatePicker'

class ModalCreateCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabledBtn: true,
      title: '',
      startMoney: 0,
      ceil: '',
      dateSelected: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.inputRequiredVerification = this.inputRequiredVerification.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setDateSelected = this.setDateSelected.bind(this)
  }

  inputRequiredVerification() {
    const { title, ceil, startMoney, dateSelected } = this.state

    let disabledBtn =
      title === '' ||
      ceil <= 0 ||
      ceil === '' ||
      startMoney === '' ||
      startMoney < 0 ||
      dateSelected === ''
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

  setDateSelected(value) {
    this.setState({ dateSelected: value }, () =>
      this.inputRequiredVerification()
    )
  }

  handleSubmit() {
    const { token, userId } = this.props
    const { title, ceil, startMoney, dateSelected } = this.state

    const data = {
      title,
      ceil,
      currentMoney: startMoney,
      limitDate: dateSelected,
      userId,
    }

    Axios.post(`${api}/api/budget-card/create`, data, configApi(token))
      .then(() => SuccesSwal("Création de l'enveloppe réussi", 'refresh'))
      .catch(err => catchErr(err.response))
  }

  render() {
    const { disabledBtn } = this.state
    return (
      <div id="create-card" className="modal card">
        <div className="card-content">
          <form>
            <div className="input-field col s12">
              <input
                name="title"
                type="text"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="title">Titre</label>
            </div>
            <div className="input-field col s12">
              <input
                name="ceil"
                type="number"
                onChange={this.handleChange}
                min={1}
                required
              />
              <label htmlFor="ceil">Plafond (ex: 50)</label>
            </div>
            <div className="input-field col s12">
              <input
                name="startMoney"
                type="number"
                onChange={this.handleChange}
                defaultValue={0}
                min={0}
                required
              />
              <label htmlFor="startMoney">Argent de départ (minimum : 0)</label>
            </div>
            <DatePicker
              name="limitDate"
              className="input-field col s12"
              setDateSelected={this.setDateSelected}
            />
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

ModalCreateCard.propTypes = {
  token: PropTypes.string,
  userId: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.id,
  }
}

export default connect(mapStateToProps)(ModalCreateCard)
