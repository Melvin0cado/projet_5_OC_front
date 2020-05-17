import Axios from 'axios'
import M from 'materialize-css'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { api, configApi } from '../../../../../config/parameters'
import { catchErr } from '../../../../../globalAction/CatchErr'
import { SuccesSwal } from '../../../../../globalAction/swal'
import ModalBudgetCard from '../ModalBudgetCard'
import CustomChart from './partials/CustomChart'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.budgetCard
    M.Modal.init(document.getElementById(`edit${id}`))
  }

  CalculeTimeOut(time) {
    const timeOut = moment().to(time)

    return timeOut
  }

  traslateDate(time) {
    const splitTime = time.split(' ')
    let timeFr = ''

    splitTime.forEach((text, index) => {
      if (text === 'in') {
        splitTime[index] = 'dans'
      } else if (text === 'a') {
        splitTime[index] = '1'
      } else if (text === 'days') {
        splitTime[index] = 'jours'
      } else if (text === 'day') {
        splitTime[index] = 'jour'
      } else if (text === 'days') {
        splitTime[index] = 'jours'
      } else if (text === 'years') {
        splitTime[index] = 'années'
      } else if (text === 'year') {
        splitTime[index] = 'année'
      } else if (text === 'months' || text === 'month') {
        splitTime[index] = 'mois'
      } else if (text === 'hours') {
        splitTime[index] = 'heures'
      } else if (text === 'hour') {
        splitTime[index] = 'heure'
      }
      timeFr += splitTime[index] + ' '
    })

    return timeFr
  }

  handleDelete() {
    const { budgetCard, token } = this.props
    const { id } = budgetCard

    Axios.delete(`${api}/api/budget-card/${id}`, configApi(token))
      .then(res => SuccesSwal('La suppression est réussi'), 'refresh')
      .catch(err => catchErr(err.response))
  }

  render() {
    const { budgetCard } = this.props
    const { title, limitDate } = budgetCard

    const TimeOut = this.traslateDate(this.CalculeTimeOut(limitDate))

    return (
      <>
        <div className="col s3">
          <div className="budget-card card">
            <div className="full-width row text-center">
              <div className="col s12">
                <div>
                  <span className="bold title-size text-dark-blue2">
                    {title}
                  </span>
                  <div
                    className="trash-can bold title-size text-dark-blue2"
                    onClick={this.handleDelete}
                  >
                    <i className="material-icons">delete</i>
                  </div>
                  <div className="edit-btn bold title-size text-dark-blue2">
                    <i
                      data-target={`edit${budgetCard.id}`}
                      className="material-icons modal-trigger"
                    >
                      edit
                    </i>
                  </div>
                </div>

                <div className="sub-title">se termine {TimeOut}</div>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <CustomChart budgetCard={budgetCard} />
              </div>
            </div>
          </div>
        </div>
        <ModalBudgetCard budgetCard={budgetCard} />
      </>
    )
  }
}

Card.propTypes = {
  budgetCard: PropTypes.object,
  token: PropTypes.string,
}

export default Card
