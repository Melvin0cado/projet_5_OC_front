import PropTypes from 'prop-types'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Dashboard from './component/AuthPart/Dashboard/Dashboard'
import ManagingBudgetCard from './component/AuthPart/ManagingBudgetCard/ManagingBudgetCard'
import Page404 from './component/global/Page404'
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
            path="/managing/budgetCard"
            component={RequireAuth(ManagingBudgetCard, ROLE_USER)}
          />
          <Route component={RequireAuth(Page404, ROLE_USER)} />
        </Switch>
      </App>
    </BrowserRouter>
  )
}

Router.propTypes = {
  authenticated: PropTypes.bool,
}

export default Router
