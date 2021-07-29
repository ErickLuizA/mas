import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

import StyleGuide from '../utils/StyleGuide'

import icon from '../images/icon.png'

export default function Header() {
  const { navigate } = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Image source={icon} />
      <RectButton
        testID="header_button_test"
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
