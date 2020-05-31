import PropTypes from 'prop-types'
import React, { Component } from 'react'

class InformationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { title, content } = this.props
    return (
      <div className="col m3 l3 flex align-stretch">
        <div className="card white darken-1 full-width">
          <span className="card-title bold title-size text-dark-blue text-center col m12 l12">
            {title}
          </span>
          <div className="card-content flex flex-center flex-column text-dark-blue2 title-size">
            {content}
          </div>
        </div>
      </div>
    )
  }
}

InformationCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
}

export default InformationCard
