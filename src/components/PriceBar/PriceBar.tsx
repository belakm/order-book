import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { OrderBookState } from '../../store/orders/reducers'
import styles from '../../style';
import { DateTime } from 'luxon'

const timestampToReadableDate = (timestamp?: number) => {
  if (timestamp) {
    const readableDate = DateTime.fromMillis(timestamp)
    return readableDate.toFormat('dd. mm. yyyy, HH:MM:ss')
  } else return 'n/a'
}

interface PriceBarProps {
  orders: OrderBookState
}

const PriceBar : FunctionComponent<PriceBarProps> = ({
  orders
}: PriceBarProps) => {
  const snapshots = orders.btceur.snapshots
  const bidPrice = snapshots.length > 0 ? snapshots[0].orders.bids[0].price : 'n/a'
  const askPrice = snapshots.length > 0 ? snapshots[0].orders.asks[0].price : 'n/a'
  const latestTimestampDate = snapshots.length > 0 ? snapshots[0].timestamp : undefined
  console.log(snapshots[0])

  return <View style={styles.statusBar}>
    <Text style={styles.text}>
      BTC/EUR - BID price: {bidPrice} - ASK price {askPrice} at {timestampToReadableDate(latestTimestampDate)}
    </Text>
  </View>
}

const mapStateToProps = (state: RootState) => {
  const { orders } = state
  return { orders }
};

export default connect(mapStateToProps)(PriceBar);