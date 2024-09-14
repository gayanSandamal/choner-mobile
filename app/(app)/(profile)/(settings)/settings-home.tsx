
import { BtnDetailed } from "@/components/Base/Button"
import Label from "@/components/Base/Label"
import { Spacer } from "@/components/Base/Spacer"
import { SettingsWrapper } from "@/components/Wrappers/SettingsWrapper"
import { FontTypes, IconNames } from "@/types/Components"
import { router } from "expo-router"

export default function SettingsHome() {
    return (
        <SettingsWrapper header="Settings">
            <Spacer height={50}/>
            <Label underline type={FontTypes.FLabelBold} label={'Your Account'} />
            <Spacer height={15}/>
            <BtnDetailed leftIcon={IconNames.info} rightIcon={IconNames.chevronMiniRight} label="Basic info" onPress={() => router.navigate('/basic-info')} />
            <Spacer height={10}/>
            <BtnDetailed leftIcon={IconNames.person} rightIcon={IconNames.chevronMiniRight} label="Account settings" onPress={() => router.navigate('/account-settings')} />
            <Spacer height={10}/>
            <BtnDetailed leftIcon={IconNames.incognito} rightIcon={IconNames.chevronMiniRight} label="Privacy" onPress={() => router.navigate('/privacy')} />
            <Spacer height={10}/>
            <BtnDetailed leftIcon={IconNames.lock} rightIcon={IconNames.chevronMiniRight} label="Security" onPress={() => router.navigate('/security')} />
            <Spacer height={50}/>
            <Label underline type={FontTypes.FLabelBold} label={'Secondary Account'} />
            <Spacer height={15}/>
            <BtnDetailed leftIcon={IconNames.personAdd} rightIcon={IconNames.chevronMiniRight} label="Add secondary account" onPress={() => router.navigate('/secondary-account')} />
        </SettingsWrapper>
    )
}