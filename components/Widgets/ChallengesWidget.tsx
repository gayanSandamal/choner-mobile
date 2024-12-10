import React, { useEffect, useState } from "react"
import Card from "../Base/Card"
import { View, ImageBackground, StyleSheet } from "react-native"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes } from "@/types/Components"
import { Btn } from "../Base/Button"
import { router } from "expo-router"

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: `rgba(0,0,0,0.7)`,
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
        imageUri: './../../assets/images/challenge-image.jpg',
        label: `CHALLENGE OR\nBE CHALLENGED`
      }
    )
  }, [])

  return (
    <Card gap={false}>
      <ImageBackground source={require('./../../assets/images/challenge-image.jpg')} resizeMode="cover" style={styles.image}>
        <View className="p-4 flex items-start" style={styles.overlay}>
          <Label type={FontTypes.FTitle1Bold} label={challange?.label} containerStyles={{ letterSpacing: 3, fontWeight: 700, lineHeight: 30 }} classNames="mb-10"></Label>
          <Btn icon={IconNames.fist} label="LET'S DO IT" size={InputSizes.md} iconHeight={18} outlined onPress={() => router.navigate('/(app)/(tabs)/challenges/on-going-challenges')}/>
        </View>
      </ImageBackground>
    </Card>
  )
}

export default ChallengesWidget
