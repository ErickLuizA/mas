import React, { useState } from 'react'
import { ActivityIndicator, View, Text, FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import useFavorites from '../../hooks/useFavorites'

import Card from '../../components/Card'

import StyleGuide from '../../utils/StyleGuide'

import styles from './styles'

export default function Favorites() {
  const { navigate } = useNavigation()

  const { favorites, retryGetFavorites } = useFavorites()

  const [refreshing, setRefreshing] = useState(false)

  async function handleRefresh() {
    setRefreshing(true)

    await retryGetFavorites()

    setRefreshing(false)
  }

  if (favorites.loading) {
    return (
      <View style={styles.alternativeContainer}>
        <ActivityIndicator color={StyleGuide.text} size={30} />
      </View>
    )
  }

  if (favorites.error) {
    return (
      <View style={styles.alternativeContainer}>
        <Text style={styles.text}>{favorites.error}</Text>
        <RectButton onPress={retryGetFavorites}>
          <Text style={styles.text}>Click to try again</Text>
        </RectButton>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {Boolean(favorites) && (
        <FlatList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          data={favorites.data}
          keyExtractor={(item) => item.data.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                navigate('Details', {
                  item,
                })
              }
              key={item.data.id}
              name={item.type === 'tvShow' ? item.data.name : item.data.title}
              date={
                item.type === 'tvShow'
                  ? item.data.first_air_date
                  : item.data.release_date
              }
              image={item.data.poster_path}
              vote_average={item.data.vote_average}
            />
          )}
        />
      )}
    </View>
  )
}
