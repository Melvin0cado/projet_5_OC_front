import Axios from 'axios'
import M from 'materialize-css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, configApi } from '../../../../config/parameters'
import { catchErr } from '../../../../globalAction/CatchErr'
import { SuccesSwal } from '../../../../globalAction/swal'
import Button from '../../../global/Button'
import DatePicker from '../../../global/DatePicker'

class ModalBudgetCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabledBtn: true,
      title: '',
      startMoney: 0,
      ceil: '',
      dateSelected: '',
      idToUse:
        props.budgetCard !== undefined
          ? `edit${props.budgetCard.id}`
          : 'create-card',
    }
    this.handleChange = this.handleChange.bind(this)
    this.inputRequiredVerification = this.inputRequiredVerification.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setDateSelected = this.setDateSelected.bind(this)
  }

  componentDidMount() {
    const { budgetCard } = this.props

    if (budgetCard !== undefined) {
      const { title, currentMoney, ceil, limitDate } = budgetCard

      this.setState(
        {
          disabledBtn: false,
          title,
          startMoney: currentMoney,
          ceil,
          dateSelected: limitDate,
        },
        () => M.updateTextFields()
      )
    } else {
      M.updateTextFields()
    }
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
    const { token, userId, budgetCard } = this.props
    const { idToUse, title, ceil, startMoney, dateSelected } = this.state

    const data = {
      title,
      ceil,
      currentMoney: startMoney,
      limitDate: dateSelected,
      userId,
    }

    if (budgetCard !== undefined && idToUse === `edit${budgetCard.id}`) {
      return Axios.patch(
        `${api}/api/budget-card/${budgetCard.id}`,
        data,
        configApi(token)
      )
        .then(() =>
          SuccesSwal("L'édition de l'enveloppe est  réussi", 'refresh')
        )
        .catch(err => catchErr(err.response))
    }

    Axios.post(`${api}/api/budget-card/create`, data, configApi(token))
      .then(() => SuccesSwal("Création de l'enveloppe est réussi", 'refresh'))
      .catch(err => catchErr(err.response))
  }

  render() {
    const {
      idToUse,
      disabledBtn,
      title,
      ceil,
      startMoney,
      dateSelected,
    } = this.state

    return (
      <div id={idToUse} className="modal card">
        <div className="card-content">
          <form>
            <div className="input-field col s12">
              <input
                name="title"
                type="text"
                onChange={this.handleChange}
                defaultValue={title}
                required
              />
              <label htmlFor="title">Titre</label>
            </div>
            <div className="input-field col s12">
              <input
                name="ceil"
                type="number"
                onChange={this.handleChange}
                defaultValue={ceil}
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
                value={startMoney}
                min={0}
                required
              />
              <label htmlFor="startMoney">Argent de départ (minimum : 0)</label>
            </div>
            <DatePicker
              id={`picker${idToUse}`}
              name="limitDate"
              className="input-field col s12"
              defaultValue={dateSelected}
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

ModalBudgetCard.propTypes = {
  budgetCard: PropTypes.object,
  token: PropTypes.string,
  userId: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.id,
  }
}

export default connect(mapStateToProps)(ModalBudgetCard)
