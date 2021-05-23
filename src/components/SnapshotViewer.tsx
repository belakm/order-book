import React, { useContext } from 'react'
import { ActivityIndicator, Button, View } from 'react-native'
import { connect, useDispatch } from 'react-redux'

import { ApiContext } from '../contexts/ApiContext'
import { RootState } from '../store'
import { setSnapshotIndex } from '../store/orders/actions'
import { OrderBookState } from '../store/orders/reducers'
import styles, { colors } from '../style'
import Chart from './Chart'
import PriceBar from './PriceBar'

export interface SnapshotProps {
  orderBook: OrderBookState
}

const SnapshotViewer = ({ orderBook }: SnapshotProps) => {
  const apiContext = useContext(ApiContext)
  const currentSnapshot =
    orderBook.pairs[orderBook.chosenPair][orderBook.snapshotIndex]
  const dispatch = useDispatch()
  return currentSnapshot ? (
    <View style={styles.container}>
      <Chart pair={orderBook.chosenPair} snapshot={currentSnapshot} />
      <View>
        <Button
          disabled={
            orderBook.isListening ||
            orderBook.snapshotIndex >=
              orderBook.pairs[orderBook.chosenPair].length - 1
          }
          onPress={() =>
            dispatch(setSnapshotIndex({ index: orderBook.snapshotIndex + 1 }))
          }
          title="<"
        />
        <Button
          onPress={() => apiContext.setIsListening(!orderBook.isListening)}
          title="Pause"
        />
        <Button
          disabled={orderBook.isListening || orderBook.snapshotIndex === 0}
          onPress={() =>
            dispatch(setSnapshotIndex({ index: orderBook.snapshotIndex - 1 }))
          }
          title=">"
        />
      </View>
      <PriceBar snapshot={currentSnapshot} />
    </View>
  ) : (
    <ActivityIndicator size="small" color={colors.loader} />
  )
}

const mapStateToProps = (state: RootState) => {
  const { orderBook } = state
  return { orderBook }
}

export default connect(mapStateToProps)(SnapshotViewer)
