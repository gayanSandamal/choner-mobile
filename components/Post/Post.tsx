import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import Label from "../Base/Label"
import { ActionBarProps, FontTypes, IconNames, InputSizes, PostHeaderProps, PostProps, PostType, PostTypeProps, PostTypesProps } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import React, { useCallback, useEffect, useState } from "react"
import Icon from "../Base/Icon"
import { Btn, CharmBtn } from "../Base/Button"
import Modal from "../Base/Modal"
import { TextArea } from "../Base/TextArea"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Checkbox from "../Base/CheckBox"
import { useAuthUserId } from "@/hooks/useAuthUser"
import { useCreateInteresPost } from "@/hooks/mutate/useMutateInterestPosts"
import { formatDateToCustomString } from "@/utils/commonUtils"

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
    width: 24,
    height: 24,
  },
  label: {
    margin: 8,
  },
})

const ActionBar = (props: ActionBarProps) => {
  const { active = false, onPress, title } = props
  return (
    <Pressable onPress={onPress} className={`py-3 px-5 rounded-3xl border`} style={{ backgroundColor: Colors.dark.darkText, width: '100%', paddingHorizontal: 10, borderColor: active ? Colors.dark['soundcloud-gdr-1'] : Colors.dark.darkText }}>
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

export type PostWrapperComponentProps = {
  postHeaderData: PostHeaderProps
  children: React.ReactNode
  actionBarData?: ActionBarProps
  onCancel: () => void
} 

const PostWrapperComponent = (props: PostWrapperComponentProps) => {
  return (
    <View className="pl-[10px] pr-[10px] pt-[85px] w-full">
      <ActionBar {...{ ...props.actionBarData }} active={true} onPress={() => {}} />
      <View className="mt-4">
        <View className="flex flex-column items-start rounded-lg px-4 py-3 mb-4 bg-grey" style={{ borderColor: Colors.dark.background, borderWidth: 1 }} >
          <View className="flex flex-row items-center mb-3 w-full">
            <View className="flex flex-row items-center">
              <Icon name={props.postHeaderData.icon} size={InputSizes.md} />
              <Label classNames="ml-2" type={FontTypes.FLabel} containerStyles={{ fontWeight: 600 }} label={props.postHeaderData.title} />
            </View>
            <View className="ml-[auto]">
              <CharmBtn clear icon={IconNames.cancel} onPress={props.onCancel} size={InputSizes.sm} frame={true} />
            </View>
          </View>
          {props.children}
        </View>
      </View>
    </View>
  )
}

type PublishInterestPostProps = {
  onSuccess: () => void
}
 
const PublishInterestPost = (props: PublishInterestPostProps) => {
  const uid = useAuthUserId()

  const [interestData, setInterestData] = useState({
    interest: '',
    interestDesc: '',
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)
  const [dateTime, setDateTime] = useState<Date | null>(null)

  const {mutate: createPost, isPending: isCreatingPost} = useCreateInteresPost(() => onCreateCreate(), () => {})

  useEffect(() => {
    setDateTime(new Date())
    
    return () => {
      onClose()
    }
  }, [])

  const onClose = () => {
    setInterestData({ interest: '', interestDesc: '' })
    setDateTime(null)
  }

  const onCreateCreate = () => {
    props.onSuccess()
    onClose()
  }

  const hideDatePicker = useCallback(() => {
    setShowDatePicker(false)
  }, [])

  const onCreatePost = () => {
    const canCreate = uid && interestData.interest?.trim()?.length > 0 && interestData.interestDesc?.trim()?.length > 0

    canCreate && createPost({
      uid,
      title: interestData.interest,
      description: interestData.interestDesc,
      scheduledAt: dateTime?.toISOString() || ''
    })
  }

  const handleConfirm = useCallback((date: Date) => {
    hideDatePicker()
    setIsScheduled(true)
    setDateTime(date)
  }, [showDatePicker])

  const { interest, interestDesc } = interestData

  return (
    <>
        <TextArea disabled={isCreatingPost} disableNewLine height={50} maxLines={2} maxCharacters={90} value={interest} placeHolder={"what is your interest?"} onChangeText={(text) => setInterestData((prev) => ({ ...prev, interest: text }))} />
        <TextArea disabled={isCreatingPost} clasName="mt-[10px]" height={80} maxCharacters={200} value={interestDesc} placeHolder={"Why are you interested?"} onChangeText={(text) => setInterestData((prev) => ({ ...prev, interestDesc: text }))} />
        <View className="flex items-center justify-end w-full mt-4">
          <View className="flex flex-row justify-end w-full">
            {isScheduled && (
              <View className="flex flex-row items-center justify-between mr-10">
                <Checkbox classNames="mr-2" isChecked={isScheduled} onPress={setIsScheduled} />
                <Label type={FontTypes.FSmall} label={`Schedule at ${dateTime && formatDateToCustomString(dateTime)}`} color={Colors.dark['grey-shade-3']} containerStyles={{ fontWeight: 400, maxWidth: 100, textAlign: 'right' }} />
              </View>
            )}
            {!isScheduled && <Btn outlined disabled={isCreatingPost} className="pt-[2px] pb-[2px] mr-10" label="Schedule" color={Colors.dark['grey-shade-3']} onPress={() => setShowDatePicker(true)} />}
            <Btn isLoading={isCreatingPost} disabled={isCreatingPost} className="pt-[2px] pb-[2px]" label="Publish" icon={IconNames.send} onPress={onCreatePost} />
          </View>
        </View>
        <DateTimePickerModal isVisible={showDatePicker} mode="date" date={dateTime || new Date()} onConfirm={handleConfirm} onCancel={hideDatePicker}/>
    </>
  )
}

export const Post = (props: PostProps) => {
  const { postType, actionBarData, postHeaderData } = props
  const [showAddPost, setShowAddInterst] = useState<boolean>(false)

  const onPostActionBarPress = () => {
    setShowAddInterst(true)
  }

  const onCancel = () => {
    setShowAddInterst(false)
  }

  useEffect(() => {
    return () => {
      onCancel()
    }
  }, [])

  return (
    <View className="mt-3 mb-4">
      <ActionBar {...{ ...actionBarData }} active={false} onPress={onPostActionBarPress} />
      <Modal customModal showModal={showAddPost} setShowModal={setShowAddInterst}>
        <PostWrapperComponent actionBarData={actionBarData} postHeaderData={postHeaderData} onCancel={onCancel}>          
          {postType === PostType.interest && <PublishInterestPost onSuccess={onCancel} />}
        </PostWrapperComponent>
      </Modal>
    </View>
  )
}