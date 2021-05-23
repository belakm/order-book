import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'

import { RootState } from '../store'
import { addOrderBookSnapshot } from '../store/orders/actions'
import { Order, OrderBookPair, OrderBookState } from '../store/orders/reducers'

const parseOrders = (orders: [number, number][], ordersAreBids: boolean) => {
  let sum = 0
  return orders.length > 0
    ? orders
        .sort(([priceA], [priceB]) =>
          ordersAreBids ? priceB - priceA : priceA - priceB
        )
        .map(([price, volume]) => ({
          volume: Number(volume),
          price: Number(price),
          sum: (sum += Number(volume)),
        }))
    : []
}

const socketMessage = (shouldListen: boolean, orderBookType: OrderBookPair) => {
  return JSON.stringify({
    event: `bts:${shouldListen ? 'subscribe' : 'unsubscribe'}`,
    data: {
      channel: `order_book_${orderBookType}`,
    },
  })
}

export interface ApiContextProps {
  changePair: (pair: OrderBookPair) => void
  setIsListening: (isListening: boolean) => void
}

export const ApiContext = createContext<ApiContextProps>({
  changePair: () => {},
  setIsListening: () => {},
})

export interface ApiContextProviderProps {
  children: ReactNode
  orderBook: OrderBookState
}

const ApiContextProvider = ({
  children,
  orderBook,
}: ApiContextProviderProps) => {
  const [currentlyListenedPair, setCurrentlyListenedPair] =
    useState<OrderBookPair>('btceur')
  const [isConnectionOpen, setIsConnectionOpen] = useState<boolean>(false)
  const [websocket, setWebsocket] = useState<WebSocket>()
  const [lastMessageTime, setLastMessageTime] = useState<number>(0)
  const dispatch = useDispatch()

  useEffect(() => {
    const websocket = new WebSocket('wss://ws.bitstamp.net')
    console.log('START', websocket)
    websocket.onopen = () => {
      setIsConnectionOpen(true)
    }
    websocket.onclose = () => {
      setIsConnectionOpen(false)
    }
    websocket.onmessage = (e) => {
      // a message was received
      const message = JSON.parse(e.data)
      const messageData = message.data
      if (
        messageData &&
        Number(messageData.microtimestamp) - lastMessageTime > 2000
      ) {
        const bids: Order[] = parseOrders(messageData.bids, true).reverse()
        const asks: Order[] = parseOrders(messageData.asks, false)
        dispatch(
          addOrderBookSnapshot({
            orderBookType: orderBook.chosenPair,
            snapshot: {
              timestamp: Math.round(Number(messageData.microtimestamp) / 1000),
              orders: {
                asks,
                bids,
              },
            },
          })
        )
        setLastMessageTime(Number(messageData.microtimestamp))
      }
    }
    setWebsocket(websocket)
  }, [])

  const apiProvider: ApiContextProps = {
    changePair: (pair: OrderBookPair) => {
      if (websocket != null && websocket.readyState === 1 && isConnectionOpen) {
        websocket.send(socketMessage(false, currentlyListenedPair))
        websocket.send(socketMessage(true, pair))
        setCurrentlyListenedPair(pair)
      }
    },
    setIsListening: (shouldListen: boolean) => {
      if (websocket != null && websocket.readyState === 1 && isConnectionOpen) {
        websocket.send(socketMessage(shouldListen, orderBook.chosenPair))
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
