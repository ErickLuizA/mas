import { StyleSheet } from 'react-native'
import StyleGuide from '../../components/StyleGuide'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.background,
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  alternativeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: StyleGuide.background,
  },

  text: {
    color: StyleGuide.text,
  },

  separator: {
    height: 12,
  },
})
