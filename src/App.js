import 'materialize-css/dist/css/materialize.min.css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './assets/scss/App.scss'
import LoginForm from './component/loginPage/LoginForm'
import RegistrationForm from './component/loginPage/RegistrationForm'

class App extends Component {
  render() {
    const { authenticated } = this.props
    console.log(this.props)
    if (!authenticated) {
      return (
        <>
          <LoginForm />
          <RegistrationForm />
        </>
      )
    } else {
      return `coucou tu es authentifié`
    }
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  }
}

App.propTypes = {
  authenticated: PropTypes.bool,
}

export default connect(mapStateToProps)(App)
