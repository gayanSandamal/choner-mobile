import { IndicatorProps } from '@/types/Components';
import React from 'react';
import { View } from 'react-native';
import { Colors } from '@/constants/Colors'

const Indicator = (props: IndicatorProps) => {
    const { color = Colors.dark.red, children } = props
    const defaultStyles = { backgroundColor: color, width: 8, height: 8, borderRadius: 8 }
    const stylesWithChildren = children ? { backgroundColor: color, borderRadius: 16, paddingVertical: 2, paddingHorizontal: 4 } : defaultStyles
    return (
        <View style={stylesWithChildren}>
            {children}
        </View>
    )
}

export default Indicator;
