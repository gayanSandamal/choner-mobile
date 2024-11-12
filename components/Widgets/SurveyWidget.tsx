import React, { useEffect, useState } from "react"
import Card from "../Base/Card"
import { View, TouchableOpacity, ActivityIndicator } from "react-native"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import Icon from "../Base/Icon"
import { SurveyModal } from "../Common/SurveyModal"
import CircularProgress from "../Common/CircularProgress"
import { useFetchSurvey } from "@/hooks/get/useFetchSurvey"

type SurveyWidgetProps = {
  uid: string
}

const SurveyWidget = ({uid}: SurveyWidgetProps) => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const { data: survey, isFetching } = useFetchSurvey(uid || '', true, !!uid)

  useEffect(() => {
    if (survey && survey !== 'completed') {
      const selectedOptionsCount = survey?.completedForms.filter((option: any) => !!option?.optionIds && option?.optionIds?.length > 0).length
      const answeredTextsCount = survey?.completedForms.filter((option: any) => option.text && option.text?.trim() !== '').length

      const currentProgress = (selectedOptionsCount + answeredTextsCount) / survey.questions.length * 100
      setProgress(currentProgress)
    }
  }, [survey])

  return (
    <>
      <Card backgroundColor={{ colorBase: '#003E62', colorSecondary: '#003E62' }} containerStyles={{ minHeight: 190 }}>
        <TouchableOpacity className="flex items-center justify-center" onPress={() => survey && setShowForm(true)}>
          <View className="flex flex-row w-full justify-start">
            <Icon classNames="mr-2 mt-2" color={Colors.dark.background} name={IconNames.survey} size={InputSizes.xs} />
            <Label type={FontTypes.FTitle3} label={'FEEDBACK\nFORM'} containerStyles={{ letterSpacing: 1, fontWeight: 700 }} classNames="mb-3"></Label>
          </View>
          <View className="flex items-center align-center justify-center">
            {!survey && isFetching && <ActivityIndicator className="mt-8" size={30} color={Colors.light.white} />}
            {survey && survey !== 'completed' && !isFetching && <CircularProgress colors={[Colors.dark["primary-material-1"], Colors.dark["primary-material-1"]]} progress={progress} size={103} strokeWidth={10} />}
            {survey === 'completed' && <Label classNames="mt-10" label="Completed!" type={FontTypes.FDisplay4} color={Colors.dark["green-shade-1"]} />}
          </View>
        </TouchableOpacity>
      </Card>
      {survey && survey !== 'completed' && <SurveyModal uid={uid} isFeedback={true} surveyData={survey} showForm={showForm} setShowForm={setShowForm} setProgress={setProgress} />}
    </>
  )
}

export default SurveyWidget
