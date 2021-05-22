import { createStore, combineReducers, applyMiddleware, DeepPartial } from 'redux'
import orders, { OrderBookState } from './orders/reducers'
import thunk from 'redux-thunk'

export interface RootState {
  orders: OrderBookState
}

console.log(orders)

export default createStore(combineReducers<RootState>({
  orders
}), applyMiddleware(thunk))