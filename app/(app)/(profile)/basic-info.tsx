
import { CharmBtn } from "@/components/Base/Button"
import UpdateBasicInfo from "@/components/ProfileOptions/UpdateBasicInfo"
import { MainWrapper } from "@/components/Wrappers/MainWrapper"
import { IconNames, InputSizes } from "@/types/Components"
import { router } from "expo-router"
import { View } from "react-native"

export default function BasicInfo() {
    return (
        <MainWrapper>
            <View style={{ position: 'absolute', width: 35, justifyContent: 'center',left: 10, top: 70, overflow: 'visible' }}>
                <CharmBtn icon={IconNames.chevronLeft} onPress={() => router.back()} size={InputSizes.md} frame={true} />
            </View>
            <UpdateBasicInfo />
        </MainWrapper>
    )
}