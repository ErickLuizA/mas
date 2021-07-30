import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import Card from '../../../src/screens/Home/Card'

describe('Home Card component', () => {
  it('should render with given name props', () => {
    const { getByText } = render(
      <Card name="name" onPress={() => {}} id={1} poster_path="" />,
    )

    expect(getByText('name')).not.toBeNull()
  })

  it('should call function when button is pressed', () => {
    const onPress = jest.fn()

    const { getByTestId } = render(
      <Card name="name" onPress={onPress} id={1} poster_path="" />,
    )

    fireEvent.press(getByTestId('Card_button_test'))

    expect(onPress).toHaveBeenCalled()
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
