import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Roboto_300Light,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { AppLoading } from 'expo'
import { NavigationContainer } from '@react-navigation/native'

import Screens from './src/navigation/Main'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Screens />
    </NavigationContainer>
  )
}
