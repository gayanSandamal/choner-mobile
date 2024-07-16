import { Pressable, StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native"
import Label from "../Base/Label"
import { ActionBarProps, FontTypes, IconNames, InputSizes, PostProps, PostTypeProps, PostTypesProps, PublishPostProps } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import React, { useEffect, useState } from "react"
import Icon from "../Base/Icon"
import { Btn, CharmBtn } from "../Base/Button"
import Checkbox from 'expo-checkbox'
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
})

const ActionBar = (props: ActionBarProps) => {
  const { active = false, onPress, title } = props
  return (
    <Pressable onPress={onPress} className={`py-3 px-5 rounded-3xl border`} style={{ backgroundColor: Colors.dark.darkText, borderColor: active ? Colors.dark['soundcloud-gdr-1'] : Colors.dark.darkText }}>
      <Label containerStyles={{ fontWeight: 400 }} type={FontTypes.FTitle3} label={title} />
    </Pressable>
  )
}

const PostTypes = (props: PostTypesProps) => {
  const { list = [], onPress, onClosePress } = props
  return (
    <View className="flex justify-end">
      <View className="flex flex-row justify-end w-full mb-4">
        <CharmBtn icon={IconNames.close} onPress={() => onClosePress?.()} frame={false} />
      </View>
      {
        list.map((item: PostTypeProps, key: number) => {
          return (
            <TouchableOpacity className="flex flex-row items-center rounded-lg px-4 py-3 mb-4" {...{ key }} onPress={() => onPress(item)} style={{ borderColor: Colors.dark.background, borderWidth: 1 }} >
              <Icon name={item.icon} size={InputSizes.md} />
              <View className="ml-2">
                <Label classNames="mb-1" type={FontTypes.FLabel} containerStyles={{ fontWeight: 600 }} label={item.title} />
                <Label type={FontTypes.FSmall} label={item.subtitle} color={Colors.dark['grey-shade-3']} />
              </View>
            </TouchableOpacity>
          )
        })}
    </View>
  )
}

const PublishPost = (props: PublishPostProps) => {
  const { title = 'Publish post', placeholder = 'Enter your thoughts...', icon = IconNames.addPost, enableScheduling = false, cancelButtonProps, submitButtonProps, onCancelPublish } = props
  const [content, setContent] = useState('')
  const [isScheduled, setIsScheduled] = useState(false)
  const [dateTime, setDateTime] = useState<Date>(new Date())
  const onDateChange = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event
    setDateTime(date || new Date())
  };
  return (
    <View className="flex flex-column items-start rounded-lg px-4 py-3 mb-4" style={{ borderColor: Colors.dark.background, borderWidth: 1 }} >
      <View className="flex flex-row items-center mb-2">
        <Icon name={icon} size={InputSizes.md} />
        <Label classNames="ml-2" type={FontTypes.FLabel} containerStyles={{ fontWeight: 600 }} label={title} />
      </View>
      <TextInput
        autoFocus
        className="border border-dashed rounded-xl p-3 px-4 text-white w-full"
        placeholder={placeholder}
        placeholderTextColor={Colors.dark['grey-shade-3']}
        style={{ borderColor: Colors.dark['grey-shade-2'], minHeight: 100 }}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setContent(text)}
        value={content}
      />
      <View className="flex items-center justify-end w-full mt-4">
        {enableScheduling && <View className="flex flex-row items-center justify-between w-full mb-4">
          <Checkbox
            color={Colors.dark['soundcloud-gdr-1']}
            className=""
            value={isScheduled}
            onValueChange={setIsScheduled}
            style={styles.checkbox}
          />
          <Label type={FontTypes.FTitle3} label={`Schedule at`} containerStyles={{ fontWeight: 400 }} />
          <RNDateTimePicker disabled={!isScheduled} style={{ opacity: isScheduled ? 1 : 0 }} mode="datetime" display="compact" textColor={Colors.dark.background} themeVariant="dark" value={dateTime} onChange={onDateChange} />
        </View>}
        <View className="flex flex-row justify-between w-full">
          <Btn {...{ ...cancelButtonProps }} outlined color={Colors.dark['grey-shade-3']} size={InputSizes.md} icon={IconNames.close} onPress={onCancelPublish} />
          <Btn {...{ ...submitButtonProps }} icon={IconNames.send} onPress={() => submitButtonProps?.onPress?.(content)} />
        </View>
      </View>
    </View>
  )
}

export const Post = (props: PostProps) => {
  const { list, actionBarData, publishPostData } = props
  const [showPostTypes, setShowPostTypes] = useState<boolean>(false)
  const [currentPostType, setCurrentPostType] = useState<PostTypeProps | undefined>()
  const onPostActionBarPress = () => { (list || []).length > 0 ? setShowPostTypes(true) : setCurrentPostType(publishPostData) }

  const onPostTypePress = (item: PostTypeProps) => {
    setShowPostTypes(false)
    setCurrentPostType(item)
  }

  const onCancel = () => {
    setCurrentPostType(undefined)
  }

  useEffect(() => {
    return () => {
      setShowPostTypes(false)
      onCancel()
    }
  }, [])

  return (
    <View>
      <ActionBar {...{ ...actionBarData }} active={showPostTypes || Boolean(currentPostType)} onPress={onPostActionBarPress} />
      {!Boolean(currentPostType) && showPostTypes &&
        <View className="mt-4">
          <PostTypes list={list} onPress={onPostTypePress} onClosePress={() => setShowPostTypes(false)} />
        </View>
      }
      {Boolean(currentPostType) && <View className="mt-4">
        <PublishPost {...{ ...currentPostType }} onCancelPublish={onCancel} />
      </View>}
    </View>
  )
}