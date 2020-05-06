import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const NoAuthRoute = ({ component: Component, ...props }) => {
  const { authenticated } = props

  return (
    <Route
      {...props}
      render={props =>
        !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

NoAuthRoute.propTypes = {
  authenticated: PropTypes.bool,
  component: PropTypes.func,
  location: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.auth.authenticated,
    currentURL: ownProps.location.pathname,
  }
}

export default connect(mapStateToProps)(NoAuthRoute)
