import React, { useEffect, useState } from "react"
import Card from "../Base/Card"
import { View, TouchableOpacity} from "react-native"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes, SurveyData } from "@/types/Components"
import PieChart from 'react-native-pie-chart'
import { Colors } from "@/constants/Colors"
import Icon from "../Base/Icon"
import { SurveyModal } from "../Common/SurveyModal"
import CircularProgress from "../Common/CircularProgress"

const surveyData: SurveyData = {
  title: 'FOR GENERAL HEALTH AND WELLNESS',
  completedForms: [
    {
      pageId: `1`,
      optionIds: [`2`]
    },
    {
      pageId: `2`,
      optionIds: [`2`, `1`]
    }
  ],
  pages: [
    {
      id: `1`,
      description: 'How would you rate your overall quality of sleep in the past week?',
      options: [
        {
          id: `1`,
          description: 'Very poor sleep: Less than 4 hours'
        },
        {
          id: `2`,
          description: 'Very poor sleep: Less than 4 hours'
        },
        {
          id: `3`,
          description: 'Very poor sleep: Less than 4 hours'
        },
        {
          id: `4`,
          description: 'Very poor sleep: Less than 4 hours'
        },
        {
          id: `5`,
          description: 'Very poor sleep: Less than 4 hours'
        },
      ],
      type: {}
    },
    {
      id: `2`,
      description: 'How would you rate your overall quality of sleep in the past week? 2',
      options: [
        {
          id: `1`,
          description: 'Very poor sleep: Less than 4 hours 2'
        },
        {
          id: `2`,
          description: 'Very poor sleep: Less than 4 hours 2'
        },
        {
          id: `3`,
          description: 'Very poor sleep: Less than 4 hours 2'
        },
        {
          id: `4`,
          description: 'Very poor sleep: Less than 4 hours 2'
        },
        {
          id: `5`,
          description: 'Very poor sleep: Less than 4 hours 2'
        },
      ],
      type: { mutiSelect: true}
    }
  ]
}

const SurveyWidget = () => {
  const [surveyStatus, setSurveyStatus] = useState<number[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)

  const widthAndHeight = 100
  const sliceColor = [Colors.dark['primary-material-1'], Colors.dark.background]

  useEffect(() => {
    const fill = 60
    setSurveyStatus([fill, 100 - fill])
  }, [])

  return (
    <>
      <Card backgroundColor={{ colorBase: '#003E62', colorSecondary: '#003E62' }} containerStyles={{ minHeight: 190 }}>
        <TouchableOpacity className="flex items-center justify-center" onPress={() => setShowForm(true)}>
          <View className="flex flex-row w-full justify-start">
            <Icon classNames="mr-2 mt-2" color={Colors.dark.background} name={IconNames.survey} size={InputSizes.xs} />
            <Label type={FontTypes.FTitle3} label={'FEEDBACK\nFORM'} containerStyles={{ letterSpacing: 1, fontWeight: 700 }} classNames="mb-3"></Label>
          </View>
          <View className="flex items-center align-center justify-center">
            <CircularProgress colors={[Colors.dark["primary-material-1"], Colors.dark["primary-material-1"]]} progress={50} size={103} strokeWidth={10} />
          </View>
        </TouchableOpacity>
      </Card>
      <SurveyModal surveyData={surveyData} showForm={showForm} setShowForm={setShowForm} />
    </>
  )
}

export default SurveyWidget
