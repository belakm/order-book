import { Reducer } from 'redux'

import { Action } from './actions'

const snapshotLimit = 100

export interface Order {
  volume: number
  price: number
  sum: number
}

export interface Orders {
  asks: Order[]
  bids: Order[]
}

export interface BookSnapshot {
  timestamp: number
  orders: Orders
}

export interface OrderBook {
  isFetching: boolean
  snapshots: BookSnapshot[]
}

export type OrderBookType = 'btcusd' | 'btceur'

export type OrderBookState = {
  [key in OrderBookType]: OrderBook
}

const emptyBook: OrderBook = {
  isFetching: false,
  snapshots: [],
}

const initialState: OrderBookState = {
  btceur: { ...emptyBook },
  btcusd: { ...emptyBook },
}

const ordersReducer: Reducer<OrderBookState, Action> = (
  state: OrderBookState = { ...initialState },
  action: Action
): OrderBookState => {
  const { orderBookType } = action
  switch (action.type) {
    case 'ADD_ORDER_BOOK_SNAPSHOT':
      return {
        ...state,
        [orderBookType]: {
          ...state[orderBookType],
          snapshots: [action.snapshot, ...state[orderBookType].snapshots].slice(
            0,
            snapshotLimit - 2
          ),
        },
      }
    case 'SET_ORDER_BOOK_FETCHING':
      return {
        ...state,
        [orderBookType]: {
          ...state[orderBookType],
          isFetching: action.isFetching,
        },
      }
    // on init
    default:
      return state
  }
}

export default ordersReducer
