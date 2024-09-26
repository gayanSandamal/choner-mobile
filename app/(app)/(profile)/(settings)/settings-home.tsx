import { SectionList } from "react-native";
import { BtnDetailed } from "@/components/Base/Button";
import Label from "@/components/Base/Label";
import { Spacer } from "@/components/Base/Spacer";
import { SettingsWrapper } from "@/components/Wrappers/SettingsWrapper";
import { FontTypes, IconNames } from "@/types/Components";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useCallback } from "react";
import { fblogOut } from "@/auth";
import { useAuthUserId } from "@/hooks/useAuthUser";
import { useSession } from "@/hooks/ctx";

type Section = {
  title: string
  data: {label: string, icon: IconNames, route: string, hideRightIcon?: boolean}[]
}

const SECTIONS: Section[] = [
  {
    title: "Your Account",
    data: [
      { label: "Basic info", icon: IconNames.info, route: "/basic-info" },
      { label: "Account settings", icon: IconNames.person, route: "/account-settings" },
      { label: "Privacy", icon: IconNames.incognito, route: "/privacy" },
      { label: "Security", icon: IconNames.lock, route: "/security" }
    ],
  },
  {
    title: "Secondary Account",
    data: [
      { label: "Add secondary account", icon: IconNames.personAdd, route: "/secondary-account" }
    ],
  },
  {
    title: "Login",
    data: [
      { label: "Log out", icon: IconNames.logout, route: "", hideRightIcon: true }
    ],
  }
]

export default function SettingsHome() {
  const userId = useAuthUserId()
  const {signOut} = useSession()

  const onLogOut = useCallback(() => {
    fblogOut()
      .then(() => {
        signOut(userId)
      })
      .catch((error: any) => {
        console.error('Error signing out:', error)
      })
  }, [userId])
  
  return (
    <SettingsWrapper header="Settings">
      <SectionList className={'mt-12'}
        sections={SECTIONS}
        keyExtractor={(item, index) => item.label + index}
        renderItem={({ item }) => (
          <BtnDetailed
            leftIcon={{name: item.icon}}
            rightIcon={!item.hideRightIcon ? {name: IconNames.chevronMiniRight, size: 10}: undefined}
            label={item.label}
            onPress={() => item.hideRightIcon ? onLogOut() : router.navigate(item.route)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
            <Label underline type={FontTypes.FLabelBold} label={title} />
        )}
        SectionSeparatorComponent={() => <Spacer height={20} />}
      />
    </SettingsWrapper>
  )
}
