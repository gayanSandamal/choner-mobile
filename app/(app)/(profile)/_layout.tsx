import { TabSelectorProvider } from "@/contexts/tabSelectorContext"
import { Stack } from "expo-router"
export default function ProfileLayout() {
    return (
        
        <TabSelectorProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="profile" />
                <Stack.Screen name="interest" />
                <Stack.Screen name="community-post" />
                <Stack.Screen name="(settings)" />
            </Stack>
        </TabSelectorProvider>
    )
}
