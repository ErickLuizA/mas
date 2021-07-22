import { StyleSheet, Dimensions } from 'react-native'
import StyleGuide from '../../components/StyleGuide'

const { width } = Dimensions.get('screen')

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: StyleGuide.background,
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },

  rectButton: {
    width: width * 0.3,
    height: width * 0.2,
    marginRight: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rectButtonText: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
})
