import AsyncStorage from '@react-native-community/async-storage'

export const getFromStorage = async (item: any) => {
  const favorites = await AsyncStorage.getItem('@Mas/favorites')
  let favoritesArray: string[] = []

  if (favorites) {
    favoritesArray = JSON.parse(favorites)
  }

  const favoriteIndex = favoritesArray.findIndex((fav) => item.id === fav.id)

  if (favoriteIndex !== -1) {
    return true
  }

  return false
}

export const getAllFromStorage = async () => {
  return (await AsyncStorage.getItem('@Mas/favorites')) as any
}

export const addToStorage = async (item: any) => {
  const favorites = await getAllFromStorage()
  let favoritesArray: string[] = []

  if (favorites) {
    favoritesArray = JSON.parse(favorites)
  }

  const favoriteIndex = favoritesArray.findIndex((fav) => item === fav)

  if (favoriteIndex === -1) {
    favoritesArray.push(item)
  }

  await AsyncStorage.setItem('@Mas/favorites', JSON.stringify(favoritesArray))
}

export const removeFromStorage = async (item: any) => {
  const favorites = await getAllFromStorage()
  let favoritesArray: [] = []

  if (favorites) {
    favoritesArray = JSON.parse(favorites)
  }

  const favoriteIndex = favoritesArray.findIndex((fav) => item === fav)

  if (favoriteIndex !== -1) {
    favoritesArray.splice(favoriteIndex, 1)
  }

  await AsyncStorage.setItem('@Mas/favorites', JSON.stringify(favoritesArray))
}
