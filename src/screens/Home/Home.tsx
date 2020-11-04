import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  getAiringTodayTvShows,
  getPlayingNowMovies,
  getPopularMovies,
  getPopularTvShows,
} from '../../services/api'
import { MovieResult, TvResult } from 'moviedb-promise/dist/request-types'

import Header from '../../components/Header'
import StyleGuide from '../../components/StyleGuide'
import List from './List'
import Button from './Button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.background,
    paddingHorizontal: 20,
  },

  row: {
    flexDirection: 'row',
    flexGrow: 0.05,
  },

  scrollView: {
    flex: 1,
  },
})

export default function Home() {
  const [isTv, setisTv] = useState(true)

  const [tvData, setTvData] = useState<{
    popularTvShows: TvResult[]
    airingTodayTvShows: TvResult[]
  }>({
    popularTvShows: [],
    airingTodayTvShows: [],
  })

  const [moviesData, setMoviesData] = useState<{
    popularMovies: MovieResult[]
    playingNowMovies: MovieResult[]
  }>({
    popularMovies: [],
    playingNowMovies: [],
  })

  useEffect(() => {
    async function fetchData() {
      if (isTv) {
        const popular = await getPopularTvShows()
        const airingNow = await getAiringTodayTvShows()

        const data = {
          popularTvShows: popular!,
          airingTodayTvShows: airingNow!,
        }

        setTvData(data)
      } else {
        const popular = await getPopularMovies()
        const playingNow = await getPlayingNowMovies()

        const data = {
          popularMovies: popular!,
          playingNowMovies: playingNow!,
        }

        setMoviesData(data)
      }
    }

    fetchData()
  }, [isTv])

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.row}>
        <Button
          name="TvShows"
          icon="tv"
          color={isTv ? StyleGuide.text : StyleGuide.background}
          backgroundColor={isTv ? StyleGuide.primary : StyleGuide.text}
          onPress={() => setisTv((state) => !state)}
        />
        <Button
          name="Movies"
          icon="movie"
          color={isTv ? StyleGuide.background : StyleGuide.text}
          backgroundColor={isTv ? StyleGuide.text : StyleGuide.primary}
          onPress={() => setisTv((state) => !state)}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <List
          name="Popular"
          data={isTv ? tvData.popularTvShows : moviesData.popularMovies}
        />
        <List
          name="Today"
          data={isTv ? tvData.airingTodayTvShows : moviesData.playingNowMovies}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
