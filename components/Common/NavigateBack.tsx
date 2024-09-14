import { StyleSheet, View } from "react-native";
import { CharmBtn } from "../Base/Button";
import { FontTypes, IconNames, InputSizes } from "@/types/Components";
import { Spacer } from "../Base/Spacer";
import Label from "../Base/Label";

const styles = StyleSheet.create({
    wrapper: { flexDirection: 'row', width: 'auto', justifyContent: 'flex-start', alignItems: 'center'},
    buttonWrapper: { width: 35, justifyContent: 'center', overflow: 'visible' }
})

type NavigateBackProps = {
    label: string
    navigate: () => void
}

export default function NavigateBack(props: NavigateBackProps) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.buttonWrapper}>
                <CharmBtn icon={IconNames.chevronLeft} onPress={() => props.navigate()} size={InputSizes.md} frame={true} />
            </View>
            <Spacer width={15} />
            <Label type={FontTypes.FTitle3Bold} label={props.label} />
        </View>
    )
}