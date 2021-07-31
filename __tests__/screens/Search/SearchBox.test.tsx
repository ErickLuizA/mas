import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'

import SearchBox from '../../../src/screens/Search/SearchBox'

describe('Search SearchBox component', () => {
  it('should render SearchBox with given props', () => {
    const { getByDisplayValue } = render(
      <SearchBox
        value="hello"
        onChangeText={() => {}}
        onSubmitEditing={() => {}}
      />,
    )

    expect(getByDisplayValue('hello')).not.toBeNull()
  })

  it('should call onChangeText with given param when text is changed', () => {
    const mockOnChangeText = jest.fn()

    const { getByTestId } = render(
      <SearchBox
        value=""
        onChangeText={mockOnChangeText}
        onSubmitEditing={() => {}}
      />,
    )

    fireEvent.changeText(getByTestId('Search_text_input_test'), 'new Text')

    expect(mockOnChangeText).toHaveBeenCalledWith('new Text')
  })

  it('should call onSubmitEditing with given param when text is submited', () => {
    const mockOnSubmitEditing = jest.fn()

    const { getByTestId } = render(
      <SearchBox
        value=""
        onChangeText={() => {}}
        onSubmitEditing={mockOnSubmitEditing}
      />,
    )

    fireEvent(getByTestId('Search_text_input_test')!, 'submitEditing')

    expect(mockOnSubmitEditing).toHaveBeenCalled()
  })
})
