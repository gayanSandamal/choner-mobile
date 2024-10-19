import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import Label from "../Base/Label"
import { ActionBarProps, CommunityPostParams, FontTypes, IconNames, InputSizes, InterestPostParams, PostBottomActionsProps, PostHeaderProps, PostModalProps, PostType, PostWrapperComponentProps, PublishCommunityPostProps, PublishInterestPostProps, UploadImage } from "@/types/Components"
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
import { captureAndPickImage, formatDateToCustomString, getBlobFromUri, minTime, pickImage, timeDataToLocalString } from "@/utils/commonUtils"
import { CreateInterestProps, UpdateInterestProps } from "@/api/interestPostApi"
import { ImagePickerBottomDrawer } from "../Common/ImagePickerBottomDrawer"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from 'expo-media-library'
import { Image } from "expo-image"
import { randomUUID as uuid } from "expo-crypto"
import { useCreateCommunityPost } from "@/hooks/mutate/useMutateCommunityPosts"
import { CreateCommunityPostProps } from "@/api/communityPostApi"
import { useUploadImage } from "@/hooks/mutate/useMutateImage"
import { StoragePaths } from "@/constants/values"

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
    width: 24,
    height: 24,
  },
  label: {
    margin: 8,
  },
  communityTypeBtn: {width: '100%', paddingHorizontal: 8, height: 50, borderRadius: 10, borderWidth: 1, borderColor: Colors.dark['grey-shade-4'], flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'},
  imagePicker: {width: '100%', aspectRatio: 1, borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.dark["grey-shade-2"], alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}
})

export const ActionBar = (props: ActionBarProps) => {
  const { active = false, onPress, title } = props
  return (
    <Pressable onPress={onPress} className={`py-3 px-5 mt-3 mb-4 rounded-3xl border`} style={{ backgroundColor: Colors.dark.darkText, width: '100%', paddingHorizontal: 10, borderColor: active ? Colors.dark['soundcloud-gdr-1'] : Colors.dark.darkText }}>
      <Label containerStyles={{ fontWeight: 400 }} type={FontTypes.FTitle3} label={title} />
    </Pressable>
  )
}

const PostBottomActions = (props: PostBottomActionsProps) => {
  const scheduledText = () => {
    return props.isScheduled && props.dateTime ? `Schedule at ${props.dateTime && formatDateToCustomString(props.dateTime)}` : 'Schedule'
  }
  return (
    <>
      <View className="flex items-center justify-end w-full mt-4">
        <View className="flex flex-row justify-between w-full">
          <Pressable className="flex flex-row items-center justify-between" onPress={() => props.setShowDatePicker(true)}>
            <Checkbox classNames="mr-2" isChecked={props.isScheduled} onPress={(state) => props.isScheduled ? props.setIsScheduled(state) : props.setShowDatePicker(true)} />
            <Label type={FontTypes.FSmall} label={scheduledText()} color={Colors.dark['grey-shade-3']} containerStyles={{ fontWeight: 400, textAlign: 'right' }} />
          </Pressable>
          <Btn isLoading={props.isLoading} disabled={props.isLoading || !props.isPostPublishable} className="pt-[2px] pb-[2px]" label={!!props.postTypeUpdate ? 'Update' : 'Publish'} icon={IconNames.send} onPress={props.onPressMutate} />
        </View>
      </View>
      <DateTimePickerModal isVisible={props.showDatePicker} mode="datetime" date={props.dateTime || new Date()} minimumDate={minTime()} onConfirm={props.handleConfirm} onCancel={props.hideDatePicker} />
    </>
  );
};

