import { fireEvent, render, waitFor } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Screen } from '../../testUtils/renderBottomTabNavigation'
import { mockMovieData } from '../../testUtils/mockMovieData'

jest.mock('@react-native-async-storage/async-storage')

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>

describe('Favorites Screen', () => {
  it('should render Favorites screen and briefly show loading indicator', async () => {
    const { queryByTestId } = render(Screen('Favorites'))

    expect(queryByTestId('Favorites_loading_indicator_test')).not.toBeNull()

    await waitFor(() => {
      expect(queryByTestId('Favorites_loading_indicator_test')).toBeNull()
    })
  })

  it('should show error screen when useFavorites returns error', async () => {
    mockedAsyncStorage.getItem.mockReturnValue(Promise.reject('Error'))

    const { queryByText } = render(Screen('Favorites'))

    await waitFor(() => {
      expect(
        queryByText('Error while getting favorites from storage'),
      ).not.toBeNull()
      expect(queryByText('Click to try again')).not.toBeNull()
    })
  })

  it('should call retryGetFavorites when try again button is pressed', async () => {
    mockedAsyncStorage.getItem.mockReturnValue(Promise.reject('Error'))

    const { queryByTestId } = render(Screen('Favorites'))

    const called = mockedAsyncStorage.getItem.mock.results.length

    await waitFor(() => {
      fireEvent.press(queryByTestId('Favorites_try_again_button_test')!)
      expect(mockedAsyncStorage.getItem.mock.results.length > called).toBe(true)
    })
  })

  it('should show success screen when useFavorites returns data', async () => {
    mockedAsyncStorage.getItem.mockReturnValue(
      Promise.resolve(JSON.stringify([mockMovieData])),
    )

    const { queryByText, queryByTestId } = render(Screen('Favorites'))

    await waitFor(() => {
      expect(queryByTestId('Favorites_flat_list_test')).not.toBeNull()
      expect(queryByText('Black Widow')).not.toBeNull()
    })
  })

  it('should show success screen without flat list when api returns empty data', async () => {
    mockedAsyncStorage.getItem.mockReturnValue(
      Promise.resolve(JSON.stringify([])),
    )

    const { queryByTestId } = render(Screen('Favorites'))

    await waitFor(() => {
      expect(queryByTestId('Favorites_flat_list_test')).toBeNull()
    })
  })

  it('should call retryGetFavorites when flat list is refreshed', async () => {
    mockedAsyncStorage.getItem.mockReturnValue(
      Promise.resolve(JSON.stringify([mockMovieData])),
    )
    const { queryByTestId } = render(Screen('Favorites'))

    const called = mockedAsyncStorage.getItem.mock.results.length

    await waitFor(() => {
      fireEvent(
        queryByTestId('Favorites_flat_list_test')!.props.refreshControl,
        'refresh',
      )

      expect(mockedAsyncStorage.getItem.mock.results.length > called).toBe(true)
    })
  })
})
