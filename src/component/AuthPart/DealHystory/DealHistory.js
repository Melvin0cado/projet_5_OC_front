import Axios from 'axios'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, configApi } from '../../../config/parameters'
import { catchErr } from '../../../globalAction/CatchErr'
import Loading from '../../global/Loading'
import DealHistoryView from './partials/DealHistoryView'

class DealHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    const { userId, token } = this.props

    Axios.get(`${api}/api/deal/by-userId/${userId}`, configApi(token))
      .then(res => {
        let deals = res.data
        deals.sort(function (a, b) {
          if (moment(a.createdAt).isBefore(moment(b.createdAt))) {
            return 1
          } else if (moment(a.createdAt).isAfter(moment(b.createdAt))) {
            return -1
          } else {
            return 0
          }
        })

        this.setState({ deals, loading: false })
      })
      .catch(err => catchErr(err.response))
  }

  render() {
    const { loading, deals } = this.state

    if (loading) {
      return <Loading size="big" />
    }

    return (
      <>
        <div>
          <DealHistoryView header />
          {deals.length > 0 ? (
            deals.map(deal => <DealHistoryView key={deal.id} deal={deal} />)
          ) : (
            <div className="col m12 l12 text-dark-blue">
              Aucun historique pour le moment
            </div>
          )}
        </div>
      </>
    )
  }
}

DealHistory.propTypes = {
  userId: PropTypes.number,
  token: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    userId: state.auth.id,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps)(DealHistory)
