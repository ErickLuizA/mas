import { useState } from 'react'

import { SearchResult } from '../models/SearchResult'
import { ApiResponse } from '../models/ApiResponse'

import api from '../services/api'

type SearchResultState = {
  loading: boolean
  error: string
  data: SearchResult[]
}

export default function useSearch() {
  const [searchResult, setSearchResult] = useState<SearchResultState>({
    loading: false,
    error: '',
    data: [],
  })

  async function getSearched(query: string) {
    setSearchResult((state) => ({
      ...state,
      loading: true,
    }))

    try {
      const response = await api.get<ApiResponse<SearchResult>>(
        '/search/multi',
        {
          params: { query },
        },
      )

      setSearchResult({
        loading: false,
        error: '',
        data: response.data.results,
      })
    } catch (error) {
      setSearchResult({
        loading: false,
        error: 'Error while trying to search',
        data: [],
      })
    }
  }

  return { searchResult, getSearched }
}
