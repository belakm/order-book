import { DateTime } from 'luxon'

import { OrderBookPair } from '../store/orders/reducers'

export const pairToReadable = (pair: OrderBookPair) => {
  return `${pair.slice(0, 3)} / ${pair.slice(3)}`.toUpperCase()
}

export const timestampToReadableDate = (timestamp?: number): string => {
  if (timestamp != null) {
    const readableDate = DateTime.fromMillis(timestamp)
    return readableDate.toFormat('dd. MM. yyyy, HH:mm:ss')
  } else return 'n/a'
}

export const toReadablePriceNumber = (price?: number) => {
  return price
    ? price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    : 'n/a'
}
