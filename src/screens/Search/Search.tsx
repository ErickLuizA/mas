import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import StyleGuide from '../../components/StyleGuide'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.background,
  },
})

export default function Search() {
  return (
    <SafeAreaView style={styles.container}>
      <Text> Hello Search </Text>
    </SafeAreaView>
  )
}
