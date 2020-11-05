import React, { useState } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import StyleGuide from '../../components/StyleGuide'
import SearchBox from './SearchBox'
import Card from '../../components/Card'
import {
  MovieResult,
  PersonResult,
  TvResult,
} from 'moviedb-promise/dist/request-types'
import { useNavigation } from '@react-navigation/native'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import { getSearch } from '../../services/api'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.background,
  },

  scroll: {
    alignItems: 'center',
    flex: 0.95,
  },

  shimmerCard: {
    width: width * 0.8,
    height: width * 0.25,
    borderRadius: 10,
    marginVertical: 10,
  },
})

export default function Search() {
  const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(true)
  // eslint-disable-next-line no-spaced-func
  const [items, setItems] = useState<
    (MovieResult | TvResult | PersonResult)[] | undefined
  >([])

  const { navigate } = useNavigation()

  async function handleSubmit() {
    setVisible(false)
    const response = await getSearch(search)

    setItems(response)
    setVisible(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox
        onChangeText={(text) => setSearch(text)}
        value={search}
        onSubmitEditing={handleSubmit}
      />

      {!visible && (
        <View style={styles.scroll}>
          {Array(10).fill(
            <ShimmerPlaceholder visible={visible} style={styles.shimmerCard} />,
          )}
        </View>
      )}

      <View style={styles.scroll}>
        {items!.length > 0 && visible && (
          <FlatList
            data={items}
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
