import React from 'react'
import { Text, StyleSheet, Dimensions, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import StyleGuide from '../../components/StyleGuide'

interface CardProps {
  id: number
  name: string
  poster_path: string
  onPress: () => void
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width * 0.4,
    height: width * 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },

  img: {
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
    borderRadius: 10,
  },

  text: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    color: StyleGuide.text,
  },
})

export default function Card({ id, name, poster_path, onPress }: CardProps) {
  return (
    <RectButton key={id} style={styles.container} {...{ onPress }}>
      <Image
        resizeMethod="scale"
        source={{
          uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
        }}
        style={styles.img}
      />
      <Text style={styles.text}>{name} </Text>
    </RectButton>
  )
}
