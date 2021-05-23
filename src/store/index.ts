import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import orders, { OrderBookState } from './orders/reducers'

export interface RootState {
  orders: OrderBookState
}

export default createStore(
  combineReducers<RootState>({
    orders,
  }),
  applyMiddleware(thunk)
)
