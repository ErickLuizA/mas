import AsyncStorage from '@react-native-async-storage/async-storage'
import { renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react-native'

import useFavorites from '../../src/hooks/useFavorites'

jest.mock('@react-native-async-storage/async-storage')

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>

describe('useFavorites hook', () => {
  it('should begin with loading true in initial state object', async () => {
    const { result } = renderHook(() => useFavorites())

    expect(result.current.favorites).toStrictEqual({
      loading: true,
      error: '',
      data: [],
    })

    await waitFor(() => true)
  })

  it('should return favorite array data in favorites object if async storage finds item', async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(Promise.resolve('["hello"]'))

    const { result } = renderHook(() => useFavorites())

    await waitFor(() => {
      expect(result.current.favorites).toStrictEqual({
        loading: false,
        error: '',
        data: ['hello'],
      })
    })
  })

  it('should return empty array data in favorites object if async storage does not finds item', async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(Promise.resolve(null))

    const { result } = renderHook(() => useFavorites())

    await waitFor(() => {
      expect(result.current.favorites).toStrictEqual({
        loading: false,
        error: '',
        data: [],
      })
    })
  })

  it('should return error in favorites object if async storage throws error', async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(Promise.reject())

    const { result } = renderHook(() => useFavorites())

    await waitFor(() => {
      expect(result.current.favorites).toStrictEqual({
        loading: false,
        error: 'Error while getting favorites from storage',
        data: [],
      })
    })
  })
})
