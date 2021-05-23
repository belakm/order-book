import { DateTime } from 'luxon'
import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { OrderBookPair, OrderBookSnapshot } from '../store/orders/reducers'
import styles from '../style'

const timestampToReadableDate = (timestamp?: number) => {
  if (timestamp) {
    const readableDate = DateTime.fromMillis(timestamp)
    return readableDate.toFormat('dd. MM. yyyy, HH:mm:ss')
  } else return 'n/a'
}

const pairToReadable = (pair: OrderBookPair) => {
  return `${pair.slice(0, 3)} / ${pair.slice(3)}`.toUpperCase()
}

interface PriceBarProps {
  snapshot: OrderBookSnapshot
  pair: OrderBookPair
}

const PriceBar: FunctionComponent<PriceBarProps> = ({
  snapshot,
  pair,
}: PriceBarProps) => {
  const { timestamp, orders } = snapshot
  const bidPrice =
    orders.bids.length > 0 ? orders.bids[orders.bids.length - 1].price : 'n/a'
  const askPrice = orders.asks.length > 0 ? orders.asks[0].price : 'n/a'

  return (
    <View style={[styles.flexColumn, styles.appColors]}>
      <Text style={[styles.marginBottom, styles.text]}>
        {pairToReadable(pair)} at {timestampToReadableDate(timestamp)}
      </Text>
      <View style={[styles.flexRow, styles.appColors, styles.flexRow]}>
        <View style={[styles.priceBox, styles.appColors, styles.flexRow]}>
          <Text style={styles.text}>bid: </Text>
          <Text style={[styles.priceBoxDetail, styles.priceBoxDetailBid]}>
            {bidPrice}
          </Text>
        </View>
        <View style={[styles.priceBox, styles.appColors, styles.flexRow]}>
          <Text style={styles.text}>ask: </Text>
          <Text style={[styles.priceBoxDetail, styles.priceBoxDetailAsk]}>
            {askPrice}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default PriceBar
