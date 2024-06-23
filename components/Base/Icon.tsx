import React from 'react';
import Svg from "react-native-svg"
import { IconBell, IconInsight, IconHandshake, IconInterests, IconPlay, IconTrophy } from './Icons';
import { IconName, IconNames, InputSizes, IconProps } from '@/types/Components';
import { Colors } from '@/constants/Colors';

const getIcon = (props: { color: string, name: IconName }) => {
    const { color, name } = props
    if (name === IconNames.bell) {
        return <IconBell fill={color} />
    } else if (name === IconNames.insight) {
        return <IconInsight fill={color} />
    } else if (name === IconNames.handshake) {
        return <IconHandshake fill={color} />
    } else if (name === IconNames.interests) {
        return <IconInterests fill={color} />
    } else if (name === IconNames.interests) {
        return <IconInterests fill={color} />
    } else if (name === IconNames.play) {
        return <IconPlay fill={color} />
    } else if (name === IconNames.trophy) {
        return <IconTrophy fill={color} />
    }
}

const Icon = (props: IconProps) => {
    const { color = Colors.dark.background, name = IconNames.bell, size = InputSizes.md } = props
    const styles = () => {
        if (size === InputSizes.sm) {
            return {
                scale: 0.8
            }
        } else if (size === InputSizes.md) {
            return {
                scale: 1
            }
        } else if (size === InputSizes.lg) {
            return {
                scale: 1.2
            }
        } else {
            return {
                scale: 1
            }
        }
    }
    return (
        <Svg width={24} height={24} style={{ transform: [{ scale: styles().scale }] }}>
            {getIcon({ color, name })}
        </Svg>
    )
}

export default Icon