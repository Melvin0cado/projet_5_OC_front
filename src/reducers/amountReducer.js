import { ACTION_TYPE_AMOUNT_MONEY } from '../actions/types'

const INITSTATE = {
  money: 0,
}

export default (state = INITSTATE, action) => {
  switch (action.type) {
    case ACTION_TYPE_AMOUNT_MONEY.UPDATE_MONEY:
      return {
        ...state,
        money: action.money,
      }
    default:
      break
  }
  return state
}
