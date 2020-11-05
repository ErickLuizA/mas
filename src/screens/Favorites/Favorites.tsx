import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAllFromStorage } from '../../services/storage'

import Header from '../../components/Header'
import StyleGuide from '../../components/StyleGuide'
import Card from '../../components/Card'
import { FlatList } from 'react-native-gesture-handler'
import {
  MovieResult,
  PersonResult,
  TvResult,
} from 'moviedb-promise/dist/request-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.background,
    paddingHorizontal: 20,
  },

  scroll: {
    alignItems: 'center',
    flex: 0.95,
  },
})

export default function Favorites() {
  const [favorites, setFavorites] = useState<
    (MovieResult | TvResult | PersonResult)[]
  >([])
  const { navigate } = useNavigation()

  useLayoutEffect(() => {
    const fetchFavorites = async () => {
      const response = await getAllFromStorage()

      setFavorites(response)
    }

    fetchFavorites()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.scroll}>
        {Boolean(favorites) && (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <Card
                onPress={() => navigate('Details', { item })}
                key={item.id}
                name={item.name! || item.title!}
                date={item.first_air_date}
                image={item.poster_path || item.backdrop_path}
                vote_average={item.vote_average}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}
