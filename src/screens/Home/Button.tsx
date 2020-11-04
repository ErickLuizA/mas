import React from 'react'
import { Dimensions, StyleSheet, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'

interface ButtonProps {
  name: string
  icon: string
  color: string
  backgroundColor: string
  onPress: () => void
}
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
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
})

export default function Button({
  onPress,
  backgroundColor,
  color,
  name,
  icon,
}: ButtonProps) {
  return (
    <RectButton
      {...{ onPress }}
      style={[styles.rectButton, { backgroundColor }]}>
      <>
        <MaterialIcons name={icon} size={24} color={color} />
        <Text
          style={[
            styles.rectButtonText,
            {
              color,
            },
          ]}>
          {name}
        </Text>
      </>
    </RectButton>
  )
}
