import React, { useContext } from 'react'
import { Button, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { ApiContext } from '../contexts/ApiContext'
import { setSnapshotIndex } from '../store/orders/actions'
import { OrderBookState } from '../store/orders/reducers'
import styles from '../style'

interface SnapshotControlsProps {
  orderBook: OrderBookState
}

const SnapshotControls = ({ orderBook }: SnapshotControlsProps) => {
  const dispatch = useDispatch()
  const apiContext = useContext(ApiContext)
  return (
    <View
      style={[
        styles.appColors,
        styles.flexRow,
        styles.flexAlignCenter,
        styles.fullWidth,
        styles.marginBottom,
      ]}
    >
      <View style={[styles.snapshotControl]}>
        <Button
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
          onPress={() => {
            if (!orderBook.isListening) {
              dispatch(setSnapshotIndex({ index: 0 }))
            }
            apiContext.setIsListening(!orderBook.isListening)
          }}
          title={orderBook.isListening ? 'Pause' : 'Unpause'}
        />
      </View>
      <View style={[styles.snapshotControl]}>
        <Button
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
