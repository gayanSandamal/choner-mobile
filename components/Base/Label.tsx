import { FontColor, FontColors, LabelProps } from '@/types/Components';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FontTypes, FontType, FontSizes } from '@/types/Components'
import { Colors } from '@/constants/Colors';
import { Style } from 'nativewind/dist/style-sheet/runtime';

const styles = StyleSheet.create({
    underlineText: {borderBottomWidth: 1, borderBottomColor: Colors.light.white, paddingBottom: 2, alignSelf: 'flex-start'}
})

const fontStyleBasics = (type: FontType) => {
    const fontStyles: { [key in FontTypes]: { fontSize: number, fontWeight: string } } = {
        [FontTypes.FDisplay1]: { fontSize: FontSizes.FDisplay1, fontWeight: '500' },
        [FontTypes.FDisplay2]: { fontSize: FontSizes.FDisplay2, fontWeight: '500' },
        [FontTypes.FDisplay3]: { fontSize: FontSizes.FDisplay3, fontWeight: '500' },
        [FontTypes.FDisplay4]: { fontSize: FontSizes.FDisplay4, fontWeight: '500' },
        [FontTypes.FDisplay5]: { fontSize: FontSizes.FDisplay5, fontWeight: '500' },
        [FontTypes.FDisplay6]: { fontSize: FontSizes.FDisplay6, fontWeight: '500' },
        [FontTypes.FTitle1]: { fontSize: FontSizes.FTitle1, fontWeight: '500' },
        [FontTypes.FTitle1Bold]: { fontSize: FontSizes.FTitle1, fontWeight: '700' },
        [FontTypes.FTitle2]: { fontSize: FontSizes.FTitle2, fontWeight: '500' },
        [FontTypes.FTitle3]: { fontSize: FontSizes.FTitle3, fontWeight: '300' },
        [FontTypes.FTitle3Bold]: { fontSize: FontSizes.FTitle3, fontWeight: '500' },
        [FontTypes.FLabel]: { fontSize: FontSizes.FLabel, fontWeight: '400' },
        [FontTypes.FLabelBold]: { fontSize: FontSizes.FLabel, fontWeight: '500' },
        [FontTypes.FSmall]: { fontSize: FontSizes.FSmall, fontWeight: '400' },
        [FontTypes.FP]: { fontSize: FontSizes.FP, fontWeight: '400' },
    }
    
    return fontStyles[type]
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
    const { underline, color = FontColors.light, classNames, type = FontTypes.FP, label = 'choner', containerStyles, ellipsizeMode, numberOfLines } = props
    const fontStyles = {
        ...fontStyleBasics(type),
        ...fontColor(color),
        ...containerStyles,
        ...(underline && styles.underlineText)
    }
    return (
        <Text className={classNames} style={fontStyles as Style} ellipsizeMode={ellipsizeMode} numberOfLines={numberOfLines}>{label}</Text>
    )
}

export default Label;