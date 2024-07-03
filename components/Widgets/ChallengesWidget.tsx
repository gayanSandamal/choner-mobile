import React, { useEffect, useState } from "react"
import Card from "../Base/Card"
import { View, ImageBackground, StyleSheet } from "react-native"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes } from "@/types/Components"
import { Btn } from "../Base/Button"

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: `rgba(0,0,0,0.7)`
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})

const ChallengesWidget = () => {
  const [challange, setChallenge] = useState<{ imageUri: string, label: string } | null>(null)
  useEffect(() => {
    setChallenge(
      {
        imageUri: 'https://media.istockphoto.com/id/484942652/photo/how-long-can-you-hold-a-plank.jpg?s=612x612&w=0&k=20&c=mNewkXYasZNinXInIB18vqR7Gqnoz9SnfINCYeEQBfs=',
        label: `3 MINS \nPLANK CHALLENGE`
      }
    )
  }, [])

  return (
    <Card gap={false}>
      <ImageBackground source={{ uri: challange?.imageUri }} resizeMode="cover" style={styles.image}>
        <View className="p-4 flex items-start" style={styles.overlay}>
          <Label type={FontTypes.FTitle1Bold} label={challange?.label} containerStyles={{ letterSpacing: 3, fontWeight: 700, lineHeight: 30 }} classNames="mb-10"></Label>
          <Btn icon={IconNames.fist} label="LET'S DO IT" size={InputSizes.md} iconHeight={18} outlined />
        </View>
      </ImageBackground>
    </Card>
  )
}

export default ChallengesWidget
