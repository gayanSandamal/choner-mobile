import OnGoingChallenges from "@/components/Challenges/OnGoingChallenges"
import { TabSelectorProvider } from "@/contexts/tabSelectorContext"
import { View } from "react-native"

export const ChallegeScreenTabs = ['ALL', 'JOINED']

const OnGoingChallengesPage = () => {
    
    return (
        <TabSelectorProvider>
            <View className="w-full h-full">
                <OnGoingChallenges />
            </View>
        </TabSelectorProvider>
    )
}

export default OnGoingChallengesPage
