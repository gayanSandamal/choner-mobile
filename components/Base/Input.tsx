import { Colors } from "@/constants/Colors";
import { FontSizes, FontTypes, IconNames, InputProps, InputSizes } from "@/types/Components";
import { useState } from "react";
import { KeyboardTypeOptions, TextInput, View } from "react-native";
import Icon from '@/components/Base/Icon'

export const Input = (props: InputProps) => {
    const { value, placeholder, icon, classNames, containerStyles } = props;
    const [text, setText] = useState<string | undefined>(value)
    return (
        <View className={`shadow-sm flex flex-row items-center ${classNames}`} style={[{ backgroundColor: Colors.dark['fied-bg-idle'], height: 60, width: '100%', borderRadius: 30, paddingHorizontal: 20 }, ...(containerStyles ? [containerStyles] : [])]}>
            {icon && <Icon name={icon} size={InputSizes.md} color={Colors.dark['primary-shade-3']} />}
            <TextInput
                style={{ flex: 1, padding: 10, color: Colors.dark.text, fontSize: FontSizes.FP }}
                onChangeText={setText}
                placeholder={placeholder}
                placeholderTextColor={Colors.dark['grey-shade-4']}
                value={text}
            />
        </View>
    );
}