import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const createStoreWithMiddleWare = applyMiddleware(thunk, logger)(createStore)

export const store = createStoreWithMiddleWare(rootReducer)
