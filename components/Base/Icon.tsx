import React from 'react';
import Svg from "react-native-svg"
import { IconBell } from './Icons';
import { IconName, IconNames, InputSizes, IconProps } from '@/types/Components';

const getIcon = (name: IconName) => {
    if (name === IconNames.bell) {
        return <IconBell fill="#ffffff" />
    }
}

const Icon = (props: IconProps) => {
    const { name = IconNames.bell, size = InputSizes.md } = props
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
            {getIcon(name)}
        </Svg>
    )
}

export default Icon