import { renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react-native'

import api from '../../src/services/api'
import useMovies from '../../src/hooks/useMovies'

jest.mock('../../src/services/api')

const mockedAxios = api as jest.Mocked<typeof api>

describe('useMovies hook', () => {
  it('should begin with loading true in initial state object', async () => {
    const { result } = renderHook(() => useMovies())

    expect(result.current.moviesData).toStrictEqual({
      loading: true,
      error: '',
      popularMovies: [],
      latestMovies: [],
    })

    await waitFor(() => true)
  })

  it('should return success object if api call is successful', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: { results: [] },
      }),
    )

    const { result } = renderHook(() => useMovies())

    expect(result.current.moviesData).toStrictEqual({
      loading: true,
      error: '',
      popularMovies: [],
      latestMovies: [],
    })

    await waitFor(() => {
      expect(result.current.moviesData).toStrictEqual({
        loading: false,
        error: '',
        popularMovies: [],
        latestMovies: [],
      })
    })
  })

  it('should return error object if api call is unsuccessful', async () => {
    mockedAxios.get.mockReturnValue(Promise.reject('Some error'))

    const { result } = renderHook(() => useMovies())

    await waitFor(() => {
      expect(result.current.moviesData).toStrictEqual({
        loading: false,
        error: 'Error while getting movies data',
        popularMovies: [],
        latestMovies: [],
      })
    })
  })
})
