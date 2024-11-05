import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Label from '../Base/Label';
import { FontTypes } from '@/types/Components';

const styles = StyleSheet.create({
    container: { justifyContent: 'center', alignItems: 'center', },
    textContainer: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 16, fontWeight: 'bold', color: '#333' },
})

type CircularProgressProps = {
    progress: number
    colors: [string, string]
    size?: number
    strokeWidth?: number
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
    progress,
    colors = ['#4A90E2', '#50E3C2'],
    size = 100,
    strokeWidth = 10 
}) => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const progressOffset = circumference - (circumference * progress) / 100

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0%" stopColor={colors[0]} />
                        <Stop offset="100%" stopColor={colors[1]} />
                    </LinearGradient>
                </Defs>

                <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#E6E6E6" strokeWidth={strokeWidth} fill="none" />

                <Circle cx={size / 2} cy={size / 2} r={radius} stroke="url(#grad)" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={progressOffset} fill="none" rotation="-90" origin={`${size / 2}, ${size / 2}`} />
            </Svg>

            <View style={styles.textContainer}>
                <Label type={FontTypes.FDisplay3} label={`${Math.round(progress)}%`} />
            </View>
        </View>
    )
}

export default CircularProgress
