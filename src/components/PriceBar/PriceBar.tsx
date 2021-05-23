import { DateTime } from 'luxon'
import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import { RootState } from '../../store'
import { OrderBookState } from '../../store/orders/reducers'
import styles from '../../style'

const timestampToReadableDate = (timestamp?: number) => {
  if (timestamp) {
    const readableDate = DateTime.fromMillis(timestamp)
    return readableDate.toFormat('dd. mm. yyyy, HH:MM:ss')
  } else return 'n/a'
}

interface PriceBarProps {
  orders: OrderBookState
}

const PriceBar: FunctionComponent<PriceBarProps> = ({
  orders,
}: PriceBarProps) => {
  const snapshots = orders.btceur.snapshots
  const bidPrice =
    snapshots.length > 0 ? snapshots[0].orders.bids[0].price : 'n/a'
  const askPrice =
    snapshots.length > 0 ? snapshots[0].orders.asks[0].price : 'n/a'
  const latestTimestampDate =
    snapshots.length > 0 ? snapshots[0].timestamp : undefined

  return (
    <View style={styles.statusBar}>
      <Text style={styles.textFullWidth}>
        BTC/EUR | bid: {bidPrice} | ask: {askPrice}
      </Text>
      <Text style={styles.textFullWidth}>
        {timestampToReadableDate(latestTimestampDate)}
      </Text>
    </View>
  )
}

const mapStateToProps = (state: RootState) => {
  const { orders } = state
  return { orders }
}

export default connect(mapStateToProps)(PriceBar)
