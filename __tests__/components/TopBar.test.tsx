import 'react-native'
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'

import TopBar from '../../src/components/topBar/TopBar'
import store from '../../src/store'

// Note: test renderer must be required after react-native.
describe('SnapshotPriceBar', () => {
  it('Should render.', () => {
    render(
      <StoreProvider store={store}>
        <TopBar />
      </StoreProvider>
    )
  })
})
