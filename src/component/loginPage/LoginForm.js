import Axios from 'axios'
import React, { Component } from 'react'
import { api, configApi } from '../../config/parameters'
import { catchErr } from '../../globalAction/CatchErr'
import Button from '../global/Button'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      disabledBtn: true,
    }
    this.inputRequiredVerification = this.inputRequiredVerification.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  inputRequiredVerification() {
    const { email, password } = this.state

    this.setState({
      disabledBtn: email === '' || password === '',
    })
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value }, () => this.inputRequiredVerification())
  }

  handleClick() {
    const { email, password } = this.state

    const data = {
      email,
      password,
    }

    Axios.post(`${api}/api/user/login`, data, configApi)
      .then(res => console.log(res.data))
      .catch(err => catchErr(err.response))
  }

  render() {
    const { disabledBtn } = this.state
    return (
      <div className="row bg-dark-blue">
        <form className="col s6 right valign-wrapper">
          <div className="input-field col s5">
            <input name="email" type="email" onChange={this.handleChange} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s5">
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <div className="col 2">
            <Button
              type="button"
              text="Valider"
              disabled={disabledBtn}
              onClick={this.handleClick}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
