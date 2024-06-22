import { FontColor, FontColors, LabelProps } from '@/types/Components';
import React from 'react';
import { Text } from 'react-native';
import { FontTypes, FontType, FontSizes } from '@/types/Components'
import { Colors } from '@/constants/Colors';
import { Style } from 'nativewind/dist/style-sheet/runtime';

const fontStyleBasics = (type: FontType) => {
    if (type === FontTypes.FTitle1) {
        return { fontSize: FontSizes.FTitle1, fontWeight: '500' }
    } else if (type === FontTypes.FTitle2) {
        return { fontSize: FontSizes.FTitle2, fontWeight: '500' }
    }
}

const fontColor = (color: FontColor) => {
    if (color === FontColors.dark) {
        return {
            color: Colors.dark.darkText
        }
    } else if (color === FontColors.light) {
        return {
            color: Colors.dark.white
        }
    } else {
        return {
            color
        }
    }
}

const Label = (props: LabelProps) => {
    const { color = FontColors.light, classNames, type, label = 'choner' } = props
    const fontStyles = {
        ...fontStyleBasics(type),
        ...fontColor(color)
    }
    return (
        <Text className={classNames} style={fontStyles as Style}>{label}</Text>
    )
}

export default Label;