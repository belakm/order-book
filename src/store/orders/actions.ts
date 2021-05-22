import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { BookSnapshot, OrderBookType } from './reducers'
import fetchOrders from '../../api/fetchOrders'

// Action Definition
export interface AddOrderBookSnapshot {
  type: 'ADD_ORDER_BOOK_SNAPSHOT'
  orderBookType: OrderBookType
  snapshot: BookSnapshot
}
export interface SetOrderBookFetching {
  type: 'SET_ORDER_BOOK_FETCHING'
  orderBookType: OrderBookType
  isFetching: boolean
}

// Union Action Types
export type Action = AddOrderBookSnapshot | SetOrderBookFetching

// Action Creators
export const addOrderBookSnapshot = ({
  orderBookType,
  snapshot
}: { 
  orderBookType: OrderBookType
  snapshot: BookSnapshot 
}): AddOrderBookSnapshot => ({ type: 'ADD_ORDER_BOOK_SNAPSHOT', orderBookType, snapshot })

export const setOrderBookIsFetching = ({
  orderBookType,
  isFetching
}: { 
  orderBookType: OrderBookType
  isFetching: boolean
}): SetOrderBookFetching => ({ type: 'SET_ORDER_BOOK_FETCHING', orderBookType, isFetching })

// Actions
export const fetchLatestOrders = (orderBookType: OrderBookType): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
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