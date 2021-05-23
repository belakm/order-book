import { OrderBookSnapshot, OrderBookPair } from './reducers'

// Action Definition
export interface AddOrderOrderBookSnapshot {
  type: 'ORDER_BOOK_SNAPSHOT'
  orderBookType: OrderBookPair
  snapshot: OrderBookSnapshot
}
export interface SetOrderBookListening {
  type: 'ORDER_BOOK_IS_LISTENING'
  isListening: boolean
}
export interface SetOrderBookChosenBook {
  type: 'CHOSEN_ORDER_BOOK'
  orderBookType: OrderBookPair
}
export interface SetSnapshotIndex {
  type: 'SNAPSHOT_INDEX'
  index: number
}

// Union Action Types
export type Action =
  | AddOrderOrderBookSnapshot
  | SetOrderBookListening
  | SetOrderBookChosenBook
  | SetSnapshotIndex

// Action Creators
export const addOrderOrderBookSnapshot = ({
  orderBookType,
  snapshot,
}: {
  orderBookType: OrderBookPair
  snapshot: OrderBookSnapshot
}): AddOrderOrderBookSnapshot => ({
  type: 'ORDER_BOOK_SNAPSHOT',
  orderBookType,
  snapshot,
})

export const setOrderBookIsListening = ({
  isListening,
}: {
  isListening: boolean
}): SetOrderBookListening => ({
  type: 'ORDER_BOOK_IS_LISTENING',
  isListening,
})

export const setChosenOrderBook = ({
  orderBookType,
}: {
  orderBookType: OrderBookPair
}): SetOrderBookChosenBook => ({
  type: 'CHOSEN_ORDER_BOOK',
  orderBookType,
})

export const setSnapshotIndex = ({
  index,
}: {
  index: number
}): SetSnapshotIndex => ({
  type: 'SNAPSHOT_INDEX',
  index,
})
