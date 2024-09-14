import { SpacerProps } from "@/types/Components";
import { View } from "react-native";

export const Spacer = (props: SpacerProps) => {
  const { height = 16, width } = props
  return <View className="flex w-full" style={{ height, width }}></View>
}