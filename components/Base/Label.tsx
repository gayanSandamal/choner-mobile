import { FontColor, FontColors, LabelProps } from '@/types/Components';
import React from 'react';
import { Text } from 'react-native';
import { FontTypes, FontType, FontSizes } from '@/types/Components'
import { Colors } from '@/constants/Colors';
import { Style } from 'nativewind/dist/style-sheet/runtime';

const fontStyleBasics = (type: FontType) => {
    if (type === FontTypes.FDisplay1) {
        return { fontSize: FontSizes.FDisplay1, fontWeight: '500' }
    } else if (type === FontTypes.FDisplay2) {
        return { fontSize: FontSizes.FDisplay2, fontWeight: '500' }
    } else if (type === FontTypes.FDisplay3) {
        return { fontSize: FontSizes.FDisplay3, fontWeight: '500' }
    } else if (type === FontTypes.FDisplay4) {
        return { fontSize: FontSizes.FDisplay4, fontWeight: '500' }
    } else if (type === FontTypes.FDisplay5) {
        return { fontSize: FontSizes.FDisplay5, fontWeight: '500' }
    } else if (type === FontTypes.FDisplay6) {
        return { fontSize: FontSizes.FDisplay6, fontWeight: '500' }
    } else if (type === FontTypes.FTitle1) {
        return { fontSize: FontSizes.FTitle1, fontWeight: '500' }
    } else if (type === FontTypes.FTitle1Bold) {
        return { fontSize: FontSizes.FTitle1, fontWeight: '700' }
    } else if (type === FontTypes.FTitle2) {
        return { fontSize: FontSizes.FTitle2, fontWeight: '500' }
    } else if (type === FontTypes.FTitle3) {
        return { fontSize: FontSizes.FTitle3, fontWeight: '300' }
    } else if (type === FontTypes.FTitle3Bold) {
        return { fontSize: FontSizes.FTitle3, fontWeight: '500' }
    } else if (type === FontTypes.FSmall) {
        return { fontSize: FontSizes.FSmall, fontWeight: '400' }
    } else {
        return { fontSize: FontSizes.FP, fontWeight: '400' }
    }
}

const fontColor = (color: FontColor) => {
    if (color === FontColors.dark) {
        return {
            color: Colors.dark.darkText
        }
    } else if (color === FontColors.light) {
        return {
            color: Colors.dark.background
        }
    } else {
        return {
            color
        }
    }
}

const Label = (props: LabelProps) => {
    const { color = FontColors.light, classNames, type = FontTypes.FP, label = 'choner', containerStyles } = props
    const fontStyles = {
        ...fontStyleBasics(type),
        ...fontColor(color),
        ...containerStyles
    }
    return (
        <Text className={classNames} style={fontStyles as Style}>{label}</Text>
    )
}

export default Label;