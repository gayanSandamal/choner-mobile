import { Colors } from "@/constants/Colors"
import { StyleSheet, TextInput} from "react-native"
import { FontSizes, TextAreaProps } from "@/types/Components"

const maxLines = 6

const styles = StyleSheet.create({
    wrapper: {width: '100%', borderRadius: 10, borderWidth: 1, borderColor: Colors.dark['grey-shade-3'], paddingHorizontal: 10, paddingVertical: 8, color: Colors.dark.text, fontSize: FontSizes.FLabel, textAlign: 'left' },
})

export const TextArea = (props: TextAreaProps) => {
    const onChangeText = (text: string) => {
        if (props.disableNewLine) {
            props.onChangeText(text.replace(/\n/g, ''))
        } else if (maxLines) {
            const lines = text.split('\n')
            if (lines.length <= maxLines) {
                props.onChangeText(text)
            } else {
                props.onChangeText(lines.slice(0, maxLines).join('\n'))
            }
        } else {
            props.onChangeText(text)
        }
    }
    return (
        <TextInput
            multiline
            className={props.clasName}
            editable={!props.disabled}
            numberOfLines={props.maxLines}
            textAlignVertical="top"
            maxLength={props.maxCharacters}
            style={[styles.wrapper, {height: props.height || 'auto'}]}
            onChangeText={onChangeText}
            placeholder={props.placeHolder}
            placeholderTextColor={Colors.dark['grey-shade-3']}
            value={props.value}
        />
    )
}