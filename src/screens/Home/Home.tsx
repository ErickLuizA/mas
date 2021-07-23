import React, { useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
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

  const { tvShowsData, retryGetTvShows } = useTvShows()
  const { moviesData, retryGetMovies } = useMovies()

  const { navigate } = useNavigation()

  if (tvShowsData.loading || moviesData.loading) {
    return (
      <View style={styles.alternativeContainer}>
        <ActivityIndicator color={StyleGuide.text} size={30} />
      </View>
    )
  }

  if (tvShowsData.error || moviesData.error) {
    return (
      <View style={styles.alternativeContainer}>
        <Text style={styles.text}>
          {tvShowsData.error ? tvShowsData.error : moviesData.error}
        </Text>
        <RectButton
          onPress={async () => {
            if (tvShowsData.error) {
              await retryGetTvShows()
            }

            if (tvShowsData.error) {
              await retryGetMovies()
            }
          }}>
          <Text style={styles.text}>Click to try again</Text>
        </RectButton>
      </View>
    )
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
                      item: { type: 'tvShow', data: item },
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
                      item: { type: 'tvShow', data: item },
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
                      item: { type: 'movie', data: item },
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
                      item: { type: 'movie', data: item },
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
