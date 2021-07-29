import React from 'react'
import { View, Text } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Header from '../../src/components/Header'

const { Navigator, Screen } = createStackNavigator()

const SearchComponent = () => (
  <View>
    <Text>Search</Text>
  </View>
)

describe('Header component', () => {
  it('should navigate when button is pressed', () => {
    const { queryByTestId, getByText } = render(
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen component={Header} name="Header" />
          <Screen component={SearchComponent} name="Search" />
        </Navigator>
      </NavigationContainer>,
    )

    const button = queryByTestId('header_button_test')

    expect(button).not.toBeNull()

    fireEvent.press(button!)

    expect(getByText('Search')).not.toBeNull()
  })
})
