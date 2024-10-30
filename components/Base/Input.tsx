import { Colors } from "@/constants/Colors";
import { FontSizes, InputProps, InputSizes } from "@/types/Components";
import { TextInput, View } from "react-native";
import Icon from '@/components/Base/Icon'
import { CharmBtn } from "./Button";

export const Input = (props: InputProps) => {
    const { value, placeholder, icon, iconRight, classNames, containerStyles, secureTextEntry = false, onChange, onPressIconRight } = props
    return (
        <View className={`shadow-sm flex flex-row items-center ${classNames}`} style={[{ backgroundColor: Colors.dark['fied-bg-idle'], height: 60, width: '100%', borderRadius: 30, paddingHorizontal: 20 }, ...(containerStyles ? [containerStyles] : [])]}>
            {icon && <Icon name={icon} size={InputSizes.md} color={props.iconColor || Colors.dark['primary-shade-3']} />}
            <TextInput
                style={{ flex: 1, padding: 10, color: Colors.dark.text, fontSize: props.fontSize || FontSizes.FP }}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={Colors.dark['grey-shade-4']}
                value={value}
                secureTextEntry={secureTextEntry}
            />
            {iconRight && <CharmBtn icon={iconRight} onPress={onPressIconRight} size={InputSizes.md} frame={false} color={Colors.dark['primary-shade-3']} />}
        </View>
    );
}