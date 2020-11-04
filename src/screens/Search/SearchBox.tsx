import React from 'react'
import { View, StyleSheet, Dimensions, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import StyleGuide from '../../components/StyleGuide'

interface SearchBoxProps {
  onChangeText: (text: string) => void
  value: string
  onSubmitEditing: () => void
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    paddingVertical: 12,
    paddingHorizontal: 5,
    backgroundColor: StyleGuide.lightBackground,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },

  input: {
    color: StyleGuide.text,
  },
})

export default function SearchBox({
  onChangeText,
  value,
  onSubmitEditing,
}: SearchBoxProps) {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="words"
        autoFocus
        enablesReturnKeyAutomatically
        returnKeyType="search"
        placeholder="Search for a movie or series"
        placeholderTextColor={StyleGuide.text}
        style={styles.input}
        {...{ onChangeText }}
        {...{ value }}
        {...{ onSubmitEditing }}
      />
      <MaterialIcons name="search" size={30} color={StyleGuide.text} />
    </View>
  )
}
