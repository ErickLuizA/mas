import React from 'react'
import { View, Text, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import cinema from '../../images/cinema.png'
import mas from '../../images/mas.png'

import styles from './styles'

export default function Landing() {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <Image source={cinema} style={styles.image} />
      <Image source={mas} style={styles.icon} />
      <RectButton style={styles.button} onPress={() => navigate('BottomTab')}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </RectButton>
    </View>
  )
}
