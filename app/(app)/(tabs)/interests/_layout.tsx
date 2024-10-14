import { Stack } from "expo-router"

export default function interestsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='interest-view' />
        </Stack>
    )
}
