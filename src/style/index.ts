import { StyleSheet } from 'react-native'

export const colors = {
  background: '#101010', //'#040f1f',
  material: '#212121',
  materialBorder: '#333333',
  text: '#ffffff',
  textLight: '#777777',
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
  bodyBackground: {
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
  chartPortrait: {
    width: '100%',
    height: 400,
  },
  chartLandscape: {
    height: 140,
    width: '100%',
  },
  priceBoxDetail: {
    paddingHorizontal: 4,
    paddingVertical: 6,
    fontWeight: 'bold',
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 20,
    color: 'white',
    width: 125,
    textAlign: 'center',
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
  },
  timeRow: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginVertical: 6,
  },
  topBar: {
    height: 64,
    paddingTop: 24,
    zIndex: 1,
  },
  wrapper: {
    paddingHorizontal: 32,
  },
})

export default styles
