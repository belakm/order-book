import 'react-native'
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'

import { mockOrderBook } from '../../__mocks__/mockStore'
import SnapshotControls from '../../src/components/snapshot/SnapshotControls'
import store from '../../src/store'

describe('SnapshotControls', () => {
  it('Should render next/prev buttons as disabled if unpaused and text on pause buttton as Pause.', () => {
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <SnapshotControls orderBook={mockOrderBook} />
      </StoreProvider>
    )

    const prevButton = getByTestId('previous_snapshot')
    const nextButton = getByTestId('next_snapshot')
    const enableButton = getByTestId('snapshot_pause')

    expect(prevButton).toBeDisabled()
    expect(nextButton).toBeDisabled()
    expect(enableButton).toHaveTextContent('Pause')
  })

  it('Should enable prev button when paused and pause button should say Unpause.', () => {
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <SnapshotControls
          orderBook={{ ...mockOrderBook, isListening: false }}
        />
      </StoreProvider>
    )

    const prevButton = getByTestId('previous_snapshot')
    const nextButton = getByTestId('next_snapshot')
    const enableButton = getByTestId('snapshot_pause')

    expect(prevButton).toBeEnabled()
    expect(nextButton).toBeDisabled()
    expect(enableButton).toHaveTextContent('Unpause')
  })

  it('Should enable prev and next prev buttons unpaused and not at first item and it should display Unpause.', () => {
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <SnapshotControls
          orderBook={{ ...mockOrderBook, isListening: false, snapshotIndex: 1 }}
        />
      </StoreProvider>
    )

    const prevButton = getByTestId('previous_snapshot')
    const nextButton = getByTestId('next_snapshot')
    const enableButton = getByTestId('snapshot_pause')

    expect(prevButton).toBeEnabled()
    expect(nextButton).toBeEnabled()
    expect(enableButton).toHaveTextContent('Unpause')
  })

  it('Should disable prev button on last item and keep next enabled.', () => {
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <SnapshotControls
          orderBook={{
            ...mockOrderBook,
            isListening: false,
            snapshotIndex: mockOrderBook.pairs.btceur.length - 1,
          }}
        />
      </StoreProvider>
    )

    const prevButton = getByTestId('previous_snapshot')
    const nextButton = getByTestId('next_snapshot')
    const enableButton = getByTestId('snapshot_pause')

    expect(prevButton).toBeDisabled()
    expect(nextButton).toBeEnabled()
    expect(enableButton).toHaveTextContent('Unpause')
  })
})
