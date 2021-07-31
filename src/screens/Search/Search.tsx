import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import useSearch from '../../hooks/useSearch'

import SearchBox from './SearchBox'
import Card from '../../components/Card'

import StyleGuide from '../../utils/StyleGuide'

import styles from './styles'

export default function Search() {
  const { navigate } = useNavigation()

  const [searchQuery, setSearchQuery] = useState('')

  const { searchResult, getSearched } = useSearch()

  function handleSubmit() {
    if (searchQuery) {
      getSearched(searchQuery)
    }
  }

  if (searchResult.loading) {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBox
          onChangeText={() => {}}
          value={searchQuery}
          onSubmitEditing={() => {}}
        />
        <ActivityIndicator
          testID="Search_loading_indicator_test"
          style={styles.flex}
          color={StyleGuide.text}
          size={30}
        />
      </SafeAreaView>
    )
  }

  if (searchResult.error) {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBox
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSubmit}
        />
        <View style={styles.flex}>
          <Text style={styles.text}>{searchResult.error}</Text>
          <RectButton
            testID="Search_try_again_button_test"
            onPress={handleSubmit}>
            <Text style={styles.text}>Click to try again</Text>
          </RectButton>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSubmit}
      />

      <FlatList
        data={searchResult.data}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              navigate('Details', {
                item: {
                  type: item.media_type === 'tv' ? 'tvShow' : 'movie',
                  data: item,
                },
              })
            }
            key={item.id}
            name={item.name || item.title}
            date={item.first_air_date || item.release_date}
            image={item.poster_path || item.backdrop_path}
            vote_average={item.vote_average}
          />
        )}
      />
    </SafeAreaView>
  )
}
