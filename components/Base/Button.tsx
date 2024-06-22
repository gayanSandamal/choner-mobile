import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BtnGroupProps, BtnLinkProps, BtnProps, CharmBtnProps, IconNames, InputSizes } from '@/types/Components';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import Icon from './Icon';

export const CharmBtn = (props: CharmBtnProps) => {
  const { onPress, frame = true, size, slot } = props;
  const styles = () => {
    let specificStyles
    if (size === InputSizes.sm) {
      specificStyles = {
        width: 30,
        height: 30,
        borderRadius: 5
      }
    } else if (size === InputSizes.md) {
      specificStyles = {
        width: 34,
        height: 34,
        borderRadius: 5
      }
    } else if (size === InputSizes.lg) {
      specificStyles = {
        width: 60,
        height: 60,
        borderRadius: 20
      }
    }
    return {
      btnStyles: {
        ...specificStyles,
        ...(frame ? { backgroundColor: `rgba(236, 239, 241, 0.1)` } : null),
        alignItems: 'center',
        justifyContent: 'center'
      },
      iconStyles: {
        iconSize: size,
      }
    }
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles().btnStyles as any}>
        <Icon name={IconNames.bell} size={styles().iconStyles.iconSize} />
        {slot}
      </View>
    </TouchableOpacity>
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
