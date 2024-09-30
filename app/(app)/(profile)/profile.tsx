import { Spacer } from "@/components/Base/Spacer"
import UserProfile from "@/components/ProfileOptions/UserProfile"
import { SettingsWrapper } from "@/components/Wrappers/SettingsWrapper"
import { IconNames } from "@/types/Components"
import { router } from "expo-router"

export default function ProfilePage() {
    return (
        <SettingsWrapper header="" rightIcon={IconNames.settings} onPressRightIcon={() => router.navigate('/settings-home')}>
            <UserProfile />
        </SettingsWrapper>
    )
}