import { Stack } from "expo-router"

export default function interestsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='interests-list' />
            <Stack.Screen name='interest-view' />
        </Stack>
    )
}
