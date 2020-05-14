import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CustomChart from './partials/CustomChart'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { budgetCard } = this.props
    const { title } = budgetCard
    console.log(budgetCard)

    return (
      <>
        <div className="col s4">
          <div className="budget-card card">
            <div className="row">
              <div className="col s12">
                <span className="text-center bold title-size text-dark-blue2">
                  {title}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <CustomChart budgetCard={budgetCard} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

Card.propTypes = {
  budgetCard: PropTypes.object,
}

export default Card
