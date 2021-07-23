import React from 'react'
import { Text, StyleSheet, Dimensions, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import StyleGuide from '../../utils/StyleGuide'

interface CardProps {
  id: number
  name: string
  poster_path: string
  onPress: () => void
}

const { width } = Dimensions.get('window')

export default function Card({ id, name, poster_path, onPress }: CardProps) {
  return (
    <RectButton key={id} style={styles.container} {...{ onPress }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
        }}
        style={styles.img}
      />
      <Text style={styles.text}>{name} </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.4,
    height: width * 0.7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  img: {
    width: '100%',
    height: width * 0.6,
    resizeMode: 'contain',
    borderRadius: 16,
  },

  text: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    color: StyleGuide.text,
  },
})
