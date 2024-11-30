import { SectionList, View } from "react-native";
import { Btn, BtnDetailed } from "@/components/Base/Button";
import Label from "@/components/Base/Label";
import { Spacer } from "@/components/Base/Spacer";
import { SettingsWrapper } from "@/components/Wrappers/SettingsWrapper";
import { FontTypes, IconNames, InputSizes } from "@/types/Components";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useCallback, useState } from "react";
import { fblogOut } from "@/auth";
import { useAuthUserId } from "@/hooks/useAuthUser";
import { useSession } from "@/hooks/ctx";
import Modal from "@/components/Base/Modal";

type Section = {
  title: string
  data: {label: string, icon: IconNames, route: string, hideRightIcon?: boolean}[]
}

const SECTIONS: Section[] = [
  {
    title: "Your Account",
    data: [
      { label: "Basic info", icon: IconNames.info, route: "/(app)/(profile)/(settings)/basic-info" },
      { label: "Account settings", icon: IconNames.person, route: "/(app)/(profile)/(settings)/account-settings" },
      // TODO: Let's not implement these for now
      // { label: "Privacy", icon: IconNames.incognito, route: "/privacy" },
      // { label: "Security", icon: IconNames.lock, route: "/security" }
    ],
  },
  // TODO: Let's not implement these for now
  // {
  //   title: "Secondary Account",
  //   data: [
  //     { label: "Add secondary account", icon: IconNames.personAdd, route: "/secondary-account" }
  //   ],
  // },
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

  const [showLogOutModal, setShowLogOutModal] = useState<boolean>(false)
  const [islogingOut, setIsLogingOut] = useState<boolean>(false)

  const onLogOut = useCallback(async () => {
    setIsLogingOut(true)
    await fblogOut()
      .then(() => {
        signOut(userId)
      })
      .catch((error: any) => {
        console.error('Error signing out:', error)
      })
      .finally(() => {
        setIsLogingOut(false)
        router.replace('/landing-page')
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
            rightIcon={!item.hideRightIcon ? {name: IconNames.chevronMiniRight}: undefined}
            label={item.label}
            onPress={() => item.hideRightIcon ? setShowLogOutModal(true) : router.navigate(item.route)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
            <Label underline type={FontTypes.FLabelBold} label={title} />
        )}
        SectionSeparatorComponent={() => <Spacer height={20} />}
      />
      
      <Modal showModal={showLogOutModal} setShowModal={setShowLogOutModal}>
        <Label type={FontTypes.FTitle1} label={'Do you want to log out?'} />
        <View className="mt-10 ml-0.5 mr-0.5 flex-row justify-between">
          <Btn outlined onPress={() => setShowLogOutModal(false)} icon={IconNames.cancel} size={InputSizes.md} color={Colors.light.white} label="Cancel" />
          <Btn isLoading={islogingOut} disabled={islogingOut} onPress={onLogOut} icon={IconNames.delete} size={InputSizes.md} backgroundColor={Colors.dark.red} label="Yes, Log out" />
        </View>
      </Modal>
    </SettingsWrapper>
  )
}
