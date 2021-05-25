import { StyleSheet } from 'react-native'

export const colors = {
  background: '#040f1f',
  material: '#0b2652',
  text: '#ffffff',
  textLight: '#395785',
  materialBorder: '#395785',
  loader: '#ffffff',
  bid: '#098538',
  ask: '#850909',
  button: '#263f63',
  bitstamp: '#139f48',
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  appColors: {
    backgroundColor: colors.background,
    color: colors.text,
  },
  dropdownOptions: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 40,
    maxHeight: 200,
  },
  flexColumn: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexAlignCenter: {
    justifyContent: 'center',
  },
  flexGrow: {
    flex: 1,
  },
  chart: {
    width: '100%',
    minHeight: 400,
  },
  priceBoxDetail: {
    fontWeight: 'bold',
    borderRadius: 2,
    borderWidth: 1,
    fontSize: 24,
    color: 'white',
  },
  priceBoxDetailBid: {
    backgroundColor: colors.bid,
    borderColor: '#3bb56c',
  },
  priceBoxDetailAsk: {
    backgroundColor: colors.ask,
    borderColor: '#b53d3b',
  },
  logo: {
    height: '100%',
    width: 100,
  },
  mainContainer: {
    paddingBottom: 64,
    paddingTop: 12,
  },
  material: {
    backgroundColor: colors.material,
    borderWidth: 1,
    borderColor: colors.materialBorder,
    borderRadius: 4,
  },
  materialPadding: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  marginBottom: {
    marginBottom: 12,
  },
  marginHorizontal: {
    marginHorizontal: 12,
  },
  snapshotControl: {
    width: '20%',
  },
  text: {
    color: colors.text,
    fontSize: 18,
  },
  textLight: {
    color: colors.textLight,
    fontSize: 18,
  },
  title: {
    color: colors.bitstamp,
    fontWeight: 'bold',
    fontSize: 24,
    paddingVertical: 36,
    height: 48,
  },
  wrapper: {
    paddingHorizontal: 32,
  },
})

export default styles
