import AsyncStorage from '@react-native-async-storage/async-storage'
import { renderHook, act } from '@testing-library/react-hooks'

import useIsFavorite, { FavoriteMovie } from '../../src/hooks/useIsFavorite'

jest.mock('@react-native-async-storage/async-storage')

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>

beforeEach(async () => await mockedAsyncStorage.clear())

describe('useIsFavorite hook', () => {
  const favoriteItem: FavoriteMovie = {
    type: 'movie',
    data: {
      poster_path: 'string',
      adult: false,
      overview: 'string',
      release_date: 'string',
      genre_ids: [1, 2],
      id: 1,
      original_title: 'Black Widow',
      original_language: 'string',
      title: 'string',
      backdrop_path: 'string',
      popularity: 1,
      vote_count: 1,
      video: false,
      vote_average: 1,
    },
  }

  describe('Get Favorite', () => {
    it('should begin with isFavorite false in initial state', async () => {
      const { result, waitFor } = renderHook(() =>
        useIsFavorite({ item: favoriteItem }),
      )

      expect(result.current.isFavorite).toBe(false)

      await waitFor(() => true)
    })

    it('should return true in isFavorite if async storage finds item', async () => {
      mockedAsyncStorage.getItem.mockResolvedValue(
        Promise.resolve(JSON.stringify([favoriteItem])),
      )

      const { result, waitFor } = renderHook(() =>
        useIsFavorite({ item: favoriteItem }),
      )

      await waitFor(() => {
        expect(result.current.isFavorite).toBe(true)
      })
    })

    it('should return false in isFavorite if async storage does not finds item', async () => {
      mockedAsyncStorage.getItem.mockResolvedValue(
        Promise.resolve(JSON.stringify([{ type: 'movie', data: { id: 2 } }])),
      )

      const { result, waitFor } = renderHook(() =>
        useIsFavorite({ item: favoriteItem }),
      )

      await waitFor(() => {
        expect(result.current.isFavorite).toBe(false)
      })
    })

    it('should return false in isFavorite if async storage throws error', async () => {
      mockedAsyncStorage.getItem.mockResolvedValue(Promise.reject())

      const { result, waitFor } = renderHook(() =>
        useIsFavorite({ item: favoriteItem }),
      )

      await waitFor(() => {
        expect(result.current.isFavorite).toBe(false)
      })
    })
  })

  describe('Toggle Favorite', () => {
    it('should return true in isFavorite if async storage does not finds item', async () => {
      mockedAsyncStorage.getItem.mockResolvedValue(
        Promise.resolve(JSON.stringify([{ type: 'movie', data: { id: 2 } }])),
      )

      const { result, waitFor } = renderHook(() =>
        useIsFavorite({ item: favoriteItem }),
      )

      await act(async () => await result.current.toggleFavorite())

      await waitFor(() => {
        expect(result.current.isFavorite).toBe(true)
        expect(mockedAsyncStorage.setItem).toBeCalledWith(
          '@Mas/favorites',
          JSON.stringify([{ type: 'movie', data: { id: 2 } }, favoriteItem]),
        )
      })
    })

    it('should return false in isFavorite if async storage finds item', async () => {
      mockedAsyncStorage.getItem.mockResolvedValue(
        Promise.resolve(JSON.stringify([favoriteItem])),
      )

      const { result, waitFor } = renderHook(() =>
        useIsFavorite({ item: favoriteItem }),
      )

      await act(async () => await result.current.toggleFavorite())

      await waitFor(() => {
        expect(result.current.isFavorite).toBe(false)
        expect(mockedAsyncStorage.setItem).toBeCalledWith(
          '@Mas/favorites',
          JSON.stringify([]),
        )
      })
    })
  })
})
