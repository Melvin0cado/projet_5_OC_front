import { ACTION_TYPE_AUTH } from '../actions/types'

const INITSTATE = {
  authenticated: false,
  role: [],
  username: '',
  email: '',
  token: '',
}

export default (state = INITSTATE, action) => {
  switch (action.type) {
    case ACTION_TYPE_AUTH.LOGIN:
      return {
        ...state,
        authenticated: true,
        role: action.role,
        username: action.username,
        email: action.email,
        token: action.token,
      }
    default:
      break
  }
  return state
}
