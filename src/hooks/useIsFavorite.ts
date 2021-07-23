import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Movie } from '../models/Movie'
import { TvShow } from '../models/TvShow'

interface IUseIsFavoriteProps {
  item: Movie | TvShow
}

export default function useIsFavorite({ item }: IUseIsFavoriteProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const favorites = await AsyncStorage.getItem('@Mas/favorites')
      let favoritesArray: Movie[] | TvShow[] = []

      if (favorites) {
        favoritesArray = JSON.parse(favorites)
      }

      const favoriteIndex = favoritesArray.findIndex(
        (fav) => item.id === fav.id,
      )

      setIsFavorite(favoriteIndex !== -1)
    })()
  }, [item])

  async function toggleFavorite() {
    setIsFavorite((state) => !state)

    const favorites = await AsyncStorage.getItem('@Mas/favorites')

    let favoritesArray: any = []

    if (favorites) {
      favoritesArray = JSON.parse(favorites)
    }

    const favoriteIndex = favoritesArray.findIndex((fav: any) => item === fav)

    if (favoriteIndex === -1) {
      favoritesArray.push(item)
    } else {
      favoritesArray.splice(favoriteIndex, 1)
    }

    await AsyncStorage.setItem('@Mas/favorites', JSON.stringify(favoritesArray))
  }

  return { isFavorite, toggleFavorite }
}
