import { useEffect, useState } from "react"
import Card from "../Base/Card"
import { View, TouchableOpacity, ActivityIndicator } from "react-native"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import Icon from "../Base/Icon"
import Svg, { Circle } from "react-native-svg"
import { router } from "expo-router"

type InterestsWidgetProps = {
  interests: number,
  isFetching: boolean
}

const InterestsWidget = ({ interests, isFetching }: InterestsWidgetProps) => {
  const [interestCount, setInterestCount] = useState(0)

  useEffect(() => {
    if (!isFetching) {
      setInterestCount(interests)
    }
  }, [isFetching])

  const labelText = () => {
    let gap = `    `
    const charCount = String(interestCount).length
    if (charCount > 2) {
      gap = gap + gap + gap + ' '
    } else if (charCount > 1) {
      gap = gap + gap + ' '
    }
    return interestCount ? `${gap} ${interestCount > 1 ? 'People' : 'Person'} share same interests as you` : 'No similar interests at the moment. \n\nTry sharing an interest!'
  }

  const count = interestCount > 99 ? '99+' : interestCount

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

      <TouchableOpacity className="flex align-between justify-center mb-1" onPress={() => router.push({ pathname: '/(app)/(profile)/profile', params: { data: JSON.stringify({ toInterest: true }) } })}>
        {isFetching ?
          <ActivityIndicator color={Colors.light.white} style={{ alignSelf: 'center', height: 150 }} size={40} /> :
          <>
            <View className="flex flex-row items-start w-full justify-start mb-4">
              <Icon color={Colors.dark.background} name={IconNames.interests} size={InputSizes.xs} />
              <Label type={FontTypes.FTitle3} label={'INTERESTS'} containerStyles={{ letterSpacing: 1, fontWeight: 700 }} classNames="mb-3"></Label>
            </View>
            <View className="flex w-full">
              {interestCount ? (
                <Label type={FontTypes.FDisplay1} label={String(count)} containerStyles={{ letterSpacing: 1, fontWeight: 700, textAlign: 'right' }}></Label>
              ) : null}
              <Label type={FontTypes.FLabel} label={labelText()} containerStyles={{ letterSpacing: 1, textAlign: 'right' }}></Label>
            </View>
          </>
        }
      </TouchableOpacity>
    </Card>
  )
}

export default InterestsWidget
