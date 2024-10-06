import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BtnDetailedProps, BtnGroupProps, BtnLinkProps, BtnProps, CharmBtnProps, FontTypes, IconNames, InputSizes, JustifyContent } from '@/types/Components';
import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from './Icon';
import Label from './Label';
import { Spacer } from './Spacer';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const styles = StyleSheet.create({
  btnDetailedWrapper: {width: '100%', paddingHorizontal: 8, height: 43, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: Colors.dark['grey-shade-3'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}
})

const iconSizes = (size = InputSizes.md) => {
  return {
    iconSize: size,
  }
}
export const CharmBtn = (props: CharmBtnProps) => {
  const { color = Colors.dark.background, children, icon = IconNames.bell, onPress, frame = true, size, bgColor, clear, disabled } = props;
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
    <TouchableOpacity style={{opacity: disabled ? 0.6 : 1}} onPress={() => !disabled && onPress && onPress()}>
      <View style={!clear ? styles().charmBtnStyles as any : {}} className={frame ? 'shadow-sm' : ''}>
        <Icon color={color} name={icon} size={styles().charmBtnStyles.iconSize} />
        {children}
      </View>
    </TouchableOpacity>
  )
}

export const Btn = (props: BtnProps) => {
  const { color = Colors.dark.background, icon, link, onPress, label = 'Save', bgColor = props.backgroundColor || Colors.dark['soundcloud-gdr-1'], disabled = false, isLoading = false, wrapperClasses, outlined, size = InputSizes.md, iconWidth, iconHeight, block, textMode = false, className = '' } = props;

  const btnSizes = () => {
    if (size === InputSizes.sm) {
      return {
        borderRadius: 22,
        paddingVertical: outlined ? 1: 3,
        minHeight: 22,
        ...(!textMode && {paddingHorizontal: 8})
      }
    } else if (size === InputSizes.md) {
      return {
        borderRadius: 30,
        paddingVertical: outlined ? 5: 7,
        minHeight: 30,
        ...(!textMode && {paddingHorizontal: 15})
      }
    } else if (size === InputSizes.lg) {
      return {
        borderRadius: 60,
        paddingVertical: outlined ? 10: 12,
        minHeight: 60,
        ...(!textMode && {paddingHorizontal: 30})
      }
    }
  }
  const btnStyles = {
    ...(outlined && !textMode ? {
      borderColor: color,
      borderWidth: 1
    } : 
      !textMode && {backgroundColor: bgColor}
    ),
    ...(disabled && {
      opacity: 0.7
    }),
    ...btnSizes(),
  }
  const buttonCore = () =>
    <View className={`flex flex-row items-center justify-center shadow-sm ${block && 'w-full'} ${className}`} style={[btnStyles, props.style]}>
      {icon && !isLoading && <Icon color={color} name={icon} size={iconSizes(size).iconSize} width={iconWidth} height={iconHeight} />}
      {isLoading && <ActivityIndicator style={{marginRight: !icon ? 4 : 0}} color={color} size={24} />}
      <Label {...{ label, color }} containerStyles={{ fontWeight: textMode ? 400 : 600, marginLeft: icon ? 12 : 0, marginRight: icon ? 4 : 0 }} />
    </View>
  return (
    link ? <Link href={link} className={`flex flex-row items-center justify-center ${block && 'w-full'} ${wrapperClasses}`} disabled={disabled}>{buttonCore()}</Link> : <TouchableOpacity className={`flex flex-row items-center justify-center ${block && 'w-full'} ${wrapperClasses}`} disabled={disabled || isLoading} onPress={onPress}>{buttonCore()}</TouchableOpacity>
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
  const { href = '', label = 'View all', color = Colors.dark.primary } = props;
  return (
    <Link href={href}>
      <View className={'rounded-md bg-white px-4 py-3 flex justify-center shadow-sm'}>
        <Text className='font-semibold m-auto px-3' style={{ color }}>{label}</Text>
      </View>
    </Link>
  );
}

export const BtnDetailed = (props: BtnDetailedProps) => {

  const labelStyles = useMemo(() => {
    const alignment = {
      justifyContent:
        props.labelAlign === JustifyContent.center
          ? 'center'
          : props.labelAlign === JustifyContent.right
          ? 'flex-end'
          : 'flex-start',
    };
    return { flex: 1, flexDirection: 'row', ...alignment }
  }, [props.labelAlign])

  return (
    <TouchableOpacity
      style={[styles.btnDetailedWrapper, props.wrapperStyle, { opacity: props.disabled ? 0.7 : 1 }]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.leftIcon && (
        <>
          <Icon classNames={props.leftIcon.classNames} name={props.leftIcon.name} size={props.leftIcon.size} color={props.leftIcon.color} viewBox={props.leftIcon.viewbox} />
          <Spacer width={10} />
        </>
      )}
      {props.label && (
        <View style={labelStyles}>
          <Label type={props.fontType || FontTypes.FLabel} label={props.label} />
        </View>
      )}
      {props.rightIcon && (
        <>
          <Spacer width={10} />
          <Icon classNames={props.rightIcon.classNames} name={props.rightIcon.name} width={props.rightIcon.size} height={props.rightIcon.size} color={props.rightIcon.color} viewBox={props.rightIcon.viewbox} />
        </>
      )}
    </TouchableOpacity>
  );
};

