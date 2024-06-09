import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { NumberInputProps } from '@/types/Components';

const NumberInput = (props: NumberInputProps) => {
  const { initialValue = 1, onChange, size = 'md' } = props
  const [value, setValue] = useState(initialValue.toString())

  const handleDecrement = () => {
    const newValue = Math.max(parseInt(value, 10) - 1, 1)
    setValue(newValue.toString())
    if (onChange) onChange(newValue)
  }

  const handleIncrement = () => {
    setValue((parseInt(value, 10) + 1).toString())
    if (onChange) onChange(parseInt(value, 10) + 1)
  }

  const sizable = () => {
    if (size === 'sm') {
      return {
        size: 20,
        px: 'px-1',
        py: 'py-1',
        textSize: 'text-sm'
      }
    } else if (size === 'md') {
      return {
        size: 28,
        px: 'px-2',
        py: 'py-1',
        textSize: 'text-base'
      }
    } else {
      return {
        size: 36,
        px: 'px-2',
        py: 'py-2',
        textSize: 'text-lg'
      }
    }
  }

  return (
    <View className={`flex flex-row items-center border border-gray-300 rounded-md`}>
      <Pressable onPress={handleDecrement} className={`${sizable().px} ${sizable().py}`}>
        <Ionicons size={sizable().size} name="remove" color='gray-500' />
      </Pressable>
      <TextInput
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        className={`flex-grow ${sizable().textSize} flex items-center text-center font-medium outline-none`}
      />
      <Pressable onPress={handleIncrement} className={`${sizable().px} ${sizable().py}`}>
        <Ionicons size={sizable().size} name="add" color='gray-500' />
      </Pressable>
    </View>
  )
}

export default NumberInput
