import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Landing from '../screens/Landing'
import BottomTab from './BottomTab'
// import Details from '../screens/Details'
import Header from '../components/Header'

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
          header: (props) => {
            if (props.scene.route.name !== 'search') {
              return <Header />
            }
          },
        }}
      />
      {/* <Screen name="Details" component={Details} /> */}
    </Navigator>
  )
}
