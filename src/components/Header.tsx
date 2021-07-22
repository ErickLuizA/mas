import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import icon from '../images/icon.png'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import StyleGuide from './StyleGuide'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Header() {
  const { navigate } = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Image source={icon} />
      <RectButton
        rippleColor={StyleGuide.primary}
        onPress={() => navigate('Search')}>
        <MaterialIcons name="search" size={30} color="#ddd" />
      </RectButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: StyleGuide.background,
    paddingHorizontal: 12,
  },
})
