import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CharmBtn } from "../Base/Button";
import { FontTypes, IconNames, InputSizes } from "@/types/Components";
import { Spacer } from "../Base/Spacer";
import Label from "../Base/Label";
import Icon from "../Base/Icon";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
    wrapper: { flexDirection: 'row', width: 'auto', justifyContent: 'flex-start', alignItems: 'center'},
    leftButtonWrapper: { width: 35, justifyContent: 'center', overflow: 'visible' },
    rightButtonWrapper: {marginLeft: 'auto', marginRight: 0, marginTop: 5, width: 35, justifyContent: 'center', overflow: 'visible' }
})

type NavigateBackProps = {
    label: string
    rightIcon?: IconNames
    onPressRightIcon?: () => void
    navigate: () => void
}

export default function NavigateBack(props: NavigateBackProps) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.leftButtonWrapper}>
                <CharmBtn icon={IconNames.chevronLeft} onPress={() => props.navigate()} size={InputSizes.md} frame={true} />
            </View>
            <Spacer width={15} />
            <Label type={FontTypes.FTitle3Bold} label={props.label} />
            {props.rightIcon && <TouchableOpacity style={styles.rightButtonWrapper} onPress={props.onPressRightIcon}>
                <Icon color={Colors.light.white} name={props.rightIcon} size={InputSizes.lg}/>
            </TouchableOpacity>}
        </View>
    )
}