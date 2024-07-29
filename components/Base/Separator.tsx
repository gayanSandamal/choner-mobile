import { View } from "react-native"
import Label from "./Label"
import { Colors } from "@/constants/Colors"
import { FontTypes, SeparatorProps } from "@/types/Components"

export const Separator = (props: SeparatorProps) => {
    const { label = 'or', barWidth = 100 } = props
    return (
        <View className="flex flex-row w-full items-center justify-center my-5">
            <View style={{ backgroundColor: Colors.dark['grey-shade-2'], width: barWidth, height: 1 }}></View>
            <Label classNames="mx-2" type={FontTypes.FP} color={Colors.dark['grey-shade-2']} containerStyles={{ fontWeight: 600 }} label={label} />
            <View style={{ backgroundColor: Colors.dark['grey-shade-2'], width: barWidth, height: 1 }}></View>
        </View>
    )
}