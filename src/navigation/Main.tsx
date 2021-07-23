import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Landing from '../screens/Landing'
import BottomTab from './BottomTab'
import Details from '../screens/Details'

import Header from '../components/Header'

import StyleGuide from '../utils/StyleGuide'

const { Navigator, Screen } = createStackNavigator()

export default function Main() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Landing" component={Landing} />
      <Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          headerShown: true,
          header: (props: any) => {
            if (props.scene.route.state.index !== 1) {
              return <Header />
            }
          },
        }}
      />
      <Screen
        name="Details"
        component={Details}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: StyleGuide.text,
          title: '',
        }}
      />
    </Navigator>
  )
}
