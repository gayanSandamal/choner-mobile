import { CardProps } from "@/types/Components"
import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  background: {
    height: 150,
    width: '100%'
  },
  foreground: {
    flex: 1,
    margin: 1
  }
})

const Card = (props: CardProps) => {
  const borderColorInitial = {
    colorBase: Colors.dark.background,
    colorSecondary: Colors.dark.background
  }
  const bgColorInitial = {
    colorBase: Colors.dark.grey,
    colorSecondary: Colors.dark.grey
  }
  const { borderColor = borderColorInitial, backgroundColor = bgColorInitial } = props
  return (
    <LinearGradient
      className="rounded-xl"
      colors={[borderColor.colorBase, borderColor.colorSecondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.background}
    >
      <LinearGradient
        className="rounded-xl p-4"
        colors={[backgroundColor.colorBase, backgroundColor.colorSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.foreground}
      >
        <Text>THIS GRADIENT BORDER</Text>
      </LinearGradient>
    </LinearGradient>
  )
}

export default Card;