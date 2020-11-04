import React from 'react'
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import StyleGuide from '../../components/StyleGuide'
import { RectButton } from 'react-native-gesture-handler'
import Stars from '../../components/Stars'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.background,
  },

  close: {
    position: 'absolute',
    right: 10,
    top: 20,
  },

  backImg: { position: 'absolute', width, height: width * 0.9, opacity: 0.2 },

  img: {
    width,
    height: width * 0.8,
    resizeMode: 'contain',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  text: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 18,
    color: StyleGuide.text,
  },

  smallText: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    color: StyleGuide.text,
    textAlign: 'left',
  },

  box: {
    paddingHorizontal: 20,
  },
})

type ParamList = {
  Details: {
    item: {
      backdrop_path: string
      id: number
      name: string
      original_language: string
      original_name: string
      overview: string
      popularity: number
      poster_path: string
      vote_average: number
    }
  }
}

type DetailsScreenRouteProp = RouteProp<ParamList, 'Details'>

export default function Details() {
  const { params } = useRoute<DetailsScreenRouteProp>()
  const { goBack } = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${params.item.poster_path}`,
          }}
          style={styles.backImg}
        />
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${params.item.poster_path}`,
          }}
          style={styles.img}
        />
        <RectButton style={styles.close} onPress={() => goBack()}>
          <MaterialIcons name="close" size={40} color={StyleGuide.text} />
        </RectButton>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>{params.item.title || params.item.name}</Text>
        <MaterialIcons
          name="favorite-border"
          size={30}
          color={StyleGuide.text}
        />
      </View>
      <View style={styles.row}>
        <Stars vote_average={params.item.vote_average} />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Sinopse </Text>
        <Text style={styles.smallText}>{params.item.overview} </Text>
      </View>
    </SafeAreaView>
  )
}
