import 'materialize-css/dist/css/materialize.min.css'
import React, { Component } from 'react'
import './assets/scss/App.scss'
import RegistrationForm from './component/RegistrationForm'

class App extends Component {
  render() {
    return (
      <>
        <RegistrationForm />
      </>
    )
  }
}

export default App
