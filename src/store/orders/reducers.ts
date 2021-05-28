import { Reducer } from 'redux'

import { Action } from './actions'
import { parseOrders } from './helpers'

export const snapshotLimit = 100

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

export interface RawOrders {
  asks: [number, number][]
  bids: [number, number][]
}

export interface RawOrderBookSnapshot {
  timestamp: number
  orders: RawOrders
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

export const initialState: OrderBookState = {
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
        state.pairs[action.orderBookPair].length > 0
          ? state.pairs[action.orderBookPair][0].timestamp
          : 0
      if (!state.isListening || action.snapshot.timestamp - lastTimestamp < 500)
        return state
      else {
        return {
          ...state,
          pairs: {
            ...state.pairs,
            [action.orderBookPair]: [
              {
                ...action.snapshot,
                orders: {
                  asks: parseOrders(action.snapshot.orders.asks, false),
                  bids: parseOrders(
                    action.snapshot.orders.bids,
                    true
                  ).reverse(),
                },
              },
              ...state.pairs[action.orderBookPair],
            ].slice(0, snapshotLimit - 2),
          },
        }
      }
    case 'ORDER_BOOK_IS_LISTENING':
      return {
        ...state,
        isListening: action.isListening,
      }
    case 'CHOSEN_ORDER_BOOK':
      return {
        ...state,
        isListening:
          state.pairs[action.orderBookPair].length === 0
            ? true
            : state.isListening,
        snapshotIndex: 0,
        chosenPair: action.orderBookPair,
      }
    case 'SNAPSHOT_INDEX':
      return {
        ...state,
        snapshotIndex:
          action.index <= 0 || state.pairs[state.chosenPair].length === 0
            ? 0
            : action.index >= state.pairs[state.chosenPair].length
            ? state.pairs[state.chosenPair].length - 1
            : action.index,
      }
    // on init
    default:
      return state
  }
}

export default orderBook
