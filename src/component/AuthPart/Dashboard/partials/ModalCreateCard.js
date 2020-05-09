import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../global/Button'

class ModalCreateCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabledBtn: true,
      title: '',
      ceil: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.inputRequiredVerification = this.inputRequiredVerification.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  inputRequiredVerification() {
    const { title, ceil } = this.state

    let disabledBtn = title === '' || ceil === 0 || ceil === ''
    this.setState({ disabledBtn })

    return disabledBtn
  }

  handleChange(e) {
    const { name } = e.target
    let { value } = e.target

    if (Number.isInteger(parseInt(value))) {
      value = parseInt(value)
    }

    this.setState({ [name]: value }, () => this.inputRequiredVerification())
  }

  handleSubmit() {
    const { token } = this.props

    console.log(token)
  }

  render() {
    const { disabledBtn } = this.state
    return (
      <div id="create-card" className="modal card">
        <div className="card-content">
          <form>
            <div className="input-field col s12">
              <input
                name="title"
                type="text"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="title">Titre</label>
            </div>
            <div className="input-field col s12">
              <input
                name="ceil"
                type="number"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="title">Plafond (ex: 50)</label>
            </div>
            <Button
              type="button"
              text="Valider"
              disabled={disabledBtn}
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    )
  }
}

ModalCreateCard.propTypes = {
  token: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps)(ModalCreateCard)
