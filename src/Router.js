import PropTypes from 'prop-types'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Dashboard from './component/AuthPart/Dashboard/Dashboard'
import LoginPage from './component/noAuthPart/loginPage/LoginPage'
import NoAuthRoute from './component/noAuthPart/NoAuthRoute'
import RequireAuth from './component/RequireAuth'
import { userRoles } from './config/userRoles'

const Router = () => {
  const { ROLE_USER } = userRoles

  return (
    <BrowserRouter>
      <App>
        <Switch>
          <NoAuthRoute exact path="/login" component={LoginPage} />
          <Route exact path="/" component={RequireAuth(Dashboard, ROLE_USER)} />
          <Route
            exact
            path="/test"
            component={RequireAuth(() => {
              return 'test'
            })}
          />
        </Switch>
      </App>
    </BrowserRouter>
  )
}

Router.propTypes = {
  authenticated: PropTypes.bool,
}

export default Router
