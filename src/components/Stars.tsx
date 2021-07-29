import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import StyleGuide from '../utils/StyleGuide'

interface StarsProps {
  vote_average: number
}

export default function Stars({ vote_average = 0 }: StarsProps) {
  return (
    <View style={styles.stars}>
      {Array(Math.floor(vote_average / 2))
        .fill('')
        .map((val, index) => (
          <MaterialIcons
            testID="Stars_star_test"
            key={index}
            name="star"
            size={24}
            color={StyleGuide.yellow}
          />
        ))}

      {vote_average / 2 > Math.floor(vote_average / 2) && (
        <MaterialIcons
          testID="Stars_half_star_test"
          key="half-star"
          name="star-half"
          size={24}
          color={StyleGuide.yellow}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  stars: {
    flexDirection: 'row',
  },
})
