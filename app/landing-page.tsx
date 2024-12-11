import Authentications from "@/components/Authentications";
import Logo from "@/components/Common/Logo";
import { MainWrapper } from "@/components/Wrappers/MainWrapper";
import { ContentSection } from "@/components/Wrappers/Sections";
import { View } from "react-native";

export default function Page() {
    return (
        <MainWrapper>
            <ContentSection containerStyles={{ maxWidth: 353, marginTop: 130 }} cardMode={false}>
                <Logo style={{ width: 169, height: 66 }} />
            </ContentSection>
            <View style={{ height: 130 }}></View>
            <Authentications />
        </MainWrapper>
    )
}