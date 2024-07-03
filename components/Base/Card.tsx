import { CardProps } from "@/types/Components"
import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  background: {
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
  const { borderColor = borderColorInitial, backgroundColor = bgColorInitial, children, classNames, containerStyles, gap = true } = props
  return (
    <LinearGradient
      className={`rounded-xl ${classNames}`}
      colors={[borderColor.colorBase, borderColor.colorSecondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.background, containerStyles]}
    >
      <LinearGradient
        className={`rounded-xl ${gap && 'p-4'}`}
        colors={[backgroundColor.colorBase, backgroundColor.colorSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.foreground}
      >
        {children}
      </LinearGradient>
    </LinearGradient>
  )
}

export default Card;