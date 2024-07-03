import { SpacerProps } from "@/types/Components";
import { View } from "react-native";

export const Spacer = (props: SpacerProps) => {
  const { height = 16 } = props
  return <View className="flex w-full" style={{ height }}></View>
}