import React, { useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'
import { MaterialIcons } from '@expo/vector-icons'

import { Movie } from '../../models/Movie'
import { TvShow } from '../../models/TvShow'

import useMovies from '../../hooks/useMovies'
import useTvShows from '../../hooks/useTvShows'

import StyleGuide from '../../components/StyleGuide'

import Card from './Card'
import ListView from './ListView'

import styles from './styles'

export default function Home() {
  const [isTv, setisTv] = useState(true)

  const { tvShowsData } = useTvShows()
  const { moviesData } = useMovies()

  const { navigate } = useNavigation()

  if (tvShowsData.loading || moviesData.loading) {
    return <ActivityIndicator />
  }

  if (tvShowsData.error || moviesData.error) {
    return <Text>Error</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <RectButton
          onPress={() => setisTv((state) => !state)}
          style={[
            styles.rectButton,
            {
              backgroundColor: isTv ? StyleGuide.primary : StyleGuide.text,
            },
          ]}>
          <>
            <MaterialIcons
              name="tv"
              size={24}
              color={isTv ? StyleGuide.text : StyleGuide.background}
            />
            <Text
              style={[
                styles.rectButtonText,
                {
                  color: isTv ? StyleGuide.text : StyleGuide.background,
                },
              ]}>
              Tv Shows
            </Text>
          </>
        </RectButton>
        <RectButton
          onPress={() => setisTv((state) => !state)}
          style={[
            styles.rectButton,
            {
              backgroundColor: isTv ? StyleGuide.text : StyleGuide.primary,
            },
          ]}>
          <>
            <MaterialIcons
              name="movie"
              size={24}
              color={isTv ? StyleGuide.background : StyleGuide.text}
            />
            <Text
              style={[
                styles.rectButtonText,
                {
                  color: isTv ? StyleGuide.background : StyleGuide.text,
                },
              ]}>
              Movies
            </Text>
          </>
        </RectButton>
      </View>

      <ScrollView>
        {isTv ? (
          <>
            <ListView
              name="Popular"
              data={tvShowsData.popularTvShows}
              renderItem={({ item }: { item: TvShow }) => (
                <Card
                  id={item.id}
                  name={item.name}
                  poster_path={item.poster_path}
                  onPress={() =>
                    navigate('Details', {
                      item,
                    })
                  }
                />
              )}
            />

            <ListView
              name="Latest"
              data={tvShowsData.latestTvShows}
              renderItem={({ item }: { item: TvShow }) => (
                <Card
                  id={item.id}
                  name={item.name}
                  poster_path={item.poster_path}
                  onPress={() =>
                    navigate('Details', {
                      item,
                    })
                  }
                />
              )}
            />
          </>
        ) : (
          <>
            <ListView
              name="Popular"
              data={moviesData.popularMovies}
              renderItem={({ item }: { item: Movie }) => (
                <Card
                  id={item.id}
                  name={item.title}
                  poster_path={item.poster_path}
                  onPress={() =>
                    navigate('Details', {
                      item,
                    })
                  }
                />
              )}
            />

            <ListView
              name="Latest"
              data={moviesData.latestMovies}
              renderItem={({ item }: { item: Movie }) => (
                <Card
                  id={item.id}
                  name={item.title}
                  poster_path={item.poster_path}
                  onPress={() =>
                    navigate('Details', {
                      item,
                    })
                  }
                />
              )}
            />
          </>
        )}
      </ScrollView>
    </View>
  )
}
