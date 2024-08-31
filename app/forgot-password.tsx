import ForgotPasswordScreen from "@/components/Authentications/ForgotPassword";
import { CharmBtn } from "@/components/Base/Button";
import Label from "@/components/Base/Label";
import Logo from "@/components/Common/Logo";
import { ContentSection } from "@/components/Wrappers/Sections";
import { Colors } from "@/constants/Colors";
import { FontTypes, IconNames, InputSizes } from "@/types/Components";
import { router } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function ForgotPassword() {
    return (
        <SafeAreaView className='flex items-center' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.grey }}>
            <View className='flex flex-row' style={{ position: 'absolute', width: '100%', maxWidth: 353, top: 70 }}>
                <CharmBtn icon={IconNames.chevronLeft} onPress={() => router.back()} size={InputSizes.md} frame={false} />
            </View>
            <ContentSection containerStyles={{ maxWidth: 353 }} cardMode={false}>
                <Logo style={{ width: 169, height: 66 }} />
            </ContentSection>
            <Label classNames='mb-8' type={FontTypes.FP} containerStyles={{ fontWeight: 700 }} label='RESET YOUR PASSWORD' />
            <ForgotPasswordScreen />
        </SafeAreaView>
    )
}