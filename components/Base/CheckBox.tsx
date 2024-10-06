import { TouchableOpacity } from "react-native"
import Icon from "./Icon"
import { CheckBoxProps, IconNames } from "@/types/Components"
import { Colors } from "@/constants/Colors"


const Checkbox = (props: CheckBoxProps) => {

    return (
        <TouchableOpacity className={props.classNames}style={{opacity: props.disabled ? 0.6 : 1}} onPress={() => !props.disabled && props.onPress(!props.isChecked)}>
            <Icon name={IconNames.checkBox} color={props.isChecked ? Colors.dark['primary-material-1']: 'transparent'} size={props.size} />
        </TouchableOpacity>
    )
}

export default Checkbox
