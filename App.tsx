import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import ApiIntervalFetch from './src/components/api/ApiIntervalFetch';
import Chart from './src/components/chart/Chart';
import PriceBar from './src/components/PriceBar/PriceBar';
import TopBar from './src/components/TopBar/TopBar';
import store from './src/store'
import styles from './src/style'

export default function App() {
  return (
    <Provider store={store}>
      <TopBar />
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          <ApiIntervalFetch />
          <Chart />
          <PriceBar />
        </View>
      </ScrollView>
    </Provider>
  );
}