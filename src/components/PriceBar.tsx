import { DateTime } from 'luxon'
import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { OrderBookSnapshot, OrderBookState } from '../store/orders/reducers'
import styles from '../style'

const timestampToReadableDate = (timestamp?: number) => {
  if (timestamp) {
    const readableDate = DateTime.fromMillis(timestamp)
    return readableDate.toFormat('dd. mm. yyyy, HH:MM:ss')
  } else return 'n/a'
}

interface PriceBarProps {
  snapshot: OrderBookSnapshot
}

const PriceBar: FunctionComponent<PriceBarProps> = ({
  snapshot,
}: PriceBarProps) => {
  const { timestamp, orders } = snapshot
  const bidPrice = orders.bids.length > 0 ? orders.bids[0].price : 'n/a'
  const askPrice = orders.asks.length > 0 ? orders.asks[0].price : 'n/a'

  return (
    <View style={styles.priceBar}>
      <Text style={styles.textFullWidth}>
        BTC/EUR | bid: {bidPrice} | ask: {askPrice}
      </Text>
      <Text style={styles.textFullWidth}>
        {timestampToReadableDate(timestamp)}
      </Text>
    </View>
  )
}

export default PriceBar