const PostWrapperComponent = (props: PostWrapperComponentProps) => {
  return (
    <View className="mt-4">
      <View className="flex flex-column items-start rounded-lg px-4 py-3 mb-4 bg-grey" style={{ borderColor: Colors.dark.background, borderWidth: 1 }} >
        <View className="flex flex-row items-center mb-3 w-full">
          <View className="flex flex-row items-center">
            <Icon name={props?.postHeaderData?.icon || ''} size={InputSizes.md} />
            <Label classNames="ml-2" type={FontTypes.FLabel} containerStyles={{ fontWeight: 600 }} label={props?.postHeaderData?.title} />
          </View>
          <View className="ml-[auto]">
            <CharmBtn clear icon={IconNames.cancel} onPress={props.onCancel} size={InputSizes.sm} frame={true} />
          </View>
        </View>
        {props.children}
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
  const { mutate: updatePost, isPending: isUpdatingPost } = useUpdateInteresPost(() => onSuccess(), () => {})

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

  return (
    <View className="pl-[10px] pr-[10px] pt-[75px] w-full h-full">
      <ActionBar {...{ ...props.actionBarData }} active={true} onPress={() => { }} />
      <PostWrapperComponent postHeaderData={props.postHeaderData} onCancel={props.onSuccess}>
        <TextArea disabled={isCreatingPost || isUpdatingPost} disableNewLine height={50} maxLines={2} maxCharacters={90} value={interest} placeHolder={"what is your interest?"} onChangeText={(text) => setInterestData((prev) => ({ ...prev, interest: text }))} />
        <TextArea disabled={isCreatingPost || isUpdatingPost} clasName="mt-[10px]" height={80} maxCharacters={200} value={interestDesc} placeHolder={"Why are you interested?"} onChangeText={(text) => setInterestData((prev) => ({ ...prev, interestDesc: text }))} />
        <PostBottomActions
          isScheduled={isScheduled}
          dateTime={dateTime}
          showDatePicker={showDatePicker}
          isPostPublishable={isPostPublishable}
          isLoading={isUpdatingPost || isCreatingPost}
          postTypeUpdate={!!props.postParams}
          onPressMutate={onPressMutate}
          handleConfirm={handleConfirm}
          hideDatePicker={hideDatePicker}
          setShowDatePicker={setShowDatePicker}
          setIsScheduled={setIsScheduled}
        />
      </PostWrapperComponent>
    </View>
  )
}

export const PublishCommunityPost = (props: PublishCommunityPostProps) => {
  const postTypes = ['post', 'question']
  
  const uid = useAuthUserId()

  const [selectedType, setSelectedType] = useState<string | null>(props.postParams?.type || null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)
  const [dateTime, setDateTime] = useState<Date | null>(null)
  const [title, setTtile] = useState('')
  const [showDrawer, setShowDrawer] = useState(false)
  const [image, setImage] = useState<UploadImage| null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const {uploadImage} = useUploadImage((uri) => onSuccessImageUpload(uri), () => {})
  const {mutate: createPost, isPending: isCreatingPost} = useCreateCommunityPost(() => onSuccessCreatePost(), () => {setIsUploading(false)})

  const hideDatePicker = useCallback(() => {
    setShowDatePicker(false)
  }, [])

  const handleConfirm = useCallback((date: Date) => {
    hideDatePicker()
    setIsScheduled(true)
    setDateTime(date)
  }, [showDatePicker])

  const onSuccessCreatePost = () => {
    setIsUploading(false)
    props.onSuccess()
  }

  const setPostHeaderData = (): PostHeaderProps => {
    return {
      icon: selectedType === postTypes[0]? IconNames.addPost: IconNames.qanda,
      title: !props.postParams && selectedType === postTypes[0]?
        'Publish a Post'
        : !props.postParams && selectedType === postTypes[1]?
          'Ask a question'
          : props.postParams && selectedType === postTypes[0]?
            'Update post'
            : props.postParams && selectedType === postTypes[1]?
              'Update question': '',
      onCancel: () => props.onClose(true),
    }
  }

  const onPressImagePickItem = async (index: number) => {
    const imageId = `${uid}-${uuid()}`
    if (index === 0) {
      const imageData = await captureAndPickImage(imageId)
      setImage(imageData)
    } else {
      const imageData = await pickImage(imageId)
      setImage(imageData)
    }
    setShowDrawer(false)
  }

  const onCreatePost = async () => {
    if (!uid || title?.trim() === '') return
 
    setIsUploading(true)

    if (image?.blob) {
      await uploadImage(image, selectedType === postTypes[0]? StoragePaths.COMMUNITY_POST: StoragePaths.COMMUNITY_QUESTION)
      return
    }

    setCreatePostData()
  }

  const onSuccessImageUpload = (imageUrl: string) => {
    setCreatePostData(imageUrl)
  }

  const setCreatePostData = (imageUrl?: string) => {
    const communityPostData = {
      uid,
      title,
      type: selectedType,
      imageUrl,
      ...(dateTime && isScheduled && { scheduledAt: dateTime?.toISOString() })
    } as CreateCommunityPostProps

    createPost(communityPostData)
  } 

  const onPressMutate = () => {
    props.postParams?.id ? () => {}: onCreatePost()
  }

  return (
    <>
      <Pressable className="pl-[10px] pr-[10px] pt-[75px] w-full h-full" onPress={() => !selectedType && props.onClose(true)}>
        <ActionBar {...{ ...props.actionBarData }} active={true} onPress={() => {}} />
        {!selectedType && <TouchableOpacity activeOpacity={1} className="w-full h-4" />}
        {selectedType && (
          <PostWrapperComponent postHeaderData={setPostHeaderData()} onCancel={() => props.onClose(true)}>
            <TouchableOpacity disabled={isUploading} style={styles.imagePicker} onPress={() => setShowDrawer(true)}>
              {!image &&(
                <>
                  <Icon name={IconNames.image} size={InputSizes.xl} />
                  <Label classNames="mt-[10px]" label="Add an image" color={Colors.dark["grey-shade-3"]} />
                </>
              )}
              {image && (
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={image.uri}
                  contentFit="cover"
                  transition={500}
              />
              )}
            </TouchableOpacity>
            <TextArea
              disabled={isUploading}
              clasName="mt-[10px]"
              height={100}
              maxCharacters={300}
              value={title}
              placeHolder={selectedType === postTypes[0]? "Enter your thoughts...": "What's your problem? we can help you :)"}
              onChangeText={setTtile}
            />
            <PostBottomActions
              isScheduled={isScheduled}
              dateTime={dateTime}
              showDatePicker={showDatePicker}
              isPostPublishable={title?.trim() !== ''}
              isLoading={isUploading}
              postTypeUpdate={!!props?.postParams}
              onPressMutate={onPressMutate}
              handleConfirm={handleConfirm}
              hideDatePicker={hideDatePicker}
              setShowDatePicker={setShowDatePicker}
              setIsScheduled={setIsScheduled}
            />
          </PostWrapperComponent>
        )}
        {!props.postParams && (
          <>
            {selectedType !== postTypes[0] && (
              <>
                <TouchableOpacity style={styles.communityTypeBtn}  onPress={() => setSelectedType(postTypes[0])} >
                  <Icon name={IconNames.addPost} color={Colors.dark['grey-shade-4']} />
                  <View className="ml-2">
                    <Label classNames="mb-1" label="Publish post" color={Colors.dark['grey-shade-4']} />
                    <Label label="Share your thoughts, ideas & tips with your followers" type={FontTypes.FSmall} color={Colors.dark['grey-shade-3']} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}  className="w-full h-4" />
              </>
            )}
            {selectedType !== postTypes[1] && (
              <>
                <TouchableOpacity style={styles.communityTypeBtn} onPress={() => setSelectedType(postTypes[1])}>
                  <Icon name={IconNames.qanda} color={Colors.dark['grey-shade-4']} />
                  <View className="ml-2">
                    <Label classNames="mb-1" label="Need an answer?" color={Colors.dark['grey-shade-4']} />
                    <Label label="Get help from your audience by publishing your question" type={FontTypes.FSmall} color={Colors.dark['grey-shade-3']} />
                  </View>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
        <TouchableOpacity activeOpacity={1} className="w-full h-4" />
      </Pressable>
      
      <ImagePickerBottomDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} onPressImagePickItem={onPressImagePickItem} />
    </>
  )
}

export const PostModal = (props: PostModalProps) => {
  return (
    <Modal customModal showModal={props.showModal} setShowModal={props.setShowModal}>
      {props.postType === PostType.interest && (
            <PublishInterestPost postHeaderData={props.postHeaderData} actionBarData={props.actionBarData} postParams={props.postParams as InterestPostParams} onSuccess={props.onCancel} />
      )}  
      {props.postType === PostType.community && <PublishCommunityPost postParams={props.postParams as CommunityPostParams} actionBarData={props.actionBarData} onSuccess={props.onCancel} onClose={props.onCancel} />}
    </Modal>
  )
}
