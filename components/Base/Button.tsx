import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BtnGroupProps, BtnLinkProps, BtnProps, CharmBtnProps } from '@/types/Components';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'

export const CharmBtn = (props: CharmBtnProps) => {
  const { onPress, icon = 'cart-outline', color = '#b12ac8', bgColor = 'bg-white', disabled = false, size = 'md', iconsSize = 28 } = props;
  const sizable = () => {
    if (size === 'sm') {
      return {
        size: 20,
        px: 'px-1',
        py: 'py-1',
        textSize: 'text-xs'
      }
    } else if (size === 'md') {
      return {
        size: 28,
        px: 'px-2',
        py: 'py-2',
        textSize: 'text-sm'
      }
    } else {
      return {
        size: 36,
        px: 'px-3',
        py: 'py-3',
        textSize: 'text-base'
      }
    }
  }
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <View className={`rounded-md ${disabled ? 'bg-gray-300' : `${bgColor} shadow`} ${sizable().px} ${sizable().py} flex justify-center`}>
        <Ionicons size={iconsSize} name={icon} color={color} />
      </View>
    </Pressable>
  )
}

export const Btn = (props: BtnProps) => {
  const { onPress, title = 'Save', color = 'text-gray-700', bgColor = 'bg-white', disabled = false, wrapperClasses, outlined } = props;
  return (
    <TouchableOpacity className={wrapperClasses} disabled={disabled} onPress={onPress}>
      <View className={`rounded-md ${disabled ? 'bg-gray-300' : `${outlined ? `border-white border-2` : bgColor} shadow`} px-3 py-3 flex justify-center`}>
        <Text className={`font-semibold m-auto ${color}`}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export const BtnGroup = (props: BtnGroupProps) => {
  const colorScheme = useColorScheme();
  const { buttons, onPress, color = Colors.dark.primary, selectedId } = props

  return (
    <ScrollView horizontal={true}>
      <View className="flex flex-row justify-between rounded-md shadow-sm bg-white">
        {buttons.map((btn, index) =>
          <TouchableOpacity key={btn.id || index} onPress={() => onPress(btn)} >
            <View className={`font-semibold m-auto px-3 py-3 rounded-md ${selectedId === btn.id && 'bg-purple-600'}`}>
              <Text className={`font-semibold m-auto ${selectedId === btn.id ? 'text-white' : 'text-gray-600'}`}>{btn.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

export const BtnLink = (props: BtnLinkProps) => {
  const colorScheme = useColorScheme();
  const { href = '', title = 'Save', color = Colors.dark.primary } = props;
  return (
    <Link href={href}>
      <View className={'rounded-md bg-white px-4 py-3 flex justify-center shadow-sm'}>
        <Text className='font-semibold m-auto px-3' style={{ color }}>{title}</Text>
      </View>
    </Link>
  );
}
