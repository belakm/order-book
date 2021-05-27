import React from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { connect } from 'react-redux'

import { RootState } from '../../store'
import { OrderBookState } from '../../store/orders/reducers'
import styles, { colors } from '../../style'
import { timestampToReadableDate } from '../../utils/formatters'
import Chart from '../chart/Chart'
import SnapshotControls from './SnapshotControls'
import SnapshotPriceBar from './SnapshotPriceBar'

interface SnapshotProps {
  orderBook: OrderBookState
}

/**
 * A top component for display of an orderbook snapshot.
 */
const SnapshotViewer = ({ orderBook }: SnapshotProps) => {
  const currentSnapshot =
    orderBook.pairs[orderBook.chosenPair][orderBook.snapshotIndex]
  let bidPrice
  let askPrice
  if (currentSnapshot) {
    const { orders } = currentSnapshot
    bidPrice =
      orders.bids.length > 0
        ? orders.bids[orders.bids.length - 1].price
        : undefined
    askPrice = orders.asks.length > 0 ? orders.asks[0].price : undefined
  }
  return currentSnapshot ? (
    <View style={[styles.bodyBackground, styles.flexColumn]}>
      <SnapshotControls orderBook={orderBook} />
      <Chart pair={orderBook.chosenPair} snapshot={currentSnapshot} />
      <View style={[styles.marginBottom, styles.flexColumn, { zIndex: 1 }]}>
        <View style={styles.timeRow}>
          <Text style={[styles.textLight]}>at </Text>
          <Text style={[styles.text, { marginLeft: 6 }]}>
            {timestampToReadableDate(currentSnapshot.timestamp)}
          </Text>
        </View>
      </View>
      <SnapshotPriceBar bidPrice={bidPrice} askPrice={askPrice} />
    </View>
  ) : (
    <ActivityIndicator size="large" color={colors.loader} />
  )
}

const mapStateToProps = (state: RootState) => {
  const { orderBook } = state
  return { orderBook }
}

export default connect(mapStateToProps)(SnapshotViewer)
