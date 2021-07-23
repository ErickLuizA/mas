import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import Stars from './Stars'
import StyleGuide from './StyleGuide'

interface CardProps {
  name: string
  image: string
  date: string
  vote_average: number
  onPress: () => void
}

const { width } = Dimensions.get('window')

export default function Card({
  name,
  image,
  date,
  vote_average,
  onPress,
}: CardProps) {
  return (
    <RectButton style={styles.container} {...{ onPress }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }}
        style={styles.image}
      />
      <View style={styles.right}>
        <Text style={styles.text}>{name} </Text>
        {Boolean(date) && <Text style={styles.text}>{date.slice(0, 4)} </Text>}
        <Stars key={name} {...{ vote_average }} />
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.lightBackground,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
  },

  image: {
    width: width * 0.25,
    height: width * 0.3,
  },

  text: {
    color: StyleGuide.text,
    paddingVertical: 5,
  },

  right: {
    width: width * 0.6,
    height: width * 0.25,
    paddingHorizontal: 10,
  },
})
