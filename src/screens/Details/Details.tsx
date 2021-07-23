import React from 'react'
import { View, Image, Text, ScrollView } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RectButton } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'

import { Movie } from '../../models/Movie'
import { TvShow } from '../../models/TvShow'

import useIsFavorite from '../../hooks/useIsFavorite'

import Stars from '../../components/Stars'

import StyleGuide from '../../utils/StyleGuide'

import styles from './styles'

type MovieDetails = {
  type: 'movie'
  data: Movie
}

type TvShowDetails = {
  type: 'tvShow'
  data: TvShow
}

type DetailsItem = MovieDetails | TvShowDetails

type ParamList = {
  Details: {
    item: DetailsItem
  }
}

type DetailsScreenRouteProp = RouteProp<ParamList, 'Details'>

export default function Details() {
  const {
    params: { item },
  } = useRoute<DetailsScreenRouteProp>()
  const { isFavorite, toggleFavorite } = useIsFavorite({
    item: item,
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.data.poster_path}`,
            }}
            style={styles.backImg}
          />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.data.poster_path}`,
            }}
            style={styles.img}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            {item.type === 'tvShow' ? item.data.name : item.data.title}
          </Text>
          <RectButton onPress={toggleFavorite}>
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={30}
              color={StyleGuide.text}
            />
          </RectButton>
        </View>
        <View style={styles.row}>
          <Stars vote_average={item.data.vote_average} />
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Sinopse </Text>
          <Text style={styles.smallText}>{item.data.overview} </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
