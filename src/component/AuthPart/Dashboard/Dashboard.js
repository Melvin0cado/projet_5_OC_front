import Axios from 'axios'
import M from 'materialize-css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, configApi } from '../../../config/parameters'
import { catchErr } from '../../../globalAction/CatchErr'
import Loading from '../../global/Loading'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.getCardList = this.getCardList.bind(this)
  }

  componentDidMount() {
    this.getCardList()
  }

  getCardList() {
    const { userId, token } = this.props
    Axios.get(`${api}/api/budget-card-by-userId/${userId}`, configApi(token))
      .then(res => {
        this.setState(
          { budgetCards: res.data[0].budgetCards, loading: false },
          () => M.Modal.init(document.getElementById('create-card'))
        )
      })
      .catch(err => catchErr(err.response))
  }

  render() {
    const { username, amountId, token } = this.props
    const { loading, budgetCards } = this.state

    if (loading) {
      return <Loading size="big" />
    }

    return (
      <div className="row">
        <div className="row">{`Bienvenue ${username}`}</div>
        <div>Dashboard</div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.number,
  token: PropTypes.string,
  amountId: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    token: state.auth.token,
    amountId: state.auth.amountId,
  }
}

export default connect(mapStateToProps)(Dashboard)
