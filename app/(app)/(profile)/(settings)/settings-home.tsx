import { SectionList, StyleSheet } from "react-native";
import { BtnDetailed } from "@/components/Base/Button";
import Label from "@/components/Base/Label";
import { Spacer } from "@/components/Base/Spacer";
import { SettingsWrapper } from "@/components/Wrappers/SettingsWrapper";
import { FontTypes, IconNames } from "@/types/Components";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  btnWrapper: {width: '100%', paddingHorizontal: 8, height: 43, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: Colors.light.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}
})

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
          <BtnDetailed
            leftIcon={{name: item.icon}}
            rightIcon={{name: IconNames.chevronMiniRight, size: 10}}
            label={item.label}
            wrapperStyle={styles.btnWrapper}
            onPress={() => router.navigate(item.route)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
            <Label underline type={FontTypes.FLabelBold} label={title} />
        )}
        SectionSeparatorComponent={() => <Spacer height={20} />}
      />
    </SettingsWrapper>
  );
}
