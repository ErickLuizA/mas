import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import StyleGuide from '../../components/StyleGuide'

interface IListViewProps {
  name: string
  data: any[]
  renderItem: ({ item }: { item: any }) => JSX.Element
}

export default function ListView({ name, data, renderItem }: IListViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> {name} </Text>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },

  separator: {
    width: 12,
  },

  text: {
    marginVertical: 12,
    color: StyleGuide.text,
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
  },
})
