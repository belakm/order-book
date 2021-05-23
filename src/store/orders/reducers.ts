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

export type OrderBookPair = 'btcusd' | 'btceur'

export type OrderBookState = {
  isListening: boolean
  snapshotIndex: number
  chosenPair: OrderBookPair
  pairs: {
    [key in OrderBookPair]: BookSnapshot[]
  }
}

const initialState: OrderBookState = {
  isListening: true,
  snapshotIndex: 0,
  chosenPair: 'btceur',
  pairs: {
    btceur: [],
    btcusd: [],
  },
}

const orderBook: Reducer<OrderBookState, Action> = (
  state: OrderBookState = { ...initialState },
  action: Action
): OrderBookState => {
  switch (action.type) {
    case 'ORDER_BOOK_SNAPSHOT':
      return {
        ...state,
        pairs: {
          ...state.pairs,
          [action.orderBookType]: [
            action.snapshot,
            ...state.pairs[action.orderBookType],
          ].slice(0, snapshotLimit - 2),
        },
      }
    case 'ORDER_BOOK_IS_LISTENING':
      return {
        ...state,
        isListening: action.isListening,
      }
    case 'CHOSEN_ORDER_BOOK':
      return {
        ...state,
        chosenPair: action.orderBookType,
      }
    // on init
    default:
      return state
  }
}

export default orderBook
