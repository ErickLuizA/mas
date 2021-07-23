import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Movie } from '../models/Movie'
import { TvShow } from '../models/TvShow'

type FavoriteMovie = {
  type: 'movie'
  data: Movie
}

type FavoriteTvShow = {
  type: 'tvShow'
  data: TvShow
}

type Favorite = FavoriteTvShow | FavoriteMovie

type Favorites = {
  loading: boolean
  error: string
  data: Favorite[]
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Favorites>({
    loading: true,
    error: '',
    data: [],
  })

  useEffect(() => {
    getFavorites()
  }, [])

  async function getFavorites() {
    const storagedFavs = await AsyncStorage.getItem('@Mas/favorites')

    let favoritesArray: Favorite[] = []

    if (storagedFavs) {
      favoritesArray = JSON.parse(storagedFavs)
    }

    setFavorites({
      data: favoritesArray,
      error: '',
      loading: false,
    })
  }

  async function retryGetFavorites() {
    await getFavorites()
  }

  return { favorites, retryGetFavorites }
}
