import { renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react-native'

import api from '../../src/services/api'
import useTvShows from '../../src/hooks/useTvShows'

jest.mock('../../src/services/api')

const mockedAxios = api as jest.Mocked<typeof api>

describe('useTvShows hook', () => {
  it('should begin with loading true in initial state object', async () => {
    const { result } = renderHook(() => useTvShows())

    expect(result.current.tvShowsData).toStrictEqual({
      loading: true,
      error: '',
      popularTvShows: [],
      latestTvShows: [],
    })

    await waitFor(() => true)
  })

  it('should return success object if api call is successful', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: { results: [{}] },
      }),
    )

    const { result } = renderHook(() => useTvShows())

    expect(result.current.tvShowsData).toStrictEqual({
      loading: true,
      error: '',
      popularTvShows: [],
      latestTvShows: [],
    })

    await waitFor(() => {
      expect(result.current.tvShowsData).toStrictEqual({
        loading: false,
        error: '',
        popularTvShows: [{}],
        latestTvShows: [{}],
      })
    })
  })

  it('should return error object if api call is unsuccessful', async () => {
    mockedAxios.get.mockReturnValue(Promise.reject('Some error'))

    const { result } = renderHook(() => useTvShows())

    await waitFor(() => {
      expect(result.current.tvShowsData).toStrictEqual({
        loading: false,
        error: 'Error while getting TvShows data',
        popularTvShows: [],
        latestTvShows: [],
      })
    })
  })
})
