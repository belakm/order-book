import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import styles from '../../style'

interface SnapshotPriceBarProps {
  bidPrice: number | string
  askPrice: number | string
}

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
          <Text style={styles.textLight}>A: </Text>
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

export default SnapshotPriceBar
