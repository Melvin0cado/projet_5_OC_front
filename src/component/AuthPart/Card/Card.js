import Axios from 'axios'
import { Tooltip } from 'materialize-css'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { api, configApi } from '../../../config/parameters'
import { catchErr } from '../../../globalAction/CatchErr'
import { SuccesSwal } from '../../../globalAction/swal'
import Loading from '../../global/Loading'
import ModalBudgetCard from '../ManagingBudgetCard/partials/ModalBudgetCard'
import ModalToManageMoney from '../UserInterface/partials/MainHeader/partials/ModalToManageMoney'
import CustomChart from './partials/CustomChart'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.addFavoriteButton = this.addFavoriteButton.bind(this)
  }

  componentDidMount() {
    this.addFavoriteButton()
  }

  componentDidUpdate(prevProps) {
    const { budgetCardsInFavoriteId, id } = this.props
    const { loading } = this.state

    if (prevProps.budgetCardsInFavoriteId !== budgetCardsInFavoriteId) {
      this.addFavoriteButton()
    }

    if (loading === false) {
      const tooltip = document.getElementById(`dateToolTip${id}`)
      Tooltip.init(tooltip)
    }
  }

  addFavoriteButton() {
    const {
      budgetCardsInFavoriteId,
      favoriteRelationList,
      interaction,
      budgetId,
      id,
    } = this.props

    const tooltip = document.getElementById(`dateToolTip${id}`)
    Tooltip.init(tooltip)

    if (interaction === true && budgetCardsInFavoriteId.includes(budgetId)) {
      const findIdx = budgetCardsInFavoriteId.indexOf(budgetId)
      const favorite = favoriteRelationList[findIdx]

      this.setState({
        isFavorite: favorite.isFavorite,
        favoriteRelationId: favorite.id,
        loading: false,
      })
    }

    if (interaction === false) {
      this.setState({ loading: false })
    }
  }

  CalculeTimeOut(time) {
    const timeOut = moment().to(time)

    return timeOut
  }

  traslateDate(time) {
    const splitTime = time.split(' ')
    let timeFr = ''

    splitTime.forEach((text, index) => {
      if (text === 'in') {
        splitTime[index] = 'dans'
      } else if (text === 'a') {
        splitTime[index] = '1'
      } else if (text === 'days') {
        splitTime[index] = 'jours'
      } else if (text === 'day') {
        splitTime[index] = 'jour'
      } else if (text === 'days') {
        splitTime[index] = 'jours'
      } else if (text === 'years') {
        splitTime[index] = 'années'
      } else if (text === 'year') {
        splitTime[index] = 'année'
      } else if (text === 'months' || text === 'month') {
        splitTime[index] = 'mois'
      } else if (text === 'hours') {
        splitTime[index] = 'heures'
      } else if (text === 'hour') {
        splitTime[index] = 'heure'
      }
      timeFr += splitTime[index] + ' '
    })

    return timeFr
  }

  handleDelete() {
    const { token, getCardList, getFavoriteRelation, budgetId } = this.props

    Axios.delete(`${api}/api/budget-card/${budgetId}`, configApi(token))
      .then(() => {
        getCardList()
        getFavoriteRelation()
        SuccesSwal('La suppression est réussi', null)
      })
      .catch(err => catchErr(err.response))
  }

  handleFavorite() {
    const { isFavorite, favoriteRelationId } = this.state
    const { token } = this.props

    this.setState({ isFavorite: !isFavorite }, () => {
      const data = { isFavorite: !isFavorite }
      Axios.patch(
        `${api}/api/favorite-budget-card/${favoriteRelationId}`,
        data,
        configApi(token)
      )
        .then()
        .catch(err => catchErr(err.response))
    })
  }

  render() {
    const {
      budgetCard,
      amountId,
      token,
      getCardList,
      userId,
      interaction,
      id,
    } = this.props
    const { loading } = this.state

    if (loading === true) {
      return <Loading />
    }

    const { title, limitDate } = budgetCard
    const { isFavorite } = this.state

    const TimeOut = this.traslateDate(this.CalculeTimeOut(limitDate))

    return (
      <>
        <div className="col m4 l3">
          <div className="budget-card card">
            <div className="full-width row text-center">
              <div className="col m12 l12">
                <div>
                  <span className="bold title-size text-dark-blue2">
                    {title}
                  </span>
                  {interaction && (
                    <>
                      <div
                        className="favorite-btn bold title-size text-dark-blue2"
                        onClick={this.handleFavorite}
                      >
                        {isFavorite !== undefined ? (
                          <i className="material-icons rounded">
                            {isFavorite === true ? 'star' : 'star_border'}
                          </i>
                        ) : (
                          <Loading size="small" />
                        )}
                      </div>
                      <div
                        className="trash-can bold title-size text-dark-blue2"
                        onClick={this.handleDelete}
                      >
                        <i className="material-icons rounded">delete</i>
                      </div>
                      <div className="edit-btn bold title-size text-dark-blue2">
                        <i
                          data-target={`edit${id}`}
                          className="material-icons rounded modal-trigger"
                        >
                          edit
                        </i>
                      </div>
                      <div className="add-money bold title-size text-dark-blue2">
                        <i
                          data-target={`add-money${id}`}
                          className="material-icons rounded modal-trigger"
                        >
                          add
                        </i>
                      </div>
                      <div className="remove-money bold title-size text-dark-blue2">
                        <i
                          data-target={`remove-money${id}`}
                          className="material-icons modal-trigger"
                        >
                          remove
                        </i>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-center">
                  <span className="sub-title">se termine {TimeOut}</span>
                  <i
                    id={`dateToolTip${id}`}
                    className="material-icons dateToolTip tooltipped text-dark-blue3 margin-l5"
                    data-position="bottom"
                    data-tooltip={moment(budgetCard.limitDate).format(
                      'DD/MM/YYYY'
                    )}
                  >
                    info
                  </i>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m12 l12">
                <CustomChart cardId={id} budgetCard={budgetCard} />
              </div>
            </div>
          </div>
        </div>
        <ModalBudgetCard
          id={`edit${id}`}
          edit
          getCardList={getCardList}
          budgetCard={budgetCard}
          userId={userId}
          mainTitle="Modifier l'enveloppe"
          token={token}
        />
        <ModalToManageMoney
          token={token}
          type={0}
          getCardList={getCardList}
          mainTitle={`Ajouter de l'argent dans l'enveloppe ${budgetCard.title}`}
          userId={userId}
          id={`add-money${id}`}
          budgetCard={budgetCard}
          amountId={amountId}
        />
        <ModalToManageMoney
          token={token}
          type={1}
          getCardList={getCardList}
          mainTitle={`Soustraire de l'argent dans l'enveloppe ${budgetCard.title}`}
          userId={userId}
          id={`remove-money${id}`}
          budgetCard={budgetCard}
          amountId={amountId}
        />
      </>
    )
  }
}

Card.propTypes = {
  budgetCard: PropTypes.object,
  token: PropTypes.string,
  id: PropTypes.string,
  amountId: PropTypes.number,
  getCardList: PropTypes.func,
  getFavoriteRelation: PropTypes.func,
  userId: PropTypes.number,
  budgetCardsInFavoriteId: PropTypes.array,
  favoriteBudgetCards: PropTypes.array,
  favoriteRelationList: PropTypes.array,
  interaction: PropTypes.bool,
  budgetId: PropTypes.number,
}

export default Card
