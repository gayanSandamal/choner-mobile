import { Stack } from "expo-router"
export default function ProfileLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile" />
            <Stack.Screen name="interest" />
            <Stack.Screen name="(settings)" />
        </Stack>
    )
}
