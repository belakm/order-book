import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import styles from '../style'

const TopBar: FunctionComponent = () => {
  return (
    <View
      style={[
        styles.wrapper,
        styles.appColors,
        styles.flexAlignCenter,
        styles.flexRow,
      ]}
    >
      <Text style={styles.title}>@ BITSTAMP</Text>
    </View>
  )
}

export default TopBar
