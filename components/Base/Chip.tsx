import { ChipsProps } from '@/types/Components';
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Chip = (props: ChipsProps) => {
  const { title, bgColor = 'bg-gray-200', color = 'text-gray-700', onPress, isActive, activeBgColor = 'bg-gray-700', activeColor = 'text-white', size = 'md' } = props

  const sizable = () => {
    if (size === 'sm') {
      return {
        size: 20,
        px: 'px-2',
        py: 'py-1',
        textSize: 'text-xs'
      }
    } else if (size === 'md') {
      return {
        size: 28,
        px: 'px-3',
        py: 'py-1',
        textSize: 'text-sm'
      }
    } else {
      return {
        size: 36,
        px: 'px-3',
        py: 'py-2',
        textSize: 'text-base'
      }
    }
  }

  return (
    onPress ? <TouchableOpacity onPress={onPress}>
      <View className={`${sizable().px} ${sizable().py} rounded mr-2 ${isActive ? activeBgColor : bgColor}`}>
        <Text className={`${sizable().textSize} ${isActive ? activeColor : color} font-semibold text-center`}>{title}</Text>
      </View>
    </TouchableOpacity> :
      <View className={`${sizable().px} ${sizable().py} rounded mr-2 ${bgColor}`}>
        <Text className={`${sizable().textSize} ${color} font-semibold text-center`}>{title}</Text>
      </View>
  );
};

export default Chip;
