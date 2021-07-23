import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import Home from '../screens/Home/Home'
import Search from '../screens/Search'
import Favorites from '../screens/Favorites'

import StyleGuide from '../utils/StyleGuide'

const { Navigator, Screen } = createBottomTabNavigator()

export default function BottomTab() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          backgroundColor: StyleGuide.primary,
          borderTopWidth: 0,
          height: 60,
          justifyContent: 'center',
        },
        labelStyle: {
          fontSize: 12,
          paddingBottom: 4,
        },
        activeTintColor: StyleGuide.text,
        inactiveTintColor: StyleGuide.background,
      }}>
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="home" size={size} color={color} />
          },
        }}
      />
      <Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="search" size={size} color={color} />
          },
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="favorite-border" size={size} color={color} />
            )
          },
        }}
      />
    </Navigator>
  )
}
