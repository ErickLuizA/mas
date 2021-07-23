import { StyleSheet } from 'react-native'

import StyleGuide from '../../utils/StyleGuide'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    backgroundColor: StyleGuide.background,
  },

  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: StyleGuide.text,
  },

  separator: {
    height: 12,
  },
})
