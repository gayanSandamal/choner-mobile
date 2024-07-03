import React from 'react';
import Svg from "react-native-svg"
import { IconBell, IconInsight, IconHandshake, IconInterests, IconPlay, IconTrophy, IconSearch, IconFistBump, IconBiceps, IconAddPost, IconQandA, IconClose, IconSend } from './Icons';
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
    } else if (name === IconNames.play) {
        return <IconPlay fill={color} />
    } else if (name === IconNames.trophy) {
        return <IconTrophy fill={color} />
    } else if (name === IconNames.search) {
        return <IconSearch fill={color} />
    } else if (name === IconNames.fist) {
        return <IconFistBump fill={color} />
    } else if (name === IconNames.biceps) {
        return <IconBiceps fill={color} />
    } else if (name === IconNames.addPost) {
        return <IconAddPost fill={color} />
    } else if (name === IconNames.qanda) {
        return <IconQandA fill={color} />
    } else if (name === IconNames.close) {
        return <IconClose fill={color} />
    } else if (name === IconNames.send) {
        return <IconSend fill={color} />
    }
}

const Icon = (props: IconProps) => {
    const { color = Colors.dark.background, name = IconNames.bell, size = InputSizes.md, width = 24, height = 24 } = props
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
        <Svg width={width} height={height} style={{ transform: [{ scale: styles().scale }] }}>
            {getIcon({ color, name })}
        </Svg>
    )
}

export default Icon