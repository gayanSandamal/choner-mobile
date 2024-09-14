import { Stack } from "expo-router"
export default function SettingsLayout() {
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="settings-home" />
        <Stack.Screen name="basic-info" />
        <Stack.Screen name="account-settings" />
        <Stack.Screen name="privacy" />
        <Stack.Screen name="security" />
        <Stack.Screen name="secondary-account" />
    </Stack>
}
