import React, { FunctionComponent } from 'react'
import { Image, View } from 'react-native'

import logo from '../../img/logo.svg'
import styles from '../../style'

const TopBar: FunctionComponent = () => {
  return (
    <View style={styles.topBar}>
      <Image source={logo} style={styles.topBarImg} />
    </View>
  )
}

export default TopBar
