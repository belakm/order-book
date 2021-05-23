import { StyleSheet } from 'react-native'

export const colors = {
  background: '#111c2c',
  text: '#ffffff',
  loader: '#ffffff',
  bid: '#56a600',
  ask: '#a60000',
  button: '#263f63',
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  appColors: {
    backgroundColor: colors.background,
    color: colors.text,
  },
  wrapper: {
    paddingVertical: 12,
    paddingHorizontal: 32,
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
  priceBox: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  priceBoxDetail: {
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    fontSize: 24,
    color: 'white',
  },
  priceBoxDetailBid: {
    backgroundColor: colors.bid,
  },
  priceBoxDetailAsk: {
    backgroundColor: colors.ask,
  },
  logo: {
    height: '100%',
    width: 100,
  },
  mainContainer: {
    paddingBottom: 64,
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
  title: {
    color: colors.text,
    fontSize: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
})

export default styles
