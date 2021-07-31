import { fireEvent, render, waitFor } from '@testing-library/react-native'

import { Screen } from '../../testUtils/renderBottomTabNavigation'

import api from '../../../src/services/api'
import { mockStyleGuide } from '../../testUtils/mockStyleGuide'

jest.mock('../../../src/services/api')

const mockedAxios = api as jest.Mocked<typeof api>

describe('Home Screen', () => {
  it('should render Home screen and briefly show loading indicator', async () => {
    const { queryByTestId, queryByText } = render(Screen('Home'))

    expect(queryByTestId('Home_loading_indicator_test')).not.toBeNull()

    await waitFor(() => {
      expect(queryByText('Click to try again')).not.toBeNull()
      expect(queryByTestId('Home_loading_indicator_test')).toBeNull()
    })
  })

  it('should show error screen when api returns error', async () => {
    mockedAxios.get.mockResolvedValue(Promise.reject('Error'))

    const { queryByText } = render(Screen('Home'))

    await waitFor(() => {
      expect(queryByText('Error while getting TvShows data')).not.toBeNull()
      expect(queryByText('Click to try again')).not.toBeNull()
    })
  })

  it('should call api when try again button is pressed', async () => {
    mockedAxios.get.mockResolvedValue(Promise.reject('Error'))

    const { queryByTestId } = render(Screen('Home'))

    const called = mockedAxios.get.mock.results.length

    await waitFor(() => {
      fireEvent.press(queryByTestId('Home_try_again_button_test')!)
      expect(mockedAxios.get.mock.results.length > called).toBe(true)
    })
  })

  it('should show success screen when api returns data', async () => {
    mockedAxios.get.mockResolvedValue(
      Promise.resolve({
        data: { results: [] },
      }),
    )

    const { queryByText } = render(Screen('Home'))

    await waitFor(() => {
      expect(queryByText('Movies')).not.toBeNull()
      expect(queryByText('Tv Shows')).not.toBeNull()
    })
  })

  it('should change isTv state when tv button is pressed', async () => {
    mockedAxios.get.mockResolvedValue(
      Promise.resolve({
        data: { results: [] },
      }),
    )

    const { queryByTestId } = render(Screen('Home'))

    await waitFor(async () => {
      expect(
        queryByTestId('Home_tv_button_test')?.props.style.backgroundColor,
      ).toBe(mockStyleGuide.primary)

      await fireEvent.press(queryByTestId('Home_tv_button_test')!)

      expect(
        queryByTestId('Home_tv_button_test')?.props.style.backgroundColor,
      ).toBe(mockStyleGuide.text)
    })
  })

  it('should change isTv state when movie button is pressed', async () => {
    mockedAxios.get.mockResolvedValue(
      Promise.resolve({
        data: { results: [] },
      }),
    )

    const { queryByTestId } = render(Screen('Home'))

    await waitFor(async () => {
      expect(
        queryByTestId('Home_movie_button_test')?.props.style.backgroundColor,
      ).toBe(mockStyleGuide.text)

      await fireEvent.press(queryByTestId('Home_movie_button_test')!)

      expect(
        queryByTestId('Home_movie_button_test')?.props.style.backgroundColor,
      ).toBe(mockStyleGuide.primary)
    })
  })
})
