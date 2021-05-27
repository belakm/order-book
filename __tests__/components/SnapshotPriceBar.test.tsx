import 'react-native'
import { render } from '@testing-library/react-native'
import React from 'react'

import SnapshotPriceBar from '../../src/components/snapshot/SnapshotPriceBar'

// Note: test renderer must be required after react-native.
describe('SnapshotPriceBar', () => {
  it('Shows right and readable values.', () => {
    const { getByTestId } = render(
      <SnapshotPriceBar bidPrice={9000} askPrice={10000} />
    )
    const bidPrice = getByTestId('bid_price')
    const askPrice = getByTestId('ask_price')
    expect(bidPrice).toHaveTextContent('9,000.00')
    expect(askPrice).toHaveTextContent('10,000.00')
  })

  it('Shows n/a when price is not defined.', () => {
    const { getByTestId } = render(
      <SnapshotPriceBar bidPrice={undefined} askPrice={undefined} />
    )
    const bidPrice = getByTestId('bid_price')
    const askPrice = getByTestId('ask_price')
    expect(bidPrice).toHaveTextContent('n/a')
    expect(askPrice).toHaveTextContent('n/a')
  })
})
