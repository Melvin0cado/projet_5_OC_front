import Axios from 'axios'
import M from 'materialize-css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, configApi } from '../../../config/parameters'
import { catchErr } from '../../../globalAction/CatchErr'
import Loading from '../../global/Loading'
import Card from './partials/Card/Card'
import ModalBudgetCard from './partials/ModalBudgetCard'
import PlaceholderCard from './partials/PlaceholderCard'

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
    const { username, token } = this.props
    const { loading, budgetCards } = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <div className="row">
        <div className="row">{`Bienvenue ${username}`}</div>
        <div>
          <PlaceholderCard handleModal={this.handleModal} />
          {budgetCards.map(budgetCard => (
            <Card key={budgetCard.id} token={token} budgetCard={budgetCard} />
          ))}
          <ModalBudgetCard />
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.number,
  token: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps)(Dashboard)
