import { OrderBookSnapshot, OrderBookState } from '../src/store/orders/reducers'

export const mockSnapshot = (timestamp: number): OrderBookSnapshot => ({
  timestamp,
  orders: {
    asks: [
      {
        volume: 1,
        price: 1,
        sum: 1,
      },
    ],
    bids: [
      {
        volume: 1,
        price: 1,
        sum: 1,
      },
    ],
  },
})

export const mockOrderBook: OrderBookState = {
  isListening: true,
  snapshotIndex: 0,
  chosenPair: 'btceur',
  pairs: {
    btceur: [
      {
        ...mockSnapshot(new Date().getTime() + 1000),
      },
      {
        ...mockSnapshot(new Date().getTime() + 2000),
      },
      {
        ...mockSnapshot(new Date().getTime() + 3000),
      },
    ],
    btcusd: [
      {
        ...mockSnapshot(new Date().getTime() + 1000),
      },
      {
        ...mockSnapshot(new Date().getTime() + 2000),
      },
      {
        ...mockSnapshot(new Date().getTime() + 3000),
      },
    ],
  },
}
