import Authentications from "@/components/Authentications";
import Logo from "@/components/Common/Logo";
import { ContentSection } from "@/components/Wrappers/Sections";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, View } from "react-native";

export default function Page() {
    return (
        <SafeAreaView className='flex items-center' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.grey }}>
            <ContentSection containerStyles={{ maxWidth: 353 }} cardMode={false}>
                <Logo style={{ width: 169, height: 66 }} />
            </ContentSection>
        <View style={{ height: 130 }}></View>
        <Authentications />
        </SafeAreaView>
    )
}