import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class DealHistoryView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { deal, header } = this.props

    if (header) {
      return (
        <>
          <div className="col m12 l12">
            <div className="deal-card header-table card row">
              <span className="bold col m3 l3 text-center">
                {"Nom de l'enveloppe"}
              </span>
              <span className="bold col m3 l3 text-center">Transaction</span>
              <span className="bold col m3 l3 text-center">Mes économies</span>
              <span className="bold col m3 l3 text-center">Date</span>
            </div>
          </div>
        </>
      )
    }

    const { money, type, budgetCard, createdAt } = deal
    const { title } = budgetCard

    return (
      <>
        <div className="col m12  l12">
          <div className="flex deal-card card row">
            <span className="bold col m3 l3 text-dark-blue3 text-center">
              {title}
            </span>
            {type === 0 ? (
              <span className="flex col m3 l3 text-dark-blue flex-center flex-column text-center">
                <div>
                  <i className="material-icons">arrow_back</i>
                </div>
                <div className="bold text-dark-blue">{money}€</div>
              </span>
            ) : (
              <span className="flex col m3 l3 text-dark-blue flex-center flex-column text-center">
                <div>
                  <i className="material-icons">arrow_forward</i>
                </div>
                <div className="bold text-dark-blue">{money}€</div>
              </span>
            )}

            <span className="bold col m3 l3 text-dark-blue3 text-center">
              Mes économies
            </span>
            <span className="bold col m3 l3 text-dark-blue3 text-center">
              {moment(createdAt).format('DD/MM/YYYY HH:mm')}
            </span>
          </div>
        </div>
      </>
    )
  }
}

DealHistoryView.propTypes = {
  deal: PropTypes.object,
  header: PropTypes.bool,
}
export default DealHistoryView
