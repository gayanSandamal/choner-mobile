import React, { useEffect, useState } from "react"
import Card from "../Base/Card"
import { View, ImageBackground, StyleSheet } from "react-native"
import Label from "../Base/Label"
import { FontColors, FontTypes, IconNames, InputSizes } from "@/types/Components"
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

const DiagnosisWidget = () => {
  const [challange, setChallenge] = useState<{ imageUri: string, label: string } | null>(null)
  useEffect(() => {
    setChallenge(
      {
        imageUri: 'https://media.istockphoto.com/id/484942652/photo/how-long-can-you-hold-a-plank.jpg?s=612x612&w=0&k=20&c=mNewkXYasZNinXInIB18vqR7Gqnoz9SnfINCYeEQBfs=',
        label: `RUN A\nSELF-DIAGNOSis`
      }
    )
    setIntersts(36)
  }, [])

  const [interests, setIntersts] = useState<number>(0)

  const labelText = () => {
    return `  ${interests > 1 ? 'Days' : 'Day'} without diagnostics!`
  }

  const count = interests > 99 ? '99+' : interests

  return (
    <Card backgroundColor={{ colorBase: '#FE8C00', colorSecondary: '#F83600' }}>
      <View className="flex items-start">
        <Label type={FontTypes.FTitle1Bold} label={challange?.label} containerStyles={{ letterSpacing: 3, fontWeight: 700, lineHeight: 30 }}></Label>
        <View className="flex flex-row items-end w-full mt-2 mb-4" style={{ height: 28 }}>
          <Label type={FontTypes.FDisplay3} label={String(count)} color={'#96FD9A'} containerStyles={{ letterSpacing: 1, fontWeight: 700 }}></Label>
          <Label type={FontTypes.FLabel} label={labelText()} containerStyles={{ letterSpacing: 1, fontWeight: 600 }}></Label>
        </View>
        <Btn icon={IconNames.biceps} label="Let's Rev Up!" size={InputSizes.md} iconHeight={18} outlined />
      </View>
    </Card>
  )
}

export default DiagnosisWidget
