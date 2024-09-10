import SignUpScreen from "@/components/Authentications/SignUp";
import { CharmBtn } from "@/components/Base/Button";
import Label from "@/components/Base/Label";
import Logo from "@/components/Common/Logo";
import { MainWrapper } from "@/components/Wrappers/MainWrapper";
import { ContentSection } from "@/components/Wrappers/Sections";
import { FontTypes, IconNames, InputSizes } from "@/types/Components";
import { router } from "expo-router";
import { View } from "react-native";

export default function SignUp() {
    return (
        <MainWrapper>
            <View className='flex flex-row' style={{ position: 'absolute', width: '100%', maxWidth: 353, top: 70 }}>
                <CharmBtn icon={IconNames.chevronLeft} onPress={() => router.back()} size={InputSizes.md} frame={false} />
            </View>
            <ContentSection containerStyles={{ maxWidth: 353 }} cardMode={false}>
                <Logo style={{ width: 169, height: 66 }} />
            </ContentSection>
            <Label classNames='mb-8' type={FontTypes.FP} containerStyles={{ fontWeight: 700 }} label='SIGN UP' />
            <SignUpScreen />
        </MainWrapper>
    )
}