import { MovieResult, TvResult } from 'moviedb-promise/dist/request-types'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import Header from '../../components/Header'
import List from '../../components/List'
import StyleGuide from '../../components/StyleGuide'
import moviedb from '../../services/api'

const { width } = Dimensions.get('window')

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

  rectButton: {
    width: width * 0.3,
    height: width * 0.2,
    marginRight: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rectButtonText: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  text: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 20,
    color: StyleGuide.text,
    marginBottom: 10,
  },
})

export default function Home() {
  const [tv, setTv] = useState(true)
  const [popularTv, setPopularTv] = useState<TvResult[]>([])
  const [airingTv, setAiringTv] = useState<TvResult[]>([])
  const [popularMovies, setPopularMovies] = useState<MovieResult[]>([])
  const [airingMovies, setAiringMovies] = useState<MovieResult[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tv) {
          const { results } = await moviedb.tvPopular()
          const { results: tvAiringToday } = await moviedb.tvAiringToday()

          setPopularTv(results!)
          setAiringTv(tvAiringToday!)
        } else {
          const { results } = await moviedb.moviePopular()
          const { results: movieNowPlaying } = await moviedb.movieNowPlaying()

          setPopularMovies(results!)
          setAiringMovies(movieNowPlaying!)
        }
      } catch (e) {
        alert('Not internet connection')
      }
    }

    fetchData()
  }, [tv])

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.row}>
        <RectButton
          onPress={() => setTv((prev) => !prev)}
          style={[
            styles.rectButton,
            { backgroundColor: tv ? StyleGuide.primary : StyleGuide.text },
          ]}>
          <>
            <MaterialIcons
              name="movie"
              size={24}
              color={tv ? StyleGuide.text : StyleGuide.background}
            />
            <Text
              style={[
                styles.rectButtonText,
                { color: tv ? StyleGuide.text : StyleGuide.background },
              ]}>
              TvShows
            </Text>
          </>
        </RectButton>
        <RectButton
          onPress={() => setTv((prev) => !prev)}
          style={[
            styles.rectButton,
            { backgroundColor: tv ? StyleGuide.text : StyleGuide.primary },
          ]}>
          <>
            <MaterialIcons
              name="tv"
              size={24}
              color={tv ? StyleGuide.background : StyleGuide.text}
            />
            <Text
              style={[
                styles.rectButtonText,
                {
                  color: tv ? StyleGuide.background : StyleGuide.text,
                },
              ]}>
              Movies
            </Text>
          </>
        </RectButton>
      </View>

      <ScrollView style={styles.scrollView}>
        {tv ? (
          <>
            <List name="Popular TvShows" popularData={popularTv} />
            <List name="Airing today TvShows" airingData={airingTv} />
          </>
        ) : (
          <>
            <List name="Popular Movies" popularData={popularMovies} />
            <List name="Recent Movies" airingData={airingMovies} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
