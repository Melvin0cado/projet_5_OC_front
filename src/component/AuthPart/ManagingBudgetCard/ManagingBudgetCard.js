import Axios from 'axios'
import { Modal } from 'materialize-css'
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
    this.getFavoriteRelation = this.getFavoriteRelation.bind(this)
  }

  componentDidMount() {
    this.getCardList()
  }

  getFavoriteRelation() {
    const { userId, token } = this.props

    Axios.get(
      `${api}/api/favorite-budget-card/by-userId/${userId}`,
      configApi(token)
    )
      .then(res => {
        const budgetCardsInFavoriteId = []
        const favoriteRelationList = []
        res.data.favoriteBudgetCards.forEach(favoriteCard => {
          budgetCardsInFavoriteId.push(favoriteCard.budgetCard.id)
          favoriteRelationList.push(favoriteCard)
        })

        this.setState({
          budgetCardsInFavoriteId,
          favoriteRelationList,
          favoriteBudgetCards: res.data.favoriteBudgetCards,
        })
      })
      .catch(err => catchErr(err.response))
  }

  getCardList() {
    const { userId, token } = this.props
    Axios.get(`${api}/api/budget-card-by-userId/${userId}`, configApi(token))
      .then(res => {
        this.getFavoriteRelation()
        this.setState(
          { budgetCards: res.data[0].budgetCards, loading: false },
          () => Modal.init(document.getElementById('create-card'))
        )
      })
      .catch(err => catchErr(err.response))
  }

  render() {
    const { token, userId, amountId } = this.props
    const {
      loading,
      budgetCards,
      budgetCardsInFavoriteId,
      favoriteBudgetCards,
      favoriteRelationList,
    } = this.state

    if (loading) {
      return <Loading size="big" />
    }

    return (
      <div className="row">
        <div className="row">
          <PlaceholderCard />
        </div>
        <div className="row">
          {budgetCardsInFavoriteId !== undefined ? (
            <>
              {budgetCards.map(budgetCard => (
                <Card
                  key={budgetCard.id}
                  budgetId={budgetCard.id}
                  id={`cardBoard${budgetCard.id}`}
                  token={token}
                  getCardList={this.getCardList}
                  favoriteBudgetCards={favoriteBudgetCards}
                  getFavoriteRelation={this.getFavoriteRelation}
                  favoriteRelationList={favoriteRelationList}
                  budgetCardsInFavoriteId={budgetCardsInFavoriteId}
                  userId={userId}
                  amountId={amountId}
                  budgetCard={budgetCard}
                  interaction
                />
              ))}
            </>
          ) : (
            <Loading />
          )}
          <ModalBudgetCard
            id="create-card"
            token={token}
            userId={userId}
            getCardList={this.getCardList}
            getFavoriteRelation={this.getFavoriteRelation}
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
