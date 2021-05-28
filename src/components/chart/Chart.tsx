import * as scale from 'd3-scale'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { Grid, StackedAreaChart, XAxis, YAxis } from 'react-native-svg-charts'

import {
  OrderBookSnapshot,
  OrderBookPair,
  Order,
} from '../../store/orders/reducers'
import styles, { colors } from '../../style'
import { toReadablePriceNumber } from '../../utils/formatters'
import PriceLine from './Priceline'

interface ChartProps {
  snapshot: OrderBookSnapshot
  pair: OrderBookPair
}

/**
 * Adds additional points to the data set so the chart connects points in a step-line manner.
 */
const convertToStepLine = (orders: Order[]): Order[] =>
  orders.length > 0
    ? orders.reduce((orderSet: Order[], order: Order, index) => {
        const { price, volume } = order
        const step =
          index < orders.length - 1
            ? [
                {
                  price: price + 0.0001,
                  sum: orders[index + 1].sum,
                  volume,
                },
              ]
            : []
        return [...orderSet, order, ...step]
      }, [])
    : []

/**
 * Renders a depth chart, uses react-native-svg-charts under the hood.
 */
const Chart: FunctionComponent<ChartProps> = ({
  snapshot,
  pair,
}: ChartProps) => {
  const { width } = Dimensions.get('window')
  const [isPortraitMode, setIsPortraitMode] = useState<boolean>(width < 500)
  const bids = convertToStepLine(snapshot.orders.bids)
  const asks = convertToStepLine(snapshot.orders.asks)
  const currency = pair.slice(3).toUpperCase()
  const cryptoCurrency = pair.slice(0, 3).toUpperCase()
  const lastAsk = asks[0].price
  const chartData = []
  const chartStyles = isPortraitMode
    ? [styles.chartPortrait]
    : [styles.chartLandscape]

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      const { width } = Dimensions.get('window')
      setIsPortraitMode(width < 500)
    })
  }, [])

  // transform into a shape that is understood by react-native-svg-charts
  for (let x = 0; x < bids.length + asks.length; x++) {
    chartData.push({
      ask: x < bids.length ? 0 : asks[x - bids.length].sum,
      bid: x < bids.length ? bids[x].sum : 0,
      price: x < bids.length ? bids[x].price : asks[x - bids.length].price,
    })
  }

  return (
    <View style={[...chartStyles, styles.bodyBackground, styles.marginBottom]}>
      <StackedAreaChart
        colors={[`${colors.bid}aa`, `${colors.ask}aa`]}
        keys={['bid', 'ask']}
        style={{ flex: 1 }}
        data={chartData}
        yAccessor={({ item }) => item.bid || item.ask}
        xAccessor={({ item }) => item.price}
        xScale={scale.scaleLinear}
        yScale={scale.scaleLinear}
        numberOfTicks={isPortraitMode ? 8 : 4}
        showGrid
      >
        <Grid svg={{ stroke: 'rgba(255,255,255,.1)' }} />
        <PriceLine currency={currency} price={lastAsk} />
      </StackedAreaChart>
      <YAxis
        style={{ position: 'absolute', top: 0, bottom: 0 }}
        data={StackedAreaChart.extractDataPoints(chartData, ['bid', 'ask'])}
        contentInset={{ top: 10, bottom: 10 }}
        svg={{ fill: 'white', fontSize: 12, fontWeight: 'bold', y: 5 }}
        scale={scale.scaleLinear}
        numberOfTicks={isPortraitMode ? 8 : 4}
        formatLabel={(value) => `${value} ${cryptoCurrency}`}
      />
      <XAxis
        data={chartData}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 8 }}
        svg={{
          fill: 'white',
          fontSize: 12,
          fontWeight: 'bold',
          y: 5,
        }}
        xAccessor={({ item }) => item.price}
        scale={scale.scaleLinear}
        numberOfTicks={isPortraitMode ? 1 : 3}
        contentInset={{ left: 80, right: 10 }}
        formatLabel={(value) => `${toReadablePriceNumber(value)} ${currency}`}
      />
    </View>
  )
}

export default Chart
