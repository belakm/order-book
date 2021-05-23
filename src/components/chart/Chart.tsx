import * as scale from 'd3-scale'
import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { G, Line } from 'react-native-svg'
import { Grid, StackedAreaChart, XAxis, YAxis } from 'react-native-svg-charts'
import { connect } from 'react-redux'

import { RootState } from '../../store'
import { OrderBookState } from '../../store/orders/reducers'
import styles from '../../style'

interface PriceBarProps {
  orders: OrderBookState
}

const PriceBar: FunctionComponent<PriceBarProps> = ({
  orders,
}: PriceBarProps) => {
  const snapshots = orders.btceur.snapshots
  const bids = snapshots.length > 0 ? snapshots[0].orders.bids : []
  const asks = snapshots.length > 0 ? snapshots[0].orders.asks : []
  const xMax = bids.length > 0 ? bids[bids.length - 1].price * 2 : 0
  const yMax = bids.length > 0 ? bids[Math.ceil(bids.length / 10)].sum : 0
  const relevantBids = bids.filter(
    (order) => order.price <= xMax && order.sum <= yMax
  )
  const relevantAsks = asks.filter(
    (order) => order.price <= xMax && order.sum <= yMax
  )

  const chartData = []
  for (let x = 0; x < relevantBids.length + relevantAsks.length; x++) {
    chartData.push({
      ask:
        x < relevantBids.length ? 0 : relevantAsks[x - relevantBids.length].sum,
      bid: x < relevantBids.length ? relevantBids[x].sum : 0,
      price:
        x < relevantBids.length
          ? relevantBids[x].price
          : relevantAsks[x - relevantBids.length].price,
    })
  }

  return (
    <View style={styles.chart}>
      <StackedAreaChart
        colors={['rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)']}
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
        numberOfTicks={12}
        contentInset={{ left: 10, right: 10 }}
        formatLabel={(value, index) => value}
      />
    </View>
  )
}

const mapStateToProps = (state: RootState) => {
  const { orders } = state
  return { orders }
}

export default connect(mapStateToProps)(PriceBar)
