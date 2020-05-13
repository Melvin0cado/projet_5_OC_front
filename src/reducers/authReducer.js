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
        id: action.id,
        username: action.username,
        email: action.email,
        token: action.token,
      }
    case ACTION_TYPE_AUTH.LOGOUT:
      return {
        ...state,
        authenticated: false,
        role: [],
        username: '',
        email: '',
        token: '',
      }
    default:
      break
  }
  return state
}
