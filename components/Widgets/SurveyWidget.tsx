import React, { useEffect, useState } from "react"
import Card from "../Base/Card"
import { View, ImageBackground, StyleSheet, TouchableOpacity } from "react-native"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes } from "@/types/Components"
import PieChart from 'react-native-pie-chart'
import { Colors } from "@/constants/Colors"
import Icon from "../Base/Icon"

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

const SurveyWidget = () => {
  const [surveyStatus, setSurveyStatus] = useState<number[]>([])
  const widthAndHeight = 100
  const sliceColor = [Colors.dark['primary-material-1'], Colors.dark.background]

  useEffect(() => {
    const fill = 60
    setSurveyStatus([fill, 100 - fill])
  }, [])

  return (
    <Card backgroundColor={{ colorBase: '#003E62', colorSecondary: '#003E62' }} containerStyles={{ minHeight: 190 }}>
      <TouchableOpacity className="flex items-center justify-center mb-1" onPress={() => { }}>
        <View className="flex flex-row w-full justify-start">
          <Icon color={Colors.dark.background} name={IconNames.fist} size={InputSizes.sm} />
          <Label type={FontTypes.FTitle3} label={'COMPLETE SURVEY'} containerStyles={{ letterSpacing: 1, fontWeight: 700 }} classNames="mb-3"></Label>
        </View>
        <View className="flex items-center align-center justify-center">
          <Label type={FontTypes.FDisplay3} label={`${surveyStatus?.[0]}%`} containerStyles={{ letterSpacing: 1, position: 'absolute' }}></Label>
          {surveyStatus.length > 0 && <PieChart
            widthAndHeight={widthAndHeight}
            series={surveyStatus}
            sliceColor={sliceColor}
            coverRadius={0.8}
            coverFill={'transparent'}
          />}
        </View>
      </TouchableOpacity>
    </Card>
  )
}

export default SurveyWidget
