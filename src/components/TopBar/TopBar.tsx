import React, { FunctionComponent, useEffect, useState } from 'react'
import { Image, View } from 'react-native';
import styles from '../../style';
import logo from '../../img/logo.svg'

const TopBar : FunctionComponent = () => {
  return <View style={styles.topBar}>
    <Image source={logo} style={styles.topBarImg}/>
  </View>
}

export default TopBar;
