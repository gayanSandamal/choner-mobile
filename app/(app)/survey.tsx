import Icon from "@/components/Base/Icon"
import Label from "@/components/Base/Label"
import { SurveyModal } from "@/components/Common/SurveyModal"
import { MainWrapper } from "@/components/Wrappers/MainWrapper"
import { Colors } from "@/constants/Colors"
import { useFetchSurvey } from "@/hooks/get/useFetchSurvey"
import { useAuthUserId } from "@/hooks/useAuthUser"
import { FontTypes, IconNames } from "@/types/Components"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"

export default function Survey() {
    const uid = useAuthUserId()
    const [showModal, setShowModal] = useState<boolean>(false)

    const { data: survey, isFetching, refetch } = useFetchSurvey(uid || '', false, false)

    useEffect(() => { !!uid && refetch() }, [uid])

    return (
        <MainWrapper>
            <View className="w-full h-full bg-grey items-center justify-center">
                {isFetching && <ActivityIndicator size={40} color={Colors.light.white} />}
                {survey && !isFetching && (
                    <>
                        <Text className="text-center" style={{ fontSize: 22, color: Colors.light.white }}>Wanna Help <Text style={{ fontSize: 22, fontWeight: 500, color: Colors.dark["soundcloud-gdr-1"] }}>choner</Text> to be more Personalized for You?</Text>
                        <TouchableOpacity className="mt-6" style={{ width: '60%', height: 36, borderRadius: 30, borderWidth: 1, borderColor: Colors.dark["soundcloud-gdr-1"], backgroundColor: Colors.dark["soundcloud-gdr-1"], flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowModal(true)}>
                            <Label label={`JUST ${survey?.questions?.length} QUESTIONS`} type={FontTypes.FLabelBold} />
                            <Icon classNames="mr-[-5px] mt-[1px]" name={IconNames.chevronMiniRight} />
                        </TouchableOpacity>
                        <TouchableOpacity className="mt-3" style={{ width: '60%', height: 36, borderRadius: 30, borderWidth: 1, borderColor: Colors.dark["soundcloud-gdr-1"], flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => router.replace('/')}>
                            <Label label="ANSWER LATER" type={FontTypes.FLabelBold} color={Colors.dark["soundcloud-gdr-1"]} />
                            <Icon classNames="mr-[-5px] mt-[1px]" name={IconNames.chevronMiniRight} color={Colors.dark["soundcloud-gdr-1"]} />
                        </TouchableOpacity>
                    </>
                )}
            </View>
            {showModal && survey && (
                <SurveyModal uid={uid || ''} isFeedback={false} surveyData={survey} hideNavigateBack showForm={showModal} setShowForm={setShowModal} setProgress={() => { }} />
            )}
        </MainWrapper>
    )
}