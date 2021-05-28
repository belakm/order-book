import { Order } from './reducers'

/**
 * Parses orders incoming from socket and
 */
export const parseOrders = (
  orders: [number, number][],
  ordersAreBids: boolean
): Order[] => {
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
