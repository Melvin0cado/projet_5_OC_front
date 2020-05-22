import { ACTION_TYPE_AUTH } from '../actions/types'

const INITSTATE = {
  authenticated: false,
  role: [],
  username: '',
  email: '',
  token: '',
  amountId: {},
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
        amountId: action.amountId,
      }
    case ACTION_TYPE_AUTH.LOGOUT:
      return {
        ...state,
        authenticated: false,
        role: [],
        username: '',
        email: '',
        token: '',
        amountId: null,
      }
    default:
      break
  }
  return state
}
