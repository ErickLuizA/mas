import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import StyleGuide from './StyleGuide'

interface StarsProps {
  vote_average: number
}

const styles = StyleSheet.create({
  stars: {
    flexDirection: 'row',
  },
})

export default function Stars({ vote_average }: StarsProps) {
  return (
    <View style={styles.stars}>
      {Array(Math.floor(vote_average / 2)).fill(
        <MaterialIcons name="star" size={24} color={StyleGuide.yellow} />,
      )}
      {vote_average / 2 > Math.floor(vote_average / 2) && (
        <MaterialIcons name="star-half" size={24} color={StyleGuide.yellow} />
      )}
    </View>
  )
}
