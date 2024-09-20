import { BtnDetailed } from "@/components/Base/Button";
import Label from "@/components/Base/Label";
import { Spacer } from "@/components/Base/Spacer";
import { SettingsWrapper } from "@/components/Wrappers/SettingsWrapper";
import { FontTypes, IconNames } from "@/types/Components";
import { router } from "expo-router";
import { SectionList, View } from "react-native";

const SECTIONS = [
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
  }
];

export default function SettingsHome() {
  return (
    <SettingsWrapper header="Settings">
      <SectionList className={'mt-12'}
        sections={SECTIONS}
        keyExtractor={(item, index) => item.label + index}
        renderItem={({ item }) => (
          <View>
            <BtnDetailed
              leftIcon={item.icon}
              rightIcon={IconNames.chevronMiniRight}
              label={item.label}
              onPress={() => router.navigate(item.route)}
            />
            <Spacer height={10} />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View>
            <Label underline type={FontTypes.FLabelBold} label={title} />
          </View>
        )}
        SectionSeparatorComponent={() => <Spacer height={20} />}
      />
    </SettingsWrapper>
  );
}
