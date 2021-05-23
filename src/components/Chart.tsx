import * as scale from 'd3-scale'
import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { Grid, StackedAreaChart, XAxis, YAxis } from 'react-native-svg-charts'
import { connect } from 'react-redux'

import { RootState } from '../store'
import { OrderBookSnapshot, OrderBookPair } from '../store/orders/reducers'
import styles, { colors } from '../style'

interface PriceBarProps {
  snapshot: OrderBookSnapshot
  pair: OrderBookPair
}

const PriceBar: FunctionComponent<PriceBarProps> = ({
  snapshot,
  pair,
}: PriceBarProps) => {
  const bids = snapshot.orders.bids
  const asks = snapshot.orders.asks
  const currency = pair.slice(3).toUpperCase()
  const cryptoCurrency = pair.slice(0, 3).toUpperCase()

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
