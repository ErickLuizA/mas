import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import Card from '../../src/components/Card'

describe('Card component', () => {
  it('should render given props in Text', () => {
    const { getByText } = render(
      <Card
        name="Batman"
        date="20220304"
        image=""
        onPress={() => {}}
        vote_average={1}
      />,
    )

    expect(getByText('2022')).not.toBeNull()
    expect(getByText('Batman')).not.toBeNull()
  })

  it('should not render date Text if no date in props', () => {
    const { queryByText } = render(
      <Card
        name="Batman"
        date=""
        image=""
        onPress={() => {}}
        vote_average={1}
      />,
    )

    expect(queryByText('2022')).toBeNull()
  })

  it('should call onPress function when button is pressed', () => {
    const onPressMock = jest.fn()

    const { queryByTestId } = render(
      <Card
        name="Batman"
        date=""
        image=""
        onPress={onPressMock}
        vote_average={1}
      />,
    )

    fireEvent.press(queryByTestId('card_button_test')!)

    expect(onPressMock).toBeCalled()
    expect(onPressMock.mock.calls.length).toBe(1)
  })
})
