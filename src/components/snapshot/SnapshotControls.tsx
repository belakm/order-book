import React, { useContext } from 'react'
import { Button, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { ApiContext } from '../../contexts/ApiContext'
import {
  setOrderBookIsListening,
  setSnapshotIndex,
} from '../../store/orders/actions'
import { OrderBookState } from '../../store/orders/reducers'
import styles from '../../style'

interface SnapshotControlsProps {
  orderBook: OrderBookState
}

/**
 * Can pause adding new orderbook snapshot entries into store
 * as well as changing which one is displayed in the UI.
 */
const SnapshotControls = ({ orderBook }: SnapshotControlsProps) => {
  const dispatch = useDispatch()
  const apiContext = useContext(ApiContext)
  return (
    <View
      style={[
        styles.bodyBackground,
        styles.flexRow,
        styles.flexAlignCenter,
        styles.fullWidth,
        styles.marginBottom,
      ]}
    >
      <View style={[styles.snapshotControl]}>
        <Button
          testID="previous_snapshot"
          color="white"
          disabled={
            orderBook.isListening ||
            orderBook.snapshotIndex >=
              orderBook.pairs[orderBook.chosenPair].length - 1
          }
          onPress={() =>
            dispatch(setSnapshotIndex({ index: orderBook.snapshotIndex + 1 }))
          }
          title="<<"
        />
      </View>
      <View style={[styles.flexGrow, styles.marginHorizontal]}>
        <Button
          testID="snapshot_pause"
          color="white"
          onPress={() => {
            if (!orderBook.isListening) {
              dispatch(setSnapshotIndex({ index: 0 }))
            }
            apiContext.setIsListening(!orderBook.isListening)
            dispatch(
              setOrderBookIsListening({ isListening: !orderBook.isListening })
            )
          }}
          title={orderBook.isListening ? 'Pause' : 'Unpause'}
        />
      </View>
      <View style={[styles.snapshotControl]}>
        <Button
          testID="next_snapshot"
          color="white"
          disabled={orderBook.isListening || orderBook.snapshotIndex === 0}
          onPress={() =>
            dispatch(setSnapshotIndex({ index: orderBook.snapshotIndex - 1 }))
          }
          title=">>"
        />
      </View>
    </View>
  )
}

export default SnapshotControls
