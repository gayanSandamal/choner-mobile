import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import Label from "../Base/Label"
import { ActionBarProps, FontTypes, IconNames, InputSizes, PostModalProps, PostProps, PostType, PostTypeProps, PostTypesProps, PostWrapperComponentProps, PublishInterestPostProps } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import React, { useCallback, useEffect, useState } from "react"
import Icon from "../Base/Icon"
import { Btn, CharmBtn } from "../Base/Button"
import Modal from "../Base/Modal"
import { TextArea } from "../Base/TextArea"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Checkbox from "../Base/CheckBox"
import { useAuthUserId } from "@/hooks/useAuthUser"
import { useCreateInteresPost, useUpdateInteresPost } from "@/hooks/mutate/useMutateInterestPosts"
import { formatDateToCustomString, timeDataToLocalString } from "@/utils/commonUtils"
import { CreateInterestProps, UpdateInterestProps } from "@/api/interestPostApi"

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

export const ActionBar = (props: ActionBarProps) => {
  const { active = false, onPress, title } = props
  return (
    <Pressable onPress={onPress} className={`py-3 px-5 mt-3 mb-4 rounded-3xl border`} style={{ backgroundColor: Colors.dark.darkText, width: '100%', paddingHorizontal: 10, borderColor: active ? Colors.dark['soundcloud-gdr-1'] : Colors.dark.darkText }}>
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

const PostWrapperComponent = (props: PostWrapperComponentProps) => {
  return (
    <View className="pl-[10px] pr-[10px] pt-[75px] w-full">
      <ActionBar {...{ ...props.actionBarData }} active={true} onPress={() => { }} />
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

const PublishInterestPost = (props: PublishInterestPostProps) => {
  const uid = useAuthUserId()

  const [interestData, setInterestData] = useState({
    interest: props.postParams?.interest || '',
    interestDesc: props.postParams?.interestDesc || '',
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isScheduled, setIsScheduled] = useState(!!props.postParams?.scheduledAt?._seconds || false)
  const [dateTime, setDateTime] = useState<Date | null>(!!props.postParams?.scheduledAt ? timeDataToLocalString(props.postParams?.scheduledAt) : null)
  const [isPostPublishable, setIsPostPublishable] = useState(false)

  const { mutate: createPost, isPending: isCreatingPost } = useCreateInteresPost(() => onSuccess(), () => {})
  const { mutate: updatePost, isPending: isUpdatingPost } = useUpdateInteresPost(() => onSuccess(), (e) => {console.timeLog(JSON.stringify(e))})

  useEffect(() => {
    !props?.postParams && setDateTime(new Date())

    return () => {
      onClose()
    }
  }, [])

  useEffect(() => {
    setIsPostPublishable(
      interestData.interest.trim() !== '' && interestData.interestDesc.trim() !== ''
    )
  }, [interestData.interest, interestData.interestDesc])

  const onClose = () => {
    setInterestData({ interest: '', interestDesc: '' })
    setDateTime(null)
  }

  const onSuccess = () => {
    props.onSuccess()
    onClose()
  }

  const hideDatePicker = useCallback(() => {
    setShowDatePicker(false)
  }, [])

  const onPressMutate = () => {
    props.postParams?.id ? onUpdatePost(): onCreatePost()
  }

  const onCreatePost = () => {
    const canCreate = uid && interestData.interest?.trim()?.length > 0 && interestData.interestDesc?.trim()?.length > 0

    const interestPostData = {
      uid,
      title: interestData.interest,
      description: interestData.interestDesc,
      ...(dateTime && isScheduled && { scheduledAt: dateTime?.toISOString() })
    } as CreateInterestProps

    canCreate && createPost(interestPostData)
  }

  const onUpdatePost = () => {
    const canUpdate = uid && interestData.interest?.trim()?.length > 0 && interestData.interestDesc?.trim()?.length > 0

    const interestPostData = {
      uid,
      id: props.postParams?.id,
      title: interestData.interest,
      description: interestData.interestDesc,
      ...(dateTime && isScheduled && { scheduledAt: dateTime?.toISOString() })
    } as UpdateInterestProps

    canUpdate && updatePost(interestPostData)
  }

  const handleConfirm = useCallback((date: Date) => {
    hideDatePicker()
    setIsScheduled(true)
    setDateTime(date)
  }, [showDatePicker])

  const { interest, interestDesc } = interestData

  const minTime = () => {
    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours() + 1)
    return currentDate
  }

  return (
    <>
      <TextArea disabled={isCreatingPost || isUpdatingPost} disableNewLine height={50} maxLines={2} maxCharacters={90} value={interest} placeHolder={"what is your interest?"} onChangeText={(text) => setInterestData((prev) => ({ ...prev, interest: text }))} />
      <TextArea disabled={isCreatingPost || isUpdatingPost} clasName="mt-[10px]" height={80} maxCharacters={200} value={interestDesc} placeHolder={"Why are you interested?"} onChangeText={(text) => setInterestData((prev) => ({ ...prev, interestDesc: text }))} />
      <View className="flex items-center justify-end w-full mt-4">
        <View className="flex flex-row justify-between w-full">
          <Pressable className="flex flex-row items-center justify-between" onPress={() => setShowDatePicker(true)}>
            <Checkbox classNames="mr-2" isChecked={isScheduled} onPress={(state) => isScheduled ? setIsScheduled(state) : setShowDatePicker(true)} />
            <Label type={FontTypes.FSmall} label={isScheduled && dateTime ? `Schedule at ${dateTime && formatDateToCustomString(dateTime)}` : 'Schedule'} color={Colors.dark['grey-shade-3']} containerStyles={{ fontWeight: 400, textAlign: 'right' }} />
          </Pressable>
          <Btn isLoading={isCreatingPost || isUpdatingPost} disabled={isCreatingPost || isUpdatingPost || !isPostPublishable} className="pt-[2px] pb-[2px]" label={!!props.postParams ? "Update": "Publish"} icon={IconNames.send} onPress={onPressMutate} />
        </View>
      </View>
      <DateTimePickerModal isVisible={showDatePicker} mode="datetime" date={dateTime || new Date()} minimumDate={minTime()} onConfirm={handleConfirm} onCancel={hideDatePicker} />
    </>
  )
}

export const PostModal = (props: PostModalProps) => {
  return (
    <Modal customModal showModal={props.showModal} setShowModal={props.setShowModal}>
      <PostWrapperComponent actionBarData={props.actionBarData} postHeaderData={props.postHeaderData} onCancel={props.onCancel}>  
        {props.postType === PostType.interest && <PublishInterestPost postParams={props.postParams} onSuccess={props.onCancel} />}
      </PostWrapperComponent>
    </Modal>
  )
}

export const Post = (props: PostProps) => {
  const { postType, actionBarData, postHeaderData,postParams, showModal } = props
  const [showAddPost, setShowAddInterst] = useState<boolean>(showModal || false)

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
      <PostModal postType={postType} showModal={showAddPost} postHeaderData={postHeaderData} postParams={postParams} setShowModal={setShowAddInterst} onCancel={onCancel} />
    </View>
  )
}