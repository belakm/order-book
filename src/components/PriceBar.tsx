import { DateTime } from 'luxon'
import React, { FunctionComponent, useContext } from 'react'
import { Text, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { setChosenPair } from '../store/orders/actions'
import { OrderBookPair, OrderBookSnapshot } from '../store/orders/reducers'
import styles from '../style'
import Dropdown from './Dropdown'

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

const pairOptions: { key: OrderBookPair; text: string }[] = [
  {
    key: 'btceur',
    text: pairToReadable('btceur'),
  },
  {
    key: 'btcusd',
    text: pairToReadable('btcusd'),
  },
]

const PriceBar: FunctionComponent<PriceBarProps> = ({
  snapshot,
  pair,
}: PriceBarProps) => {
  const dispatch = useDispatch()
  const { timestamp, orders } = snapshot
  const bidPrice =
    orders.bids.length > 0
      ? orders.bids[orders.bids.length - 1].price.toFixed(2)
      : 'n/a'
  const askPrice =
    orders.asks.length > 0 ? orders.asks[0].price.toFixed(2) : 'n/a'

  const changePair = (pair: OrderBookPair) =>
    dispatch(setChosenPair({ orderBookPair: pair }))

  return (
    <View
      style={[
        styles.flexColumn,
        styles.appColors,
        styles.marginBottom,
        { zIndex: 1 },
      ]}
    >
      <View style={[styles.marginBottom, styles.flexRow, { zIndex: 1 }]}>
        <Dropdown
          initialValue={pair}
          options={pairOptions}
          onChange={changePair}
        />
        <Text style={[styles.textLight, { marginLeft: 12 }]}>at</Text>
        <Text style={[styles.text, styles.flexGrow, { marginLeft: 6 }]}>
          {timestampToReadableDate(timestamp)}
        </Text>
      </View>
      <View style={[styles.flexRow, styles.flexRow]}>
        <View style={[styles.flexRow]}>
          <Text style={styles.textLight}>bid: </Text>
          <Text
            style={[
              styles.priceBoxDetail,
              styles.priceBoxDetailBid,
              styles.materialPadding,
            ]}
          >
            {bidPrice}
          </Text>
        </View>
        <View style={[styles.flexRow, { marginLeft: 12 }]}>
          <Text style={styles.textLight}>ask: </Text>
          <Text
            style={[
              styles.priceBoxDetail,
              styles.priceBoxDetailAsk,
              styles.materialPadding,
            ]}
          >
            {askPrice}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default PriceBar
