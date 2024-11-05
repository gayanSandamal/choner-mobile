

import React, { useState } from "react"
import { Modal, ScrollView, StyleSheet, View } from "react-native"
import NavigateBack from "./NavigateBack"
import Label from "../Base/Label"
import { BtnDetailed } from "../Base/Button"
import { CompletedForm, FontTypes, IconNames, JustifyContent, SurveyData, SurveyPageData } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { Route, TabView } from "react-native-tab-view"
import { LinearGradient } from "expo-linear-gradient"

const styles = StyleSheet.create({
    back: { width: 86, height: 35, borderRadius: 30, paddingRight: 11, paddingLeft: 7, borderColor: Colors.dark.background },
    next: { width: 86, height: 35, borderRadius: 30, paddingLeft: 16, paddingRight: 7, borderColor: Colors.dark["primary-shade-2"], backgroundColor: Colors.dark["primary-shade-2"] },
    save: { width: 86, height: 35, borderRadius: 30, borderColor: Colors.dark["primary-shade-2"], backgroundColor: Colors.dark["primary-shade-2"] },
    selectedOption: { marginTop: 15, height: 57, borderColor: Colors.dark["soundcloud-gdr-1"], backgroundColor: Colors.dark.darkText },
    notSelectedOption: { marginTop: 15, height: 57, borderColor: Colors.dark["green-shade-3"], backgroundColor: Colors.dark.darkText },
    progressBarContainer: { height: 15, borderRadius: 15, backgroundColor: Colors.dark["grey-shade-2"], overflow: 'hidden' },
})

type SurveyPageProps = {
    surveyPage: SurveyPageData
    selectedOption?: CompletedForm
    setSelectedOption: (option: CompletedForm) => void
    setShowForm: (show: boolean) => void
}

const SurveyPage = (props: SurveyPageProps) => {
    return (
        <ScrollView className="px-3">
            <Label classNames="mt-5 mb-1" type={FontTypes.FTitle3Bold} label={props.surveyPage.description} />
            {props.surveyPage?.options?.map((option, index) =>
                props.selectedOption?.optionId === option.id ? (
                    <BtnDetailed key={index} leftIcon={{ name: IconNames.circleCheck, color: Colors.dark["soundcloud-gdr-1"], viewbox: "0 0 21 21" }} wrapperStyle={styles.selectedOption} label={`${index + 1}. ${option.description}`} labelStyle={{ fontStyle: "italic" }} onPress={() => {props.setSelectedOption({ pageId: props.surveyPage.id })}} />
                ) : (
                    <BtnDetailed key={index} leftIcon={{ name: IconNames.checkCircle, color: Colors.dark["grey-shade-3"], viewbox: "0 0 21 21" }} wrapperStyle={styles.notSelectedOption} label={`${index + 1}. ${option.description}`} labelStyle={{ fontStyle: "italic" }} onPress={() => props.setSelectedOption({ pageId: props.surveyPage.id, optionId: option.id })} />
                )
            )}
            <View className="w-full h-3"/>
        </ScrollView>
    )
}

type SurveyModalProps = {
    showForm: boolean
    surveyData: SurveyData
    setShowForm: (show: boolean) => void
}

export const SurveyModal = (props: SurveyModalProps) => {
    const [selectedOptions, setSelectedOptions] = useState<CompletedForm[]>(props.surveyData.completedForms)
    const [index, setIndex] = useState<number>(0)

    const removeSelectedOption = (option: CompletedForm) => {
        const newOptions = selectedOptions.filter((item) => item.pageId !== option.pageId)
        setSelectedOptions(newOptions)
    }

    const addSelectedOption = (option: CompletedForm) => {
        setSelectedOptions((prevOptions) => {
            const existingOptionIndex = prevOptions.findIndex(item => item.pageId === option.pageId)
    
            if (existingOptionIndex >= 0) {
                const updatedOptions = [...prevOptions]
                updatedOptions[existingOptionIndex] = option
                return updatedOptions
            } else {
                return [...prevOptions, option]
            }
        })
    }
    
    const optionAddOrRemove = (option: CompletedForm) => {
        if (option?.optionId) {
            addSelectedOption(option)
        } else {
            // removeSelectedOption(option)
        }
    }

    const routes = props.surveyData.pages.map((page, idx) => ({
        key: `tab-${idx}`,
        title: `Page ${idx + 1}`,
    }))

    const renderScene = ({ route }: { route: Route }) => {
        const pageIndex = parseInt(route.key.split("-")[1])
        const options = selectedOptions.filter((option) => option.pageId === props.surveyData.pages[pageIndex].id)?.[0] || []
        return (
            <SurveyPage selectedOption={options} surveyPage={props.surveyData.pages[pageIndex]} setSelectedOption={optionAddOrRemove} setShowForm={props.setShowForm} />
        )
    }

    const selectedOptionsCount = selectedOptions.filter((option) => !!option?.optionId).length
    
    const progress = selectedOptionsCount / props.surveyData.pages.length * 100

    return (
        <Modal transparent={true} visible={props.showForm} animationType="fade" onRequestClose={() => props.setShowForm(false)}>
            <View className="w-full h-full bg-grey pt-7">
                <NavigateBack classNames="px-3" label="TAKE THE SURVEY" navigate={() => props.setShowForm(false)} />
                <Label classNames="px-3 mt-5" type={FontTypes.FTitle1} label={(props.surveyData.title).toUpperCase()} containerStyles={{ letterSpacing: 4 }} />
                <View className="w-full px-3">
                    <View className="w-[50%] h-[1px] mt-3" style={{backgroundColor: Colors.dark["grey-shade-4"]}}/>
                </View>
                <View className="mx-3 mt-5" style={styles.progressBarContainer}>
                    <LinearGradient
                        colors={['#FFC837', '#FF8008']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: `${progress}%`, height: '100%', borderRadius: 15 }}
                    />
                </View>
                <TabView renderTabBar={() => null} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} />
                <View className="flex flex-row w-full justify-between items-center pb-3 px-3 pt-2">
                    <BtnDetailed leftIcon={{ name: IconNames.chevronMiniLeft, color: Colors.dark.background, classNames: "mr-[-8px] mt-[1px]" }} disabled={index === 0} wrapperStyle={styles.back} label="BACK" labelStyle={{ fontSize: 14, fontWeight: "400" }} onPress={() => setIndex((prev) => Math.max(prev - 1, 0))} />
                    <Label classNames="mb-3" type={FontTypes.FP} label={`${index + 1} out of ${props.surveyData.pages.length} Questions`} />
                    {index !== props.surveyData.pages.length - 1? (
                        <BtnDetailed rightIcon={{ name: IconNames.chevronMiniRight, color: Colors.dark.background, classNames: "ml-[-8px] mt-[1px]" }} wrapperStyle={styles.next} label="NEXT" labelStyle={{ fontSize: 14, fontWeight: "400" }} onPress={() => setIndex((prev) => Math.min(prev + 1, props.surveyData.pages.length - 1))}
                        />): (
                            <BtnDetailed isLoading={false} loaderSize={21} leftIcon={{ name: IconNames.save, color: Colors.dark.background, classNames: "mr-[-3px]" }} wrapperStyle={styles.save} label="SAVE" labelStyle={{ fontSize: 14, fontWeight: "400" }} onPress={() => {}} />
                        )}
                </View>
            </View>
        </Modal>
    )
}
