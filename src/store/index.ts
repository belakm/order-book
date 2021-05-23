import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import orderBook, { OrderBookState } from './orders/reducers'

export interface RootState {
  orderBook: OrderBookState
}

export default createStore(
  combineReducers<RootState>({
    orderBook,
  }),
  applyMiddleware(thunk)
)
