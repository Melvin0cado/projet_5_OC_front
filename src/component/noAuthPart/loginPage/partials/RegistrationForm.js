import Axios from 'axios'
import M from 'materialize-css'
import React, { Component } from 'react'
import { api, configApi } from '../../../../config/parameters'
import { catchErr } from '../../../../globalAction/CatchErr'
import { SuccesSwal } from '../../../../globalAction/swal'
import Button from '../../../global/Button'

class RegistrationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      disabledBtn: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.inputRequiredVerification = this.inputRequiredVerification.bind(this)
  }

  componentDidMount() {
    M.AutoInit()
  }

  inputRequiredVerification() {
    const { name, email, password, password2 } = this.state

    this.setState({
      disabledBtn:
        name === '' ||
        email === '' ||
        password === '' ||
        password2 === '' ||
        password !== password2,
    })
  }

  handleChange(e) {
    const { name, value } = e.target

    this.setState({ [name]: value }, () => this.inputRequiredVerification())
  }

  handleClick() {
    const { name, email, password } = this.state

    const data = {
      username: name,
      email,
      password,
      roles: ['ROLE_USER'],
    }

    Axios.post(`${api}/api/user/create`, data, configApi())
      .then(() => {
        SuccesSwal('Inscription réussi', 'refresh')
      })
      .catch(err => catchErr(err.response))
  }

  render() {
    const { disabledBtn } = this.state
    return (
      <div className="container row">
        <form className="col s12">
          <div className="input-field col s12">
            <input name="name" type="text" onChange={this.handleChange} />
            <label htmlFor="name">Nom de compte</label>
          </div>
          <div className="input-field col s12">
            <input name="email" type="email" onChange={this.handleChange} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <div className="input-field col s12">
            <input
              name="password2"
              type="password"
              onChange={this.handleChange}
            />
            <label htmlFor="password2">Confirmer le mot de passe</label>
          </div>
          <div className="center-align">
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

export default RegistrationForm
