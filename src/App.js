import 'materialize-css/dist/css/materialize.min.css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './assets/scss/App.scss'
import UserInterface from './component/AuthPart/UserInterface/UserInterface'

class App extends Component {
  render() {
    const { authenticated, children, id, token } = this.props

    return (
      <UserInterface token={token} authenticated={authenticated} id={id}>
        {children}
      </UserInterface>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    id: state.auth.id,
    token: state.auth.token,
  }
}

App.propTypes = {
  authenticated: PropTypes.bool,
  children: PropTypes.object.isRequired,
  id: PropTypes.number,
  token: PropTypes.string,
}

export default connect(mapStateToProps)(App)
