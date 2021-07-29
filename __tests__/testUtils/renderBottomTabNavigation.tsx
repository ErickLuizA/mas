import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import BottomTab from '../../src/navigation/BottomTab'

export const Screen = (initialRouteName: string) => (
  <NavigationContainer>
    <BottomTab initialRouteName={initialRouteName} />
  </NavigationContainer>
)
