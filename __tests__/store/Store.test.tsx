import { mockOrderBook } from '../../__mocks__/mockStore'
import reducer, { initialState } from '../../src/store/orders/reducers'

/* ORDER_BOOK_SNAPSHOT
ORDER_BOOK_IS_LISTENING
CHOSEN_ORDER_BOOK
SNAPSHOT_INDEX */

describe('orders reducer', () => {
  it('Should add new snapshots correctly.', () => {
    const timestamp = new Date().getTime()
    expect(
      reducer(initialState, {
        type: 'ORDER_BOOK_SNAPSHOT',
        orderBookPair: 'btceur',
        snapshot: {
          timestamp,
          orders: {
            bids: [{ price: 1, volume: 1, sum: 1 }],
            asks: [{ price: 1, volume: 1, sum: 1 }],
          },
        },
      })
    ).toEqual({
      ...initialState,
      pairs: {
        btceur: [
          {
            timestamp,
            orders: {
              bids: [{ price: 1, volume: 1, sum: 1 }],
              asks: [{ price: 1, volume: 1, sum: 1 }],
            },
          },
        ],
        btcusd: [],
      },
    })
  })

  it('Should track listening status correctly.', () => {
    expect(
      reducer(initialState, {
        type: 'ORDER_BOOK_IS_LISTENING',
        isListening: false,
      })
    ).toEqual({
      ...initialState,
      isListening: false,
    })

    expect(
      reducer(
        { ...initialState, isListening: false },
        {
          type: 'ORDER_BOOK_IS_LISTENING',
          isListening: true,
        }
      )
    ).toEqual({
      ...initialState,
      isListening: true,
    })
  })

  it('Should track chosen currency pair correctly.', () => {
    expect(
      reducer(initialState, {
        type: 'CHOSEN_ORDER_BOOK',
        orderBookPair: 'btcusd',
      })
    ).toEqual({
      ...initialState,
      chosenPair: 'btcusd',
    })

    expect(
      reducer(
        { ...initialState, chosenPair: 'btcusd' },
        {
          type: 'CHOSEN_ORDER_BOOK',
          orderBookPair: 'btceur',
        }
      )
    ).toEqual({
      ...initialState,
      chosenPair: 'btceur',
    })
  })

  it('Should restart listening if the selected orderbook has no snapshots and is currently not listening.', () => {
    expect(
      reducer(
        { ...initialState, isListening: false },
        {
          type: 'CHOSEN_ORDER_BOOK',
          orderBookPair: 'btcusd',
        }
      )
    ).toEqual({
      ...initialState,
      isListening: true,
      chosenPair: 'btcusd',
    })
  })

  it('Should reset snapshot index to 0 on changing of chosen currency pair.', () => {
    expect(
      reducer(
        { ...initialState, snapshotIndex: 5 },
        {
          type: 'CHOSEN_ORDER_BOOK',
          orderBookPair: 'btcusd',
        }
      )
    ).toEqual({
      ...initialState,
      snapshotIndex: 0,
      chosenPair: 'btcusd',
    })
  })

  it('Should track snapshot index and keep it in bounds of 0 and the number of snapshots kept.', () => {
    expect(
      reducer(initialState, {
        type: 'SNAPSHOT_INDEX',
        index: -1,
      })
    ).toEqual({
      ...initialState,
      snapshotIndex: 0,
    })

    expect(
      reducer(mockOrderBook, {
        type: 'SNAPSHOT_INDEX',
        index: -1,
      })
    ).toEqual({
      ...mockOrderBook,
      snapshotIndex: 0,
    })

    expect(
      reducer(mockOrderBook, {
        type: 'SNAPSHOT_INDEX',
        index: 1,
      })
    ).toEqual({
      ...mockOrderBook,
      snapshotIndex: 1,
    })

    expect(
      reducer(mockOrderBook, {
        type: 'SNAPSHOT_INDEX',
        index: 1,
      })
    ).toEqual({
      ...mockOrderBook,
      snapshotIndex: 1,
    })

    expect(
      reducer(mockOrderBook, {
        type: 'SNAPSHOT_INDEX',
        index: 2,
      })
    ).toEqual({
      ...mockOrderBook,
      snapshotIndex: 2,
    })

    expect(
      reducer(mockOrderBook, {
        type: 'SNAPSHOT_INDEX',
        index: 4,
      })
    ).toEqual({
      ...mockOrderBook,
      snapshotIndex: 2,
    })
  })
})
