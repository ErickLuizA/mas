import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Landing from '../screens/Landing'
import BottomTab from './BottomTab'
import Details from '../screens/Details'

const { Navigator, Screen } = createStackNavigator()

export default function Main() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="BottomTab" component={BottomTab} />
        <Screen name="Details" component={Details} />
      </Navigator>
    </NavigationContainer>
  )
}
