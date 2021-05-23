import { BookSnapshot, OrderBookPair } from './reducers'

// Action Definition
export interface AddOrderBookSnapshot {
  type: 'ORDER_BOOK_SNAPSHOT'
  orderBookType: OrderBookPair
  snapshot: BookSnapshot
}
export interface SetOrderBookListening {
  type: 'ORDER_BOOK_IS_LISTENING'
  isListening: boolean
}
export interface SetOrderBookChosenBook {
  type: 'CHOSEN_ORDER_BOOK'
  orderBookType: OrderBookPair
}

// Union Action Types
export type Action =
  | AddOrderBookSnapshot
  | SetOrderBookListening
  | SetOrderBookChosenBook

// Action Creators
export const addOrderBookSnapshot = ({
  orderBookType,
  snapshot,
}: {
  orderBookType: OrderBookPair
  snapshot: BookSnapshot
}): AddOrderBookSnapshot => ({
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

/* // Actions
export const fetchLatestOrders = (
  orderBookType: OrderBookPair
): ThunkAction<Promise<void>, object, object, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<object, object, AnyAction>
  ): Promise<void> => {
    dispatch(setOrderBookIsFetching({ orderBookType, isFetching: true }))
    try {
      const snapshot = await fetchOrders(orderBookType)
      dispatch(setOrderBookIsFetching({ orderBookType, isFetching: false }))
      dispatch(addOrderBookSnapshot({ orderBookType, snapshot }))
    } catch (e) {
      // TODO: dispatch error
    }
  }
}
 */
