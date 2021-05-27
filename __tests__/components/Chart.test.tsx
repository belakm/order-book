import 'react-native'
import { render } from '@testing-library/react-native'
import React from 'react'

import { mockSnapshot } from '../../__mocks__/mockStore'
import Chart from '../../src/components/chart/Chart'

// Note: test renderer must be required after react-native.
describe('SnapshotPriceBar', () => {
  it('Should render.', () => {
    render(
      <Chart snapshot={mockSnapshot(new Date().getDate())} pair="btceur" />
    )
    render(
      <Chart snapshot={mockSnapshot(new Date().getDate())} pair="btcusd" />
    )
  })
})
