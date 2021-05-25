import * as scale from 'd3-scale'
import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { G, Line, Rect, Text } from 'react-native-svg'
import { Grid, StackedAreaChart, XAxis, YAxis } from 'react-native-svg-charts'
import { connect } from 'react-redux'

import { RootState } from '../store'
import {
  OrderBookSnapshot,
  OrderBookPair,
  Order,
} from '../store/orders/reducers'
import styles, { colors } from '../style'

interface PriceBarProps {
  snapshot: OrderBookSnapshot
  pair: OrderBookPair
}

// missing docs
interface PriceLineProps {
  x?: Function
  price: number
  currency: string
}

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

const PriceLine = ({ x = () => {}, price = 0, currency }: PriceLineProps) => (
  <G y="0">
    <Line
      key="zero-axis"
      y1="0%"
      y2="100%"
      x1={x(price)}
      x2={x(price)}
      stroke="grey"
      strokeDasharray={[4, 8]}
      strokeWidth={2}
    />
    <Rect
      y={10}
      x={x(price) - 70}
      height={30}
      width={140}
      stroke={colors.materialBorder}
      fill={colors.material}
      ry={4}
      rx={4}
    />
    <Text
      y={27}
      x={x(price)}
      alignmentBaseline="middle"
      textAnchor="middle"
      fill="white"
    >
      {`${price.toFixed(2)} ${currency}`}
    </Text>
  </G>
)

const PriceBar: FunctionComponent<PriceBarProps> = ({
  snapshot,
  pair,
}: PriceBarProps) => {
  const bids = convertToStepLine(snapshot.orders.bids)
  const asks = convertToStepLine(snapshot.orders.asks)
  const currency = pair.slice(3).toUpperCase()
  const cryptoCurrency = pair.slice(0, 3).toUpperCase()
  const lastAsk = asks[0].price
  const chartData = []
  for (let x = 0; x < bids.length + asks.length; x++) {
    chartData.push({
      ask: x < bids.length ? 0 : asks[x - bids.length].sum,
      bid: x < bids.length ? bids[x].sum : 0,
      price: x < bids.length ? bids[x].price : asks[x - bids.length].price,
    })
  }

  return (
    <View style={[styles.chart, styles.appColors, styles.marginBottom]}>
      <StackedAreaChart
        colors={[`${colors.bid}aa`, `${colors.ask}aa`]}
        keys={['bid', 'ask']}
        style={{ flex: 1 }}
        data={chartData}
        yAccessor={({ item }) => item.bid || item.ask}
        xAccessor={({ item }) => item.price}
        xScale={scale.scaleLinear}
        yScale={scale.scaleLinear}
        numberOfTicks={9}
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
        numberOfTicks={3}
        contentInset={{ left: 40, right: 10 }}
        formatLabel={(value) => `${value} ${currency}`}
      />
    </View>
  )
}

const mapStateToProps = (state: RootState) => {
  const { orderBook } = state
  return { orderBook }
}

export default connect(mapStateToProps)(PriceBar)
