import { Stack } from "expo-router"

export default function ChallengesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='on-going-challenges' />
            <Stack.Screen name='challenge-view' />
        </Stack>
    )
}
