import Axios from 'axios'
import M from 'materialize-css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, configApi } from '../../config/parameters'
import { catchErr } from '../../globalAction/CatchErr'
import Loading from '../global/Loading'
import Card from './Dashboard/partials/Card/Card'
import ModalBudgetCard from './Dashboard/partials/ModalBudgetCard'
import PlaceholderCard from './Dashboard/partials/PlaceholderCard'

class ManagingBudgetCard extends Component {
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
    const { username, token, userId, amountId } = this.props
    const { loading, budgetCards } = this.state

    if (loading) {
      return <Loading size="big" />
    }

    return (
      <div className="row">
        <div className="row">{`Bienvenue ${username}`}</div>
        <div>
          <PlaceholderCard handleModal={this.handleModal} />
          {budgetCards.map(budgetCard => (
            <Card
              key={budgetCard.id}
              token={token}
              amountId={amountId}
              budgetCard={budgetCard}
            />
          ))}
          <ModalBudgetCard id="create-card" token={token} userId={userId} />
        </div>
      </div>
    )
  }
}

ManagingBudgetCard.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.number,
  amountId: PropTypes.number,
  token: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    token: state.auth.token,
    amountId: state.auth.amountId,
  }
}

export default connect(mapStateToProps)(ManagingBudgetCard)
