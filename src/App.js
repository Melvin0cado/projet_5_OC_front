import 'materialize-css/dist/css/materialize.min.css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './assets/scss/App.scss'
import UserInterface from './component/AuthPart/UserInterface'

class App extends Component {
  render() {
    const { authenticated, children } = this.props

    return (
      <UserInterface authenticated={authenticated}>{children}</UserInterface>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  }
}

App.propTypes = {
  authenticated: PropTypes.bool,
  children: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(App)
