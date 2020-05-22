import Axios from 'axios'
import JwtDecode from 'jwt-decode'
import React, { Component } from 'react'
import { ACTION_TYPE_AUTH } from '../../../../actions/types'
import { api, configApi } from '../../../../config/parameters'
import { catchErr } from '../../../../globalAction/CatchErr'
import { store } from '../../../../store'
import Button from '../../../global/Button'

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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }

  inputRequiredVerification() {
    const { email, password } = this.state

    const disabledBtn = email === '' || password === ''
    this.setState({ disabledBtn })
    return disabledBtn
  }

  handlePress(e) {
    const { charCode } = e

    const isNotValidate = this.inputRequiredVerification()

    if (charCode === 13 && !isNotValidate) {
      this.handleSubmit()
    }
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value }, () => this.inputRequiredVerification())
  }

  handleSubmit() {
    const { email, password } = this.state

    const data = {
      email,
      password,
    }

    Axios.post(`${api}/api/login_check`, data, configApi())
      .then(res => {
        let { token } = res.data
        const tokenData = JwtDecode(token)

        token = `Bearer ${token}`

        localStorage.setItem('token', token)
        store.dispatch({
          type: ACTION_TYPE_AUTH.LOGIN,
          token,
          id: tokenData.id,
          username: tokenData.username,
          email: tokenData.email,
          role: tokenData.roles,
          amountId: tokenData.amountId,
        })
      })
      .catch(err => catchErr(err.response))
  }

  render() {
    const { disabledBtn } = this.state
    return (
      <div className="row bg-dark-blue">
        <form className="col s6 right valign-wrapper">
          <div className="input-field col s5">
            <input
              name="email"
              type="email"
              onChange={this.handleChange}
              onKeyPress={this.handlePress}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s5">
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
              onKeyPress={this.handlePress}
            />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <div className="col 2">
            <Button
              type="button"
              text="Valider"
              disabled={disabledBtn}
              onClick={this.handleSubmit}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
