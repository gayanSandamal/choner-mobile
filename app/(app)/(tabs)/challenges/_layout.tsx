import { TabSelectorProvider } from "@/contexts/tabSelectorContext"
import { Stack } from "expo-router"

export default function ChallengesLayout() {
    return (
        <TabSelectorProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='on-going-challenges' />
            </Stack>
        </TabSelectorProvider>
    )
}
