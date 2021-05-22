import { StyleSheet } from "react-native";

const colors = {
  background: '#111c2c',
  text: '#ffffff'
}

const viewStyles = {
  backgroundColor: colors.background,
  color: colors.text
}

const padding = {
  paddingVertical: '.2em',
  paddingHorizontal: '1em'
}

const styles = StyleSheet.create({
  topBar: {
    ...viewStyles,
    ...padding,
    width: '100%',
    height: '3em',
    alignItems: 'flex-start',
  },
  statusBar: {
    ...viewStyles,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '3em'
  },
  topBarImg: {
    height: '100%',
    width: '7em',
  },
  text: {
    color: colors.text
  },
  container: {
    ...viewStyles,
    ...padding,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});


export default styles