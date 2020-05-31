import Axios from 'axios'
import M from 'materialize-css'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, configApi } from '../../../config/parameters'
import { catchErr } from '../../../globalAction/CatchErr'
import Loading from '../../global/Loading'
import Card from '../Card/Card'
import InformationCard from './partials/InformationCard'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      favoriteLoading: true,
    }
    this.getCardList = this.getCardList.bind(this)
    this.getFavoriteRelation = this.getFavoriteRelation.bind(this)
  }

  componentDidMount() {
    this.getCardList()
    this.getFavoriteRelation()
  }

  getCardList() {
    const { userId, token } = this.props

    Axios.get(`${api}/api/budget-card-by-userId/${userId}`, configApi(token))
      .then(res => {
        const { budgetCards } = res.data[0]
        let currentMoneyTotal = 0
        let ceilTotal = 0

        const budgetCardSortedByLimitDate = []

        budgetCards.sort(function (a, b) {
          if (moment(a.limitDate).isBefore(moment(b.limitDate))) {
            return -1
          } else if (moment(a.limitDate).isAfter(moment(b.limitDate))) {
            return 1
          } else {
            return 0
          }
        })

        budgetCards.forEach(budgetCard => {
          currentMoneyTotal += budgetCard.currentMoney
          ceilTotal += budgetCard.ceil
          budgetCardSortedByLimitDate.push(budgetCard)
        })

        const budgetCardSortedByProgression = []

        budgetCards.sort(function (a, b) {
          if (
            Math.round((a.currentMoney / a.ceil) * 100) >
            Math.round((b.currentMoney / b.ceil) * 100)
          ) {
            return -1
          } else if (
            Math.round((a.currentMoney / a.ceil) * 100) <
            Math.round((b.currentMoney / b.ceil) * 100)
          ) {
            return 1
          } else {
            return 0
          }
        })

        budgetCards.forEach(budgetCard => {
          budgetCardSortedByProgression.push(budgetCard)
        })

        let progressionTotal = Math.round((currentMoneyTotal / ceilTotal) * 100)

        if (Number.isNaN(progressionTotal)) {
          progressionTotal = 0
        }

        this.setState(
          {
            budgetCardsNumber: res.data[0].budgetCards.length,
            budgetCardSortedByLimitDate,
            budgetCardSortedByProgression,
            progressionTotal,
            currentMoneyTotal,
            ceilTotal,
            loading: false,
          },
          () => M.Modal.init(document.getElementById('create-card'))
        )
      })
      .catch(err => catchErr(err.response))
  }

  getFavoriteRelation() {
    const { userId, token } = this.props
    Axios.get(
      `${api}/api/favorite-budget-card/by-userId/${userId}`,
      configApi(token)
    )
      .then(res => {
        const favoriteList = []
        res.data.favoriteBudgetCards.forEach(favoriteCard => {
          if (favoriteCard.isFavorite) {
            favoriteList.push(favoriteCard)
          }
        })

        this.setState({
          favoriteList,
          favoriteBudgetCards: res.data.favoriteBudgetCards,
          favoriteLoading: false,
        })
      })
      .catch(err => catchErr(err.response))
  }

  render() {
    const {
      loading,
      budgetCardsNumber,
      budgetCardSortedByLimitDate,
      budgetCardSortedByProgression,
      progressionTotal,
      currentMoneyTotal,
      ceilTotal,
      favoriteLoading,
      favoriteList,
    } = this.state

    if (loading === true || favoriteLoading === true) {
      return <Loading size="big" />
    }

    return (
      <>
        <div className="row flex align-stretch">
          <InformationCard
            title="Nombre d'enveloppes"
            content={budgetCardsNumber}
          />
          <InformationCard
            title="Argent total distribué"
            content={`${currentMoneyTotal}€`}
          />
          <InformationCard title="Reste total" content={`${ceilTotal}€`} />
          <InformationCard
            title="Progression total"
            content={`${progressionTotal}%`}
          />
        </div>
        <div className="row">
          <div className="row">
            <div className="col m12 l12 title-size text-dark-blue3 bold-litgh">
              Mes enveloppes favorites
            </div>
          </div>
          <div className="row">
            {favoriteList.length > 0 ? (
              favoriteList.map(favoriteCard => (
                <Card
                  key={favoriteCard.budgetCard.id}
                  budgetId={favoriteCard.budgetCard.id}
                  id={`favorite${favoriteCard.budgetCard.id}`}
                  budgetCard={favoriteCard.budgetCard}
                  interaction={false}
                />
              ))
            ) : (
              <div className="col m12 l12 text-dark-blue">
                Mettez des enveloppes dans les favoris pour les afficher ici.
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="row">
            <div className="col m12 l12 title-size text-dark-blue3 bold-litgh">
              {"Les enveloppes triés par date d'expiration"}
            </div>
          </div>
          <div className="row">
            {budgetCardSortedByLimitDate.length > 0 ? (
              budgetCardSortedByLimitDate.map(
                (budgetCard, index) =>
                  index < 4 && (
                    <Card
                      key={budgetCard.id}
                      budgetId={budgetCard.id}
                      id={`perDate${budgetCard.id}`}
                      budgetCard={budgetCard}
                      interaction={false}
                    />
                  )
              )
            ) : (
              <div className="col m12 l12 text-dark-blue">
                Créez des enveloppes pour les afficher ici.
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="row">
            <div className="col m12 l12 title-size text-dark-blue3 bold-litgh">
              Les enveloppes triés par progression
            </div>
          </div>
          <div className="row">
            {budgetCardSortedByProgression.length > 0 ? (
              budgetCardSortedByProgression.map(
                (budgetCard, index) =>
                  index < 4 && (
                    <Card
                      key={budgetCard.id}
                      budgetId={budgetCard.id}
                      id={`perProgression${budgetCard.id}`}
                      budgetCard={budgetCard}
                      interaction={false}
                    />
                  )
              )
            ) : (
              <div className="col m12 l12 text-dark-blue">
                Créez des enveloppes pour les afficher ici.
              </div>
            )}
          </div>
        </div>
      </>
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
