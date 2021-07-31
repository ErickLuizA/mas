import { fireEvent, render, waitFor } from '@testing-library/react-native'

import { Screen } from '../../testUtils/renderBottomTabNavigation'
import { mockMovieData } from '../../testUtils/mockMovieData'

import api from '../../../src/services/api'

jest.mock('../../../src/services/api')

const mockedAxios = api as jest.Mocked<typeof api>

describe('Search Screen', () => {
  it('should render Search screen correctly', async () => {
    const { queryByPlaceholderText } = render(Screen('Search'))

    await waitFor(() => {
      expect(
        queryByPlaceholderText('Search for a movie or series'),
      ).not.toBeNull()
    })
  })

  it('should show loading then error when api returns error', async () => {
    const { queryByTestId, queryByText } = render(Screen('Search'))

    await waitFor(async () => {
      fireEvent.changeText(queryByTestId('Search_text_input_test')!, 'hello')
      fireEvent(queryByTestId('Search_text_input_test')!, 'submitEditing')

      await expect(
        queryByTestId('Search_loading_indicator_test'),
      ).not.toBeNull()

      expect(queryByText('Error while trying to search')).not.toBeNull()
      expect(queryByText('Click to try again')).not.toBeNull()
    })
  })

  it('should call api when try again button is pressed', async () => {
    mockedAxios.get.mockResolvedValue(Promise.reject('Error'))

    const { queryByTestId } = render(Screen('Search'))

    fireEvent.changeText(queryByTestId('Search_text_input_test')!, 'hello')

    fireEvent(queryByTestId('Search_text_input_test')!, 'submitEditing')

    const called = mockedAxios.get.mock.results.length

    await waitFor(() => {
      fireEvent.press(queryByTestId('Search_try_again_button_test')!)
      expect(mockedAxios.get.mock.results.length > called).toBe(true)
    })
  })

  it('should not call api when text input is empty', async () => {
    mockedAxios.get.mockResolvedValue(Promise.reject('Error'))

    const { queryByTestId } = render(Screen('Search'))

    const called = mockedAxios.get.mock.results.length

    await waitFor(async () => {
      fireEvent(queryByTestId('Search_text_input_test')!, 'submitEditing')

      expect(mockedAxios.get.mock.results.length === called).toBe(true)
    })
  })

  it('should show loading then success when api returns data', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: {
          results: [mockMovieData.data],
        },
      }),
    )

    const { queryByTestId, queryByText } = render(Screen('Search'))

    await waitFor(async () => {
      fireEvent.changeText(queryByTestId('Search_text_input_test')!, 'hello')
      fireEvent(queryByTestId('Search_text_input_test')!, 'submitEditing')

      await expect(
        queryByTestId('Search_loading_indicator_test'),
      ).not.toBeNull()

      expect(queryByText('Black Widow')).not.toBeNull()
    })
  })

  it('should change display value when text is changed', async () => {
    const { queryByTestId, queryByDisplayValue } = render(Screen('Search'))

    await waitFor(async () => {
      fireEvent.changeText(queryByTestId('Search_text_input_test')!, 'hello')

      expect(queryByDisplayValue('hello')).not.toBeNull()
    })
  })
})
