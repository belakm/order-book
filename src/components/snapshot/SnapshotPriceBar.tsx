import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import styles from '../../style'
import { toReadablePriceNumber } from '../../utils/formatters'

interface SnapshotPriceBarProps {
  bidPrice?: number
  askPrice?: number
}

/**
 * A simple UI element to show the last bid and ask price based on the
 * selected orderbook snapshot in the store.
 */
const SnapshotPriceBar: FunctionComponent<SnapshotPriceBarProps> = ({
  bidPrice,
  askPrice,
}: SnapshotPriceBarProps) => {
  return (
    <View
      style={[
        styles.flexColumn,
        styles.bodyBackground,
        styles.marginBottom,
        { zIndex: 1 },
      ]}
    >
      <View style={[styles.flexRow, styles.flexRow]}>
        <View style={[styles.flexRow]}>
          <Text style={styles.textLight}>B: </Text>
          <Text
            testID="bid_price"
            style={[styles.priceBoxDetail, styles.priceBoxDetailBid]}
          >
            {toReadablePriceNumber(bidPrice)}
          </Text>
        </View>
        <View style={[styles.flexRow, { marginLeft: 12 }]}>
          <Text style={styles.textLight}>A: </Text>
          <Text
            testID="ask_price"
            style={[styles.priceBoxDetail, styles.priceBoxDetailAsk]}
          >
            {toReadablePriceNumber(askPrice)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SnapshotPriceBar
