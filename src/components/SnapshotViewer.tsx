import React from 'react'
import { ActivityIndicator, Button, View } from 'react-native'
import { connect } from 'react-redux'

import { RootState } from '../store'
import { OrderBookState } from '../store/orders/reducers'
import styles, { colors } from '../style'
import Chart from './Chart'
import PriceBar from './PriceBar'
import SnapshotControls from './SnapshotControls'

export interface SnapshotProps {
  orderBook: OrderBookState
}

const SnapshotViewer = ({ orderBook }: SnapshotProps) => {
  const currentSnapshot =
    orderBook.pairs[orderBook.chosenPair][orderBook.snapshotIndex]
  return currentSnapshot ? (
    <View style={[styles.appColors, styles.flexColumn]}>
      <Chart pair={orderBook.chosenPair} snapshot={currentSnapshot} />
      <SnapshotControls orderBook={orderBook} />
      <PriceBar pair={orderBook.chosenPair} snapshot={currentSnapshot} />
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
