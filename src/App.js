import 'materialize-css/dist/css/materialize.min.css'
import React, { Component } from 'react'
import './assets/scss/App.scss'
import LoginForm from './component/loginPage/LoginForm'
import RegistrationForm from './component/loginPage/RegistrationForm'

class App extends Component {
  render() {
    return (
      <>
        <LoginForm />
        <RegistrationForm />
      </>
    )
  }
}

export default App
