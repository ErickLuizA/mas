import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { MovieResult, TvResult } from 'moviedb-promise/dist/request-types'
import { FlatList } from 'react-native-gesture-handler'
import Card from './Card'
import StyleGuide from '../../components/StyleGuide'
import { useNavigation } from '@react-navigation/native'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'

const { width } = Dimensions.get('window')

interface ListProps {
  name: string

  data: (TvResult | MovieResult)[]
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  text: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 20,
    color: StyleGuide.text,
    marginBottom: 10,
  },

  shimmerCard: {
    width: width * 0.4,
    height: width * 0.5,
    borderRadius: 10,
    marginRight: 10,
  },

  row: {
    flexDirection: 'row',
  },
})

export default function List({ name, data }: ListProps) {
  const { navigate } = useNavigation()
  return (
    <View style={styles.container}>
      <>
        <Text style={styles.text}> {name} </Text>
        {data.length === 0 ? (
          <View style={styles.row}>
            {Array(3).fill(<ShimmerPlaceholder style={styles.shimmerCard} />)}
          </View>
        ) : (
          <FlatList
            horizontal
            renderItem={({ item }) => (
              <Card
                onPress={() =>
                  navigate('Details', {
                    item,
                  })
                }
                id={item.id!}
                name={item.name! || item.title!}
                poster_path={item.poster_path!}
              />
            )}
            data={data}
            keyExtractor={(item) => item.id?.toString()!}
          />
        )}
      </>
    </View>
  )
}
