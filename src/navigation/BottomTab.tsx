import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import Home from '../screens/Home/Home'
import Search from '../screens/Search'
import Favorites from '../screens/Favorites'

const { Navigator, Screen } = createBottomTabNavigator()

const icons = {
  Home: {
    lib: MaterialIcons,
    name: 'home',
  },
  Search: {
    lib: MaterialIcons,
    name: 'search',
  },
  Favorites: {
    lib: MaterialIcons,
    name: 'favorite-border',
  },
}

export default function BottomTab() {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const { lib: Icon, name } = icons[route.name]
          return <Icon name={name} size={size} color={color} />
        },
      })}>
      <Screen name="Home" component={Home} />
      <Screen name="Search" component={Search} />
      <Screen name="Favorites" component={Favorites} />
    </Navigator>
  )
}
