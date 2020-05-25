import Axios from 'axios'
import M from 'materialize-css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, configApi } from '../../../config/parameters'
import { catchErr } from '../../../globalAction/CatchErr'
import Loading from '../../global/Loading'
import Card from '../Card/Card'
import ModalBudgetCard from './partials/ModalBudgetCard'
import PlaceholderCard from './partials/PlaceholderCard'

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
    const { token, userId, amountId } = this.props
    const { loading, budgetCards } = this.state

    if (loading) {
      return <Loading size="big" />
    }

    return (
      <div className="row">
        <div className="row">
          <PlaceholderCard handleModal={this.handleModal} />
        </div>
        <div className="row">
          {budgetCards.map(budgetCard => (
            <Card
              key={budgetCard.id}
              token={token}
              getCardList={this.getCardList}
              userId={userId}
              amountId={amountId}
              budgetCard={budgetCard}
            />
          ))}
          <ModalBudgetCard
            id="create-card"
            token={token}
            userId={userId}
            getCardList={this.getCardList}
            mainTitle="Créer une enveloppe"
          />
        </div>
      </div>
    )
  }
}

ManagingBudgetCard.propTypes = {
  userId: PropTypes.number,
  amountId: PropTypes.number,
  token: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    userId: state.auth.id,
    token: state.auth.token,
    amountId: state.auth.amountId,
  }
}

export default connect(mapStateToProps)(ManagingBudgetCard)
