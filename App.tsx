import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import ApiIntervalFetch from './src/components/api/ApiIntervalFetch';
import PriceBar from './src/components/PriceBar/PriceBar';
import TopBar from './src/components/TopBar/TopBar';
import store from './src/store'
import styles from './src/style'

export default function App() {
  return (
    <Provider store={store}>
      <TopBar />
      <View style={styles.container}>
        <ApiIntervalFetch />
        <PriceBar />
      </View>
    </Provider>
  );
}