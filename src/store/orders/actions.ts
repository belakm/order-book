import { OrderBookSnapshot, OrderBookPair } from './reducers'

// Action Definition
export interface AddOrderOrderBookSnapshot {
  type: 'ORDER_BOOK_SNAPSHOT'
  orderBookPair: OrderBookPair
  snapshot: OrderBookSnapshot
}
export interface SetOrderBookListening {
  type: 'ORDER_BOOK_IS_LISTENING'
  isListening: boolean
}
export interface SetOrderBookChosenBook {
  type: 'CHOSEN_ORDER_BOOK'
  orderBookPair: OrderBookPair
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
  orderBookPair,
  snapshot,
}: {
  orderBookPair: OrderBookPair
  snapshot: OrderBookSnapshot
}): AddOrderOrderBookSnapshot => ({
  type: 'ORDER_BOOK_SNAPSHOT',
  orderBookPair,
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

export const setChosenPair = ({
  orderBookPair,
}: {
  orderBookPair: OrderBookPair
}): SetOrderBookChosenBook => ({
  type: 'CHOSEN_ORDER_BOOK',
  orderBookPair,
})

export const setSnapshotIndex = ({
  index,
}: {
  index: number
}): SetSnapshotIndex => ({
  type: 'SNAPSHOT_INDEX',
  index,
})
