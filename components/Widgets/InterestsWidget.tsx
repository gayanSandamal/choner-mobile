import React, { useEffect, useState } from "react"
import Card from "../Base/Card"
import { View, ImageBackground, StyleSheet, TouchableOpacity } from "react-native"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes } from "@/types/Components"
import PieChart from 'react-native-pie-chart'
import { Colors } from "@/constants/Colors"
import Icon from "../Base/Icon"
import Svg, { Circle } from "react-native-svg"
import { router } from "expo-router"

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#003E62'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})

const InterestsWidget = () => {
  const [interests, setIntersts] = useState<number>(0)

  useEffect(() => {
    setIntersts(7)
  }, [])

  const labelText = () => {
    let gap = `    `
    const charCount = String(interests).length
    if (charCount > 2) {
      gap = gap + gap + gap + ' '
    } else if (charCount > 1) {
      gap = gap + gap + ' '
    }
    return `${gap} ${interests > 1 ? 'People' : 'Person'} share same interests as you`
  }

  const count = interests > 99 ? '99+' : interests

  return (
    <Card backgroundColor={{ colorBase: '#FC466B', colorSecondary: '#3F5EFB' }} classNames="flex justify-center align-center" containerStyles={{ minHeight: 190 }}>
      <Svg width="175" height="175" viewBox="0 0 175 175" fill="none" style={{ position: 'absolute' }}>
        <Circle opacity="0.2" cx="88" cy="88" r="84.5" stroke="#FE8C00" />
        <Circle opacity="0.2" cx="88" cy="88" r="99.5" stroke="#FE8C00" />
        <Circle opacity="0.2" cx="88" cy="88" r="69.5" stroke="#FE8C00" />
        <Circle opacity="0.2" cx="88" cy="88" r="49.5" stroke="#FE8C00" />
        <Circle opacity="0.2" cx="88" cy="88" r="24.5" stroke="#FE8C00" />
        <Circle opacity="0.2" cx="88" cy="88" r="9.5" stroke="#FE8C00" />
      </Svg>

      <TouchableOpacity className="flex align-between justify-center mb-1" onPress={() => router.push({pathname: '/profile', params: {data: JSON.stringify({toInterest: true})}})}>
        <View className="flex flex-row items-start w-full justify-start mb-10">
          <Icon color={Colors.dark.background} name={IconNames.interests} size={InputSizes.xs} />
          <Label type={FontTypes.FTitle3} label={'INTERESTS'} containerStyles={{ letterSpacing: 1, fontWeight: 700 }} classNames="mb-3"></Label>
        </View>
        <View className="flex flex-row w-full mt-8">
          <Label type={FontTypes.FDisplay3} label={String(count)} containerStyles={{ letterSpacing: 1, fontWeight: 700, position: 'absolute', bottom: 24 }}></Label>
          <Label type={FontTypes.FLabel} label={labelText()} containerStyles={{ letterSpacing: 1 }}></Label>
        </View>
      </TouchableOpacity>
    </Card>
  )
}

export default InterestsWidget
