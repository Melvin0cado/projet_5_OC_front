import { ACTION_TYPE_AUTH } from '../../../actions/types'
import { store } from '../../../store'

export const disconnect = () => {
  localStorage.removeItem('token')
  store.dispatch({
    type: ACTION_TYPE_AUTH.LOGOUT,
  })
}
