import { combineReducers } from 'redux'
import amountReducer from './amountReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  amount: amountReducer,
})

export default rootReducer
