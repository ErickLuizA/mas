import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import Screens from '../../src/navigation/Main'

export const Screen = (initialRouteName: string) => (
  <NavigationContainer>
    <Screens initialRouteName={initialRouteName} />
  </NavigationContainer>
)
