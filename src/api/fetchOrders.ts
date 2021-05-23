import { ORDERS_URL } from '../../env/orders'
import { BookSnapshot, Order, OrderBookType } from '../store/orders/reducers'

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

const fetchOrders = async (
  orderBookType: OrderBookType
): Promise<BookSnapshot> => {
  const response = await fetch(`${ORDERS_URL}${orderBookType}`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json()
    const bids: Order[] = parseOrders(jsonResponse.bids, true).reverse()
    const asks: Order[] = parseOrders(jsonResponse.asks, false)
    return {
      timestamp: Number(jsonResponse.microtimestamp / 1000),
      orders: {
        asks,
        bids,
      },
    }
  } else {
    const { status, statusText } = response
    throw new Error(`${status} - ${statusText}`)
  }
}

export default fetchOrders
