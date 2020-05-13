import JwtDecode from 'jwt-decode'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ACTION_TYPE_AUTH } from './actions/types'
import Router from './Router'
import * as serviceWorker from './serviceWorker'
import { store } from './store'

const token = localStorage.getItem('token')
if (token) {
  const user = JwtDecode(token)
  store.dispatch({
    type: ACTION_TYPE_AUTH.LOGIN,
    token: token,
    id: user.id,
    role: user.roles,
    username: user.username,
    email: user.email,
  })
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
