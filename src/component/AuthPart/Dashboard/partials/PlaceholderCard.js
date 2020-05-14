import React, { Component } from 'react'

class PlaceholderCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <div className="col s4">
          <div
            data-target="create-card"
            className="placeholder-card card waves-effect waves-blue modal-trigger"
          >
            <i className="large material-icons">add</i>
            <span className="bold text-dark-blue2">Créer une enveloppe</span>
          </div>
        </div>
      </>
    )
  }
}

export default PlaceholderCard
