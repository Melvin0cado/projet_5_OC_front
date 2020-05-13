import React, { Component } from 'react'

class PlaceholderCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <div
          data-target="create-card"
          className="col s3 placeholder-card card waves-effect waves-blue modal-trigger"
        >
          <i className="large material-icons">add</i>
          <span className="bold text-dark-blue2">Créer une enveloppe</span>
        </div>
      </>
    )
  }
}

export default PlaceholderCard
