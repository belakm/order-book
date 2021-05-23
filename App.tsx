import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Provider as StoreProvider } from 'react-redux'

import SnapshotViewer from './src/components/SnapshotViewer'
import TopBar from './src/components/TopBar'
import ApiContextProvider from './src/contexts/ApiContext'
import store from './src/store'
import styles from './src/style'

export default function App() {
  return (
    <StoreProvider store={store}>
      <ApiContextProvider>
        <TopBar />
        <ScrollView style={styles.body}>
          <SnapshotViewer />
        </ScrollView>
      </ApiContextProvider>
    </StoreProvider>
  )
}
