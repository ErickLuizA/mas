import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Movie } from '../models/Movie'
import { TvShow } from '../models/TvShow'

interface IUseIsFavoriteProps {
  item: Favorite
}

type FavoriteMovie = {
  type: 'movie'
  data: Movie
}

type FavoriteTvShow = {
  type: 'tvShow'
  data: TvShow
}

type Favorite = FavoriteMovie | FavoriteTvShow

export default function useIsFavorite({ item }: IUseIsFavoriteProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const favorites = await AsyncStorage.getItem('@Mas/favorites')
      let favoritesArray: Favorite[] = []

      if (favorites) {
        favoritesArray = JSON.parse(favorites)
      }

      const favoriteIndex = favoritesArray.findIndex(
        (fav) => item.data.id === fav.data.id,
      )

      setIsFavorite(favoriteIndex !== -1)
    })()
  }, [item])

  async function toggleFavorite() {
    setIsFavorite((state) => !state)

    const favorites = await AsyncStorage.getItem('@Mas/favorites')

    let favoritesArray: Favorite[] = []

    if (favorites) {
      favoritesArray = JSON.parse(favorites)
    }

    const favoriteIndex = favoritesArray.findIndex(
      (fav) => item.data.id === fav.data.id,
    )

    if (favoriteIndex !== -1) {
      favoritesArray.splice(favoriteIndex, 1)
    } else {
      favoritesArray.push(item)
    }

    await AsyncStorage.setItem('@Mas/favorites', JSON.stringify(favoritesArray))
  }

  return { isFavorite, toggleFavorite }
}
