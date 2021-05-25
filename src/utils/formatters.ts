import { DateTime } from 'luxon'

import { OrderBookPair } from '../store/orders/reducers'

export const pairToReadable = (pair: OrderBookPair) => {
  return `${pair.slice(0, 3)} / ${pair.slice(3)}`.toUpperCase()
}

export const timestampToReadableDate = (timestamp?: number) => {
  if (timestamp) {
    const readableDate = DateTime.fromMillis(timestamp)
    return readableDate.toFormat('dd. MM. yyyy, HH:mm:ss')
  } else return 'n/a'
}
