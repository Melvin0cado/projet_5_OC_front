import propTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { username } = this.props
    return <div>{`Bienvenue ${username}`}</div>
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
