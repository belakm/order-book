import { ORDERS_URL } from "../../env/orders";
import { BookSnapshot, Order, OrderBookType } from "../store/orders/reducers";

const fetchOrders = async (orderBookType: OrderBookType) : Promise<BookSnapshot> => {
  const response = await fetch(`${ORDERS_URL}${orderBookType}`, { 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    } 
  })
  console.log(response)
  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json();
    return {
      timestamp: Number(jsonResponse.microtimestamp / 1000),
      orders: {
        asks: jsonResponse.asks.map(([price, volume] : [ number, number ]) => ({ volume, price })),
        bids: jsonResponse.bids.map(([price, volume] : [ number, number ]) => ({ volume, price })),
      }
    }
  } else {
    const { status, statusText } = response
    throw { status, statusText }
  }
}

export default fetchOrders