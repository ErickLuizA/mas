import { useEffect, useState } from 'react'
import { ApiResponse } from '../models/ApiResponse'
import { Movie } from '../models/Movie'
import api from '../services/api'

type MoviesData = {
  loading: boolean
  error: string
  popularMovies: Movie[]
  latestMovies: Movie[]
}

export default function useMovies() {
  const [moviesData, setMoviesData] = useState<MoviesData>({
    loading: true,
    error: '',
    popularMovies: [],
    latestMovies: [],
  })

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      try {
        const [popularResponse, latestResponse] = await Promise.all([
          api.get<ApiResponse<Movie>>('/movie/popular'),
          api.get<ApiResponse<Movie>>('/movie/now_playing'),
        ])

        setMoviesData({
          loading: false,
          error: '',
          popularMovies: popularResponse.data.results,
          latestMovies: latestResponse.data.results,
        })
      } catch (error) {
        setMoviesData((state) => ({
          ...state,
          loading: false,
          error: 'Error while getting movies data',
        }))
      }
    })()
  }, [])

  return { moviesData }
}
