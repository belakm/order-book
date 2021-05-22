import React, { FunctionComponent, useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetchLatestOrders } from '../../store/orders/actions';
import { OrderBookState } from '../../store/orders/reducers'

const fetchInterval = 3 // seconds

interface ApiIntervalFetchProps {
  orders: OrderBookState
}

const ApiIntervalFetch : FunctionComponent<ApiIntervalFetchProps> = ({
  orders
}: ApiIntervalFetchProps) => {
  const [seconds, setSeconds] = useState<number>(1);
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(fetchLatestOrders('btceur'))
      setSeconds(seconds + 1);
    }, fetchInterval * 1000);
    return () => clearInterval(timer);
  });
  
  return <></>
}

const mapStateToProps = (state: RootState) => {
  const { orders } = state
  return { orders }
};

export default connect(mapStateToProps)(ApiIntervalFetch);