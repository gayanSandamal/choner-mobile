import UpdateBasicInfo from "@/components/ProfileOptions/UpdateBasicInfo"
import { SettingsWrapper } from "@/components/Wrappers/SettingsWrapper"

export default function BasicInfo() {
    return (
        <SettingsWrapper header="Basic info">
            <UpdateBasicInfo />
        </SettingsWrapper>
    )
}