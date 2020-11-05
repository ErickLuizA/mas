import AsyncStorage from '@react-native-community/async-storage'
import {
  MovieResult,
  PersonResult,
  TvResult,
} from 'moviedb-promise/dist/request-types'

type Result = MovieResult | TvResult | PersonResult

export const getFromStorage = async (item: Result) => {
  const favorites = await AsyncStorage.getItem('@Mas/favorites')
  let favoritesArray: Result[] = []

  if (favorites) {
    favoritesArray = JSON.parse(favorites) as Result[]
  }

  const favoriteIndex = favoritesArray.findIndex((fav) => item.id === fav.id)

  if (favoriteIndex !== -1) {
    return true
  }

  return false
}

export const getAllFromStorage = async () => {
  const response = await AsyncStorage.getItem('@Mas/favorites')
  return JSON.parse(response!) as Result[]
}

export const addToStorage = async (item: Result) => {
  const favorites = await AsyncStorage.getItem('@Mas/favorites')
  let favoritesArray: Result[] = []

  if (favorites) {
    favoritesArray = JSON.parse(favorites) as Result[]
  }

  const favoriteIndex = favoritesArray.findIndex((fav) => item === fav)

  if (favoriteIndex === -1) {
    favoritesArray.push(item)
  }

  await AsyncStorage.setItem('@Mas/favorites', JSON.stringify(favoritesArray))
}

export const removeFromStorage = async (item: Result) => {
  const favorites = await AsyncStorage.getItem('@Mas/favorites')
  let favoritesArray: Result[] = []

  if (favorites) {
    favoritesArray = JSON.parse(favorites) as Result[]
  }

  const favoriteIndex = favoritesArray.findIndex((fav) => item === fav)

  if (favoriteIndex !== -1) {
    favoritesArray.splice(favoriteIndex, 1)
  }

  await AsyncStorage.setItem('@Mas/favorites', JSON.stringify(favoritesArray))
}
