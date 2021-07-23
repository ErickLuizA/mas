import { StyleSheet, Dimensions } from 'react-native'

import StyleGuide from '../../utils/StyleGuide'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.background,
  },

  close: {
    position: 'absolute',
    right: 10,
    top: 20,
  },

  backImg: {
    position: 'absolute',
    width,
    height: width * 0.9,
    opacity: 0.2,
  },

  img: {
    width,
    height: width * 0.9,
    resizeMode: 'contain',
    borderRadius: 4,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  text: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 18,
    color: StyleGuide.text,
  },

  smallText: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    color: StyleGuide.text,
    textAlign: 'left',
  },

  box: {
    paddingHorizontal: 20,
  },
})
