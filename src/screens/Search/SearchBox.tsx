import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import StyleGuide from '../../utils/StyleGuide'

interface SearchBoxProps {
  onChangeText: (text: string) => void
  value: string
  onSubmitEditing: () => void
}

export default function SearchBox({
  onChangeText,
  value,
  onSubmitEditing,
}: SearchBoxProps) {
  return (
    <View style={styles.container}>
      <TextInput
        testID="Search_text_input_test"
        autoCapitalize="words"
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 5,
    marginBottom: 12,
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
