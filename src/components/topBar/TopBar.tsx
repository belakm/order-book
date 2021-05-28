import React from 'react'
import { Text, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { setChosenPair } from '../../store/orders/actions'
import { OrderBookPair } from '../../store/orders/reducers'
import styles from '../../style'
import { pairToReadable } from '../../utils/formatters'
import Dropdown from '../controls/Dropdown'

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

/**
 * A top bar component, also regulates which currency pair is shown
 * in on the UI and being listened to via socket.
 */
const TopBar = () => {
  const dispatch = useDispatch()
  const changePair = (pair: OrderBookPair) => {
    dispatch(setChosenPair({ orderBookPair: pair }))
  }
  return (
    <View
      style={[
        styles.wrapper,
        styles.bodyBackground,
        styles.flexAlignCenter,
        styles.flexRow,
        styles.topBar,
      ]}
    >
      <Text style={[styles.title, styles.flexGrow]}>@ BITSTAMP</Text>
      <Dropdown
        initialValue="btceur"
        options={pairOptions}
        onChange={changePair}
      />
    </View>
  )
}

export default TopBar
