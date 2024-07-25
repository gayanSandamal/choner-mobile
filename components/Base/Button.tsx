import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BtnGroupProps, BtnLinkProps, BtnProps, CharmBtnProps, IconNames, InputSizes } from '@/types/Components';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from './Icon';
import Label from './Label';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const iconSizes = (size = InputSizes.md) => {
  return {
    iconSize: size,
  }
}
export const CharmBtn = (props: CharmBtnProps) => {
  const { color = Colors.dark.background, children, icon = IconNames.bell, onPress, frame = true, size, bgColor } = props;
  const styles = () => {
    const charmBtnSizes = () => {
      let specificSizes
      if (size === InputSizes.sm) {
        specificSizes = {
          width: 30,
          height: 30,
          borderRadius: 5
        }
      } else if (size === InputSizes.md) {
        specificSizes = {
          width: 34,
          height: 34,
          borderRadius: 5
        }
      } else if (size === InputSizes.lg) {
        specificSizes = {
          width: 60,
          height: 60,
          borderRadius: 20
        }
      }
      return {
        specificSizes,
        ...iconSizes(size)
      }
    }
    return {
      charmBtnStyles: {
        ...charmBtnSizes().specificSizes,
        iconSize: iconSizes(size).iconSize, // Add the iconSize property
        ...(frame ? {
          backgroundColor: `${Colors.dark['grey-shade-4']}1A`,
        } : null),
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles().charmBtnStyles as any}>
        <Icon color={color} name={icon} size={styles().charmBtnStyles.iconSize} />
        {children}
      </View>
    </TouchableOpacity>
  )
}

export const Btn = (props: BtnProps) => {
  const { color = Colors.dark.background, icon, link, onPress, label = 'Save', bgColor = Colors.dark['soundcloud-gdr-1'], disabled = false, wrapperClasses, outlined, size = InputSizes.md, iconWidth, iconHeight, block, textMode = false } = props;

  const btnSizes = () => {
    if (size === InputSizes.sm) {
      return {
        borderRadius: 22,
        paddingHorizontal: !textMode && 8,
        paddingVertical: 3,
        minHeight: 22
      }
    } else if (size === InputSizes.md) {
      return {
        borderRadius: 30,
        paddingHorizontal: !textMode && 15,
        paddingVertical: 7,
        minHeight: 30
      }
    } else if (size === InputSizes.lg) {
      return {
        borderRadius: 60,
        paddingHorizontal: !textMode && 30,
        paddingVertical: 12,
        minHeight: 60
      }
    }
  }
  const btnStyles = {
    ...(outlined && !textMode ? {
      borderColor: color,
      borderWidth: 1
    } : {
      backgroundColor: !textMode && bgColor
    }),
    ...(disabled && {
      opacity: 0.7
    }),
    ...btnSizes()
  }
  const buttonCore = () =>
    <View className={`flex flex-row items-center justify-center ${block && 'w-full'}`} style={btnStyles}>
      {icon && <Icon color={color} name={icon} size={iconSizes(size).iconSize} width={iconWidth} height={iconHeight} />}
      <Label {...{ label, color }} containerStyles={{ fontWeight: textMode ? 400 : 600, marginLeft: icon ? 12 : 0, marginRight: 4 }} />
    </View>
  return (
    link ? <Link href={link} className={`flex flex-row items-center justify-center ${block && 'w-full'} ${wrapperClasses}`} disabled={disabled}>{buttonCore()}</Link> : <TouchableOpacity className={`flex flex-row items-center justify-center ${block && 'w-full'} ${wrapperClasses}`} disabled={disabled} onPress={onPress}>{buttonCore()}</TouchableOpacity>
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
              <Text className={`font-semibold m-auto ${selectedId === btn.id ? 'text-white' : 'text-gray-600'}`}>{btn.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

export const BtnLink = (props: BtnLinkProps) => {
  const colorScheme = useColorScheme();
  const { href = '', label = 'View all', color = Colors.dark.primary } = props;
  return (
    <Link href={href}>
      <View className={'rounded-md bg-white px-4 py-3 flex justify-center shadow-sm'}>
        <Text className='font-semibold m-auto px-3' style={{ color }}>{label}</Text>
      </View>
    </Link>
  );
}
