import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MovieResult, TvResult } from 'moviedb-promise/dist/request-types'
import { FlatList } from 'react-native-gesture-handler'
import Card from './Card'
import StyleGuide from '../../components/StyleGuide'
import { useNavigation } from '@react-navigation/native'

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
})

export default function List({ name, data }: ListProps) {
  const { navigate } = useNavigation()
  return (
    <View style={styles.container}>
      <>
        <Text style={styles.text}> {name} </Text>
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
      </>
    </View>
  )
}
