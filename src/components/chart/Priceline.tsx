import React from 'react'
import { G, Line, Rect, Text } from 'react-native-svg'

import { colors } from '../../style'
import { toReadablePriceNumber } from '../../utils/formatters'

interface PriceLineProps {
  x?: Function
  price: number
  currency: string
}

/**
 * A vertical price line with a price tag on top.
 * @param x a function that react-native-svg-charts inserts
 */
const PriceLine = ({
  x = () => {},
  price = 0,
  currency = '',
}: PriceLineProps) => (
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
      {`${toReadablePriceNumber(price)} ${currency}`}
    </Text>
  </G>
)

export default PriceLine
