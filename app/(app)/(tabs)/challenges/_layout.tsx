import { TabSelectorProvider } from "@/contexts/tabSelectorContext"
import { Stack } from "expo-router"

export default function challengesLayout() {
    return (
        <TabSelectorProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' />
            </Stack>
        </TabSelectorProvider>
    )
}
