import React, {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { connect, useDispatch } from 'react-redux'

import { RootState } from '../store'
import { addOrderOrderBookSnapshot } from '../store/orders/actions'
import { OrderBookPair, OrderBookState } from '../store/orders/reducers'

type Channel = 'order_book_btceur' | 'order_book_btcusd'

const parsePair = (channel: Channel): OrderBookPair => {
  switch (channel) {
    case 'order_book_btceur':
      return 'btceur'
    case 'order_book_btcusd':
      return 'btcusd'
  }
}

interface SocketMessage {
  channel: Channel
  data?: {
    asks: [number, number][]
    bids: [number, number][]
    microtimestamp: number
  }
  dispatch: Dispatch<any>
  event: string
}

const parseSocketMessage = ({
  channel,
  data,
  dispatch,
  event,
}: SocketMessage) => {
  const pair = parsePair(channel)
  if (event === 'data' && data) {
    dispatch(
      addOrderOrderBookSnapshot({
        orderBookPair: pair,
        snapshot: {
          timestamp: Math.round(Number(data.microtimestamp) / 1000),
          orders: {
            asks: data.asks,
            bids: data.bids,
          },
        },
      })
    )
  }
}

const manageSubscription = ({
  shouldListen,
  pair,
}: {
  shouldListen: boolean
  pair: OrderBookPair
}) => {
  return JSON.stringify({
    event: `bts:${shouldListen ? 'subscribe' : 'unsubscribe'}`,
    data: {
      channel: `order_book_${pair}`,
    },
  })
}

interface ApiContextProps {
  setIsListening: (isListening: boolean) => void
}

/**
 * Manages socket subscription and different types of socket messages.
 * @param setIsListening - regulates whether current active channel should be
 *    listened to or paused (subscibed / unsubscribed).
 */
export const ApiContext = createContext<ApiContextProps>({
  setIsListening: () => {},
})

interface ApiContextProviderProps {
  children: ReactNode
  orderBook: OrderBookState
}

const ApiContextProvider = ({
  children,
  orderBook,
}: ApiContextProviderProps) => {
  const [currentlyListenedPair, setCurrentlyListenedPair] =
    useState<OrderBookPair | null>(null)
  const [isConnectionOpen, setIsConnectionOpen] = useState<boolean>(false)
  const [websocket, setWebsocket] = useState<WebSocket>()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isConnectionOpen) {
      const websocket = new WebSocket('wss://ws.bitstamp.net')
      websocket.onopen = () => {
        websocket.send(
          manageSubscription({
            shouldListen: true,
            pair: orderBook.chosenPair,
          })
        )
        setIsConnectionOpen(true)
      }
      websocket.onclose = () => {
        setIsConnectionOpen(false)
      }
      websocket.onmessage = (e) => {
        const { channel, data, event } = JSON.parse(e.data) as SocketMessage
        parseSocketMessage({ channel, data, event, dispatch })
      }
      setWebsocket(websocket)
    }
    // rstart connection if socket drops
  }, [isConnectionOpen])

  useEffect(() => {
    if (websocket != null && websocket.readyState === 1 && isConnectionOpen) {
      if (currentlyListenedPair != null) {
        websocket.send(
          manageSubscription({
            shouldListen: false,
            pair: currentlyListenedPair,
          })
        )
      }
      websocket.send(
        manageSubscription({ shouldListen: true, pair: orderBook.chosenPair })
      )
    }
    setCurrentlyListenedPair(orderBook.chosenPair)
  }, [orderBook.chosenPair])

  const apiProvider: ApiContextProps = {
    setIsListening: (shouldListen: boolean) => {
      if (
        websocket != null &&
        websocket.readyState === 1 &&
        isConnectionOpen &&
        currentlyListenedPair != null
      ) {
        websocket.send(
          manageSubscription({
            shouldListen,
            pair: currentlyListenedPair,
          })
        )
      }
    },
  }

  return (
    <ApiContext.Provider value={apiProvider}>{children}</ApiContext.Provider>
  )
}

const mapStateToProps = (state: RootState) => {
  const { orderBook } = state
  return { orderBook }
}

export default connect(mapStateToProps)(ApiContextProvider)
