import { useEffect, useState } from 'react'
import { ApiResponse } from '../models/ApiResponse'
import { TvShow } from '../models/TvShow'
import api from '../services/api'

type TvShowsData = {
  loading: boolean
  error: string
  popularTvShows: TvShow[]
  latestTvShows: TvShow[]
}

export default function useTvShows() {
  const [tvShowsData, setTvShowsData] = useState<TvShowsData>({
    loading: true,
    error: '',
    popularTvShows: [],
    latestTvShows: [],
  })

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      try {
        const [popularResponse, latestResponse] = await Promise.all([
          api.get<ApiResponse<TvShow>>('/tv/popular'),
          api.get<ApiResponse<TvShow>>('/tv/airing_today'),
        ])

        setTvShowsData({
          loading: false,
          error: '',
          popularTvShows: popularResponse.data.results,
          latestTvShows: latestResponse.data.results,
        })
      } catch (error) {
        setTvShowsData((state) => ({
          ...state,
          loading: false,
          error: 'Error while getting TvShows data',
        }))
      }
    })()
  }, [])

  return { tvShowsData }
}
