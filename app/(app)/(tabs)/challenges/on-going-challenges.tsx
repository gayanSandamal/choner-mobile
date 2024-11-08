import OnGoingChallenges from "@/components/Challenges/OnGoingChallenges"
import { TabSelectorProvider } from "@/contexts/tabSelectorContext"
import { View } from "react-native"

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
