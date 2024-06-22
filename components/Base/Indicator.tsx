import { IndicatorProps } from '@/types/Components';
import React from 'react';
import { View } from 'react-native';
import { Colors } from '@/constants/Colors'

const Indicator = (props: IndicatorProps) => {
    const { color = Colors.dark.red } = props
    return (
        <View style={{ backgroundColor: color, width: 8, height: 8, borderRadius: 8 }}></View>
    )
}

export default Indicator;
