import { StyleSheet, Dimensions } from 'react-native'

import StyleGuide from '../../utils/StyleGuide'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: StyleGuide.background,
    paddingHorizontal: 20,
  },

  image: {
    width: width * 0.6,
    resizeMode: 'contain',
  },

  icon: {
    width: width * 0.6,
    marginBottom: 10,
  },

  button: {
    width: '100%',
    backgroundColor: StyleGuide.primary,
    paddingVertical: 15,
    borderRadius: width * 0.5,
  },

  buttonText: {
    fontFamily: 'Roboto_300Light',
    color: StyleGuide.text,
    fontSize: 18,
    textAlign: 'center',
  },
})
