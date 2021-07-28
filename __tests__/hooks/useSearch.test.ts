import { act, renderHook } from '@testing-library/react-hooks'

import api from '../../src/services/api'
import useSearch from '../../src/hooks/useSearch'
import { waitFor as rnWaitFor } from '@testing-library/react-native'

jest.mock('../../src/services/api')

const mockedAxios = api as jest.Mocked<typeof api>

describe('useSearch hook', () => {
  it('should begin with loading false in initial state object', async () => {
    const { result, waitFor } = renderHook(() => useSearch())

    expect(result.current.searchResult).toStrictEqual({
      loading: false,
      error: '',
      data: [],
    })

    await waitFor(() => true)
  })

  it('should return loading true in object when getSearched is fired', async () => {
    const { result } = renderHook(() => useSearch())

    act(() => {
      result.current.getSearched('')
    })

    expect(result.current.searchResult).toStrictEqual({
      loading: true,
      error: '',
      data: [],
    })

    await rnWaitFor(() => true)
  })

  it('should return success object if api call is successful', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: { results: ['data'] },
      }),
    )

    const { result, waitFor } = renderHook(() => useSearch())

    await act(async () => await result.current.getSearched('query'))

    await waitFor(() => {
      expect(result.current.searchResult).toStrictEqual({
        loading: false,
        error: '',
        data: ['data'],
      })

      expect(mockedAxios.get).toBeCalledWith('/search/multi', {
        params: { query: 'query' },
      })
    })
  })

  it('should return error object if api call is unsuccessful', async () => {
    mockedAxios.get.mockReturnValue(Promise.reject())

    const { result, waitFor } = renderHook(() => useSearch())

    await act(async () => await result.current.getSearched('query'))

    await waitFor(() => {
      expect(result.current.searchResult).toStrictEqual({
        loading: false,
        error: 'Error while trying to search',
        data: [],
      })

      expect(mockedAxios.get).toBeCalledWith('/search/multi', {
        params: { query: 'query' },
      })
    })
  })
})
