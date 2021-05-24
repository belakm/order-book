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

export interface OrderBookSnapshot {
  timestamp: number
  orders: Orders
}

export type OrderBookPair = 'btcusd' | 'btceur'

export type OrderBookState = {
  isListening: boolean
  snapshotIndex: number
  chosenPair: OrderBookPair
  pairs: {
    [key in OrderBookPair]: OrderBookSnapshot[]
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
  let lastTimestamp
  switch (action.type) {
    case 'ORDER_BOOK_SNAPSHOT':
      lastTimestamp =
        state.pairs[action.orderBookType].length > 0
          ? state.pairs[action.orderBookType][0].timestamp
          : 0
      if (action.snapshot.timestamp - lastTimestamp < 500) return state
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
    case 'SNAPSHOT_INDEX':
      return {
        ...state,
        snapshotIndex: action.index,
      }
    // on init
    default:
      return state
  }
}

export default orderBook
