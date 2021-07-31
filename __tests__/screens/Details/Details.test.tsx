import { fireEvent, render, waitFor } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Screen } from '../../testUtils/renderMainNavigation'
import { mockMovieData } from '../../testUtils/mockMovieData'

jest.mock('@react-native-async-storage/async-storage')
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {
      item: mockMovieData,
    },
  }),
}))

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>

describe('Details Screen', () => {
  it('should render Details screen with given props', async () => {
    const { queryByText } = render(Screen('Details'))

    await waitFor(() => {
      expect(queryByText('Black Widow')).not.toBeNull()
      expect(queryByText('Sinopse')).not.toBeNull()
      expect(queryByText('overview')).not.toBeNull()
    })
  })

  it('should show favorite-border if isFavorite from useIsFavorite hook returns false', async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(Promise.reject())

    const { queryByA11yLabel } = render(Screen('Details'))

    await waitFor(() => {
      expect(queryByA11yLabel('favorite-border')).not.toBeNull()
    })
  })

  it('should show favorite if isFavorite from useIsFavorite hook returns true', async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(
      Promise.resolve(JSON.stringify([mockMovieData])),
    )

    const { queryByA11yLabel } = render(Screen('Details'))

    await waitFor(() => {
      expect(queryByA11yLabel('favorite')).not.toBeNull()
    })
  })

  it('should change isFavorite state when toggleFavorite function is fired', async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(
      Promise.resolve(JSON.stringify([mockMovieData])),
    )

    const { queryByA11yLabel, queryByTestId } = render(Screen('Details'))

    await waitFor(async () => {
      expect(queryByA11yLabel('favorite')).not.toBeNull()

      await fireEvent.press(queryByTestId('Details_button_test')!)

      expect(queryByA11yLabel('favorite-border')).not.toBeNull()
    })
  })
})
