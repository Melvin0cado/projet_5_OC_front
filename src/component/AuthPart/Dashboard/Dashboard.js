import M from 'materialize-css'
import propTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalCreateCard from './partials/ModalCreateCard'
import PlaceholderCard from './partials/PlaceholderCard'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleModal = this.handleModal.bind(this)
  }

  componentDidMount() {
    M.AutoInit()
  }

  handleModal() {}

  render() {
    const { username } = this.props
    return (
      <div className="row">
        <div className="row">{`Bienvenue ${username}`}</div>
        <div>
          <PlaceholderCard handleModal={this.handleModal} />
          <ModalCreateCard />
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  username: propTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
  }
}

export default connect(mapStateToProps)(Dashboard)
