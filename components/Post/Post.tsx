import { Pressable, StyleSheet, TouchableOpacity, View, ScrollView, Switch, Text } from "react-native"
import Label from "../Base/Label"
import { ActionBarProps, ChallengePostCategory, ChallengePostParams, ChallengeState, CommunityCardData, CommunityPostParams, FontSizes, FontTypes, IconNames, InputSizes, InterestPostParams, PostBottomActionsProps, PostHeaderProps, PostModalProps, PostType, PostWrapperComponentProps, PublishChallengePostProps, PublishCommunityPostProps, PublishInterestPostProps, UploadImage, UserChallengeStatus } from "@/types/Components"
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
import { captureAndPickImage, formatDateToCustomString, minTime, pickImage, setBtnBackgroundColor, setBtnOutlineColor, timeDataToLocalString, updateImageWithSize } from "@/utils/commonUtils"
import { CreateInterestProps, UpdateInterestProps } from "@/api/interestPostApi"
import { ImagePickerBottomDrawer } from "../Common/ImagePickerBottomDrawer"
import { Image } from "expo-image"
import { randomUUID as uuid } from "expo-crypto"
import { useCreateCommunityPost, useUpdateCommunityPost } from "@/hooks/mutate/useMutateCommunityPosts"
import { CreateCommunityPostProps, UpdateCommunityPostProps } from "@/api/communityPostApi"
import { useUploadImage } from "@/hooks/mutate/useMutateImage"
import { CommunityPostTypes, ImageSizes, peopleCountOption, StoragePaths } from "@/constants/values"
import { Input } from "../Base/Input"
import { useCreateChallengePost } from "@/hooks/mutate/useMutateChallengePosts"

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
    width: 24,
    height: 24,
  },
  label: {
    margin: 8,
  },
  removeImage: {position: 'absolute', bottom: 10, right: 10, padding: 6, borderRadius: 8, backgroundColor: Colors.dark['grey-transparent']},
  communityTypeBtn: {width: '100%', paddingHorizontal: 8, height: 50, borderRadius: 10, borderWidth: 1, borderColor: Colors.dark['grey-shade-4'], flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'},
  imagePicker: {position: 'relative', width: '100%', borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.dark["grey-shade-2"], alignItems: 'center', justifyContent: 'center', overflow: 'hidden'},
  bottomBorder: {borderBottomWidth: 1, borderColor: Colors.dark["grey-shade-2"]}
})

export const ActionBar = (props: ActionBarProps) => {
  const { active = false, onPress, title } = props
  return (
    <Pressable onPress={onPress} className={`py-3 px-5 mt-3 mb-4 ml-0 mr-0 rounded-3xl border`} style={{ backgroundColor: Colors.dark.darkText, width: '100%', paddingHorizontal: 10, borderColor: active ? Colors.dark['soundcloud-gdr-1'] : Colors.dark.darkText }}>
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
          <Btn isLoading={props.isLoading} disabled={props.isLoading || !props.isPostPublishable} size={InputSizes.md} fontType={FontTypes.FLabelBold} label={!!props.postTypeUpdate ? 'UPDATE' : 'PUBLISH'} icon={IconNames.send} onPress={props.onPressMutate} />
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
            <Label classNames="ml-2" type={FontTypes.FLabel} color={Colors.dark["grey-shade-3"]} label={props?.postHeaderData?.title} />
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
  const uid = useAuthUserId()

  const [selectedType, setSelectedType] = useState<string | null>(props.postParams?.type || null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isScheduled, setIsScheduled] = useState(!!props.postParams?.scheduledAt?._seconds || false)
  const [dateTime, setDateTime] = useState<Date | null>(!!props.postParams?.scheduledAt ? timeDataToLocalString(props.postParams?.scheduledAt): null)
  const [title, setTtile] = useState(props.postParams?.title || '')
  const [showDrawer, setShowDrawer] = useState(false)
  const [image, setImage] = useState<UploadImage| null>(!!props.postParams?.imageUrls?.md? {
    uri: props.postParams?.imageUrls?.md,
    name: ''
} :null)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const {uploadImage} = useUploadImage((uri) => onSuccessImageUpload(uri), () => {})
  const {mutate: createPost} = useCreateCommunityPost(() => onSuccessCreatePost(), (e) => setIsUploading(false))
  const {mutate: updatePost} = useUpdateCommunityPost((data) => onSuccessUpdatePost(data), (e) => setIsUploading(false))

  useEffect(() => {
    
    return () => {
      props.onClose(true)
    }
  }, [])

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
    props.onClose(true)
  }

  const onSuccessUpdatePost = (data: CommunityCardData) => {
    props.postParams && props?.onSuccess(data)
    setIsUploading(false)
    props.onClose(true)
  }

  const setPostHeaderData = (): PostHeaderProps => {
    return {
      icon: selectedType === CommunityPostTypes[0]? IconNames.addPost: IconNames.qanda,
      title: !props.postParams && selectedType === CommunityPostTypes[0]?
        'Publish a Post'
        : !props.postParams && selectedType === CommunityPostTypes[1]?
          'Ask a question'
          : props.postParams && selectedType === CommunityPostTypes[0]?
            'Update post'
            : props.postParams && selectedType === CommunityPostTypes[1]?
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
      await uploadImage(image, selectedType === CommunityPostTypes[0]? StoragePaths.COMMUNITY_POST: StoragePaths.COMMUNITY_QUESTION)
      return
    }

    setCreatePostData()
  }

  const onUpdatePost = async () => {
    if (!uid || title?.trim() === '') return
 
    setIsUploading(true)

    if (image?.blob) {
      await uploadImage(image, selectedType === CommunityPostTypes[0]? StoragePaths.COMMUNITY_POST: StoragePaths.COMMUNITY_QUESTION)
      return
    }

    setUpdatePostData()
  }

  const onSuccessImageUpload = (imageUrl: string) => {
    props?.postParams?.id? setUpdatePostData(imageUrl) : setCreatePostData(imageUrl)
  }
  

  const setCreatePostData = (imageUrl?: string) => {

    const communityPostData = {
      uid,
      title,
      type: selectedType,
      ...(imageUrl && image?.type && { 
          imageUrls: {
            sm: updateImageWithSize(imageUrl, image?.type, ImageSizes.SM),
            md: updateImageWithSize(imageUrl, image?.type, ImageSizes.MD),
            lg: updateImageWithSize(imageUrl, image?.type, ImageSizes.LG)
          }
        }),
      ...(dateTime && isScheduled && { scheduledAt: dateTime?.toISOString() })
    } as CreateCommunityPostProps

    createPost(communityPostData)
  }

  const setUpdatePostData = (imageUrl?: string) => {

  const imageStatus = checkImageStatus(image, props.postParams?.imageUrls?.md)

  const communityPostData = {
    id: props?.postParams?.id,
    uid,
    title,
    ...(imageStatus !== 'unchanged' && {imageStatus}),
    type: selectedType,
    ...(imageUrl && image?.type && imageStatus === 'updated' && { 
        imageUrls: {
          sm: updateImageWithSize(imageUrl, image?.type, ImageSizes.SM),
          md: updateImageWithSize(imageUrl, image?.type, ImageSizes.MD),
          lg: updateImageWithSize(imageUrl, image?.type, ImageSizes.LG)
        }
      }),
    ...(dateTime && isScheduled && { scheduledAt: dateTime?.toISOString() })
  } as UpdateCommunityPostProps

  updatePost(communityPostData)
}

const checkImageStatus = (image: UploadImage | null, initialImageUri: string | undefined) => {
  if (!image && initialImageUri) return 'deleted'
  if (image?.uri && image.uri !== initialImageUri) return 'updated'
  return 'unchanged'
}

  const onPressMutate = () => {
    props.postParams?.id ? onUpdatePost(): onCreatePost()
  }

  return (
    <>
      <Pressable className="pl-[10px] pr-[10px] pt-[75px] w-full h-full" onPress={() => !selectedType && props.onClose(true)}>
        <ActionBar {...{ ...props.actionBarData }} active={true} onPress={() => {}} />
        {!selectedType && <TouchableOpacity activeOpacity={1} className="w-full h-4" />}
        <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
          {selectedType && (
            <PostWrapperComponent postHeaderData={setPostHeaderData()} onCancel={() => props.onClose(true)}>
              <TouchableOpacity disabled={isUploading} style={{...styles.imagePicker, aspectRatio: !!image? 1: 2 }} onPress={() => setShowDrawer(true)}>
                {!image &&(
                  <>
                    <Icon name={IconNames.image} size={InputSizes.xl} />
                    <Label classNames="mt-[10px]" label="Add an image" color={Colors.dark["grey-shade-3"]} />
                  </>
                )}
                {image && (
                  <Image style={{width: '100%', height: '100%'}} source={image.uri} contentFit="cover" transition={500} />
                )}
                {image && <TouchableOpacity disabled={isUploading} style={styles.removeImage} onPress={() => setImage(null)}>
                  <Icon name={IconNames.delete} />
                </TouchableOpacity>}
              </TouchableOpacity>
              <TextArea disabled={isUploading} clasName="mt-[10px]" height={120} maxCharacters={2000} value={title} placeHolder={selectedType === CommunityPostTypes[0]? "Enter your thoughts...": "What's your problem? we can help you :)"} onChangeText={setTtile}
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
              {selectedType !== CommunityPostTypes[0] && (
                <>
                  <TouchableOpacity style={styles.communityTypeBtn}  onPress={() => setSelectedType(CommunityPostTypes[0])} >
                    <Icon name={IconNames.addPost} color={Colors.dark['grey-shade-4']} />
                    <View className="ml-2">
                      <Label classNames="mb-1" label="Publish post" color={Colors.dark['grey-shade-4']} />
                      <Label label="Share your thoughts, ideas & tips with your followers" type={FontTypes.FSmall} color={Colors.dark['grey-shade-3']} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1}  className="w-full h-4" />
                </>
              )}
              {selectedType !== CommunityPostTypes[1] && (
                <>
                  <TouchableOpacity style={styles.communityTypeBtn} onPress={() => setSelectedType(CommunityPostTypes[1])}>
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
        </ScrollView>
      </Pressable>
      
      <ImagePickerBottomDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} onPressImagePickItem={onPressImagePickItem} />
    </>
  )
}

const PublishChallengePost = (props: PublishChallengePostProps) => {
  const uid = useAuthUserId()

  const [description, setDescription] = useState('')
  const [type, setType] = useState(ChallengePostCategory.ON_LOCATION)
  const [date, setDate] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [location, setLocation] = useState('')
  const [peopleCount, setPeopleCount] = useState(peopleCountOption[0])
  const [joinAnyone, setJoinAnyone] = useState(false)

  const {mutate: createChallenge, isPending: creatingPost} = useCreateChallengePost(() => props.onSuccess(), () => {})

  const onCreateChallenge = () => {
    uid && description?.trim() !== '' && location?.trim() !== '' && !!date && createChallenge({
      uid,
      participantStatus: UserChallengeStatus.JOINED,
      challengeState: ChallengeState.SCHEDULED,
      type,
      participationRangeId: peopleCount.value,
      description,
      location,
      challengeAt: date?.toISOString() || '',
      joinAnyone
    })
  }

  const scheduledText = date ? `Challenge at ${formatDateToCustomString(date)}` : 'Challenge at?'

  const toggleType = (selectedType: ChallengePostCategory) => setType(selectedType)
  const updatePeopleCount = (countOption: any) => setPeopleCount(countOption)

  return (
    <View className="pl-[10px] pr-[10px] pt-[75px] w-full h-full">
      <ActionBar {...props.actionBarData} active onPress={() => {}} />
      <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
        <PostWrapperComponent postHeaderData={props.postHeaderData} onCancel={props.onSuccess}>
          <TextArea disabled={false} clasName="mt-[10px]" height={100} maxCharacters={2000} value={description} placeHolder="Ex: 30 pushups in 30 seconds" onChangeText={setDescription} />

          {/* <Label  type={FontTypes.FLabel} color={Colors.dark["grey-shade-3"]} label='{`'Challenge type' /> */}
          <Text className="mt-3 mb-3" style={{fontSize: 14, fontWeight: 400, color: Colors.dark["grey-shade-3"]}}>Challenges are <Text style={{textDecorationLine: 'underline', fontWeight: 500}}>on location</Text> events</Text>

          {/* <View className="flex flex-row items-center w-full pb-3">
            {[ChallengePostCategory.VIRTUAL, ChallengePostCategory.ON_LOCATION].map((category) => (
              <Btn
                key={category}
                outlined={type !== category}
                size={InputSizes.sm}
                color={setBtnOutlineColor(type !== category)}
                backgroundColor={setBtnBackgroundColor(type === category)}
                icon={category === ChallengePostCategory.VIRTUAL ? IconNames.virtual : IconNames.onLocation}
                label={category === ChallengePostCategory.VIRTUAL ? "VIRTUAL" : "ON LOCATION"}
                wrapperClasses="mr-3"
                fontType={FontTypes.FLabelBold}
                onPress={() => toggleType(category)}
              />
            ))}
          </View> */}

          <View className="flex flex-row items-center w-full pb-3" style={styles.bottomBorder}>
            <Icon name={IconNames.exclamation} color={Colors.dark["grey-shade-2"]} />
            <Label classNames="ml-2 w-[90%]" color={Colors.dark["grey-shade-2"]} containerStyles={{ fontStyle: 'italic' }} label={type === ChallengePostCategory.VIRTUAL? "Virtual challenge lets participants join remotely from anywhere": "This requires participants to be physically present"}/>
          </View>

          <Label classNames="mt-3 mb-3" type={FontTypes.FLabel} color={Colors.dark["grey-shade-3"]} label={`Challenge time & location${type !== ChallengePostCategory.VIRTUAL ? '*' : ''}`}/>
          <Input classNames="mb-5" placeholder="CHALLENGE LOCATION" icon={IconNames.location} fontSize={FontSizes.FLabel} containerStyles={{ height: 50 }} value={location} onChange={setLocation}/>
          <View className="flex flex-row justify-between w-full pb-3" style={styles.bottomBorder}>
            <Pressable className="flex flex-row items-center" onPress={() => setShowDatePicker(true)}>
              <Checkbox classNames="mr-3" isChecked={!!date} onPress={() => (date ? setDate(null) : setShowDatePicker(true))} />
              <Label label={scheduledText} type={FontTypes.FLabel} color={Colors.dark['grey-shade-3']} />
            </Pressable>
          </View>

          <Label classNames="mt-3 mb-3" type={FontTypes.FLabel} color={Colors.dark["grey-shade-3"]} label="Challenge participants" />
          <View className="flex flex-row items-center w-full pb-4">
            {peopleCountOption.map((countOption, index) => (
              <Btn
                key={index}
                outlined={peopleCount !== countOption}
                size={InputSizes.sm}
                color={setBtnOutlineColor(peopleCount !== countOption)}
                backgroundColor={setBtnBackgroundColor(peopleCount === countOption)}
                label={countOption.label}
                wrapperClasses="mr-3"
                fontType={FontTypes.FLabelBold}
                onPress={() => updatePeopleCount(countOption)}
              />
            ))}
          </View>

          <View className="flex flex-row items-center w-full pb-4">
            <Switch value={joinAnyone} style={{ padding: 0, marginTop: -5 }} trackColor={{ false: Colors.dark["primary-shade-3"], true: Colors.dark["soundcloud-gdr-1"] }} thumbColor={Colors.dark["grey-shade-4"]} onValueChange={setJoinAnyone}/>
            <Label classNames="pb-1 ml-2" type={FontTypes.FLabel} color={Colors.dark["grey-shade-3"]} label="Allow anyone to join" />
          </View>

          <View className="flex flex-row items-center w-full pb-3 mt-[-10px]" style={styles.bottomBorder}>
            <Icon name={IconNames.exclamation} color={Colors.dark["grey-shade-2"]} />
            <Label classNames="ml-2 w-[90%]" color={Colors.dark["grey-shade-2"]} containerStyles={{ fontStyle: 'italic' }} label="Participation is limited by group size" />
          </View>

          <Btn isLoading={creatingPost} disabled={creatingPost} size={InputSizes.md} fontType={FontTypes.FLabelBold} wrapperClasses="ml-[auto] mt-3" label={props.postParams ? 'UPDATE' : 'PUBLISH'} icon={IconNames.send} onPress={onCreateChallenge} />
        </PostWrapperComponent>
        <View className="mb-20" />
      </ScrollView>
      <DateTimePickerModal isVisible={showDatePicker} mode="datetime" date={date || new Date()} minimumDate={minTime()} onConfirm={(d) => { setDate(d); setShowDatePicker(false); }} onCancel={() => setShowDatePicker(false)} />
    </View>
  )
}


export const PostModal = (props: PostModalProps) => {
  return (
    <Modal customModal showModal={props.showModal} setShowModal={props.setShowModal}>
      {props.postType === PostType.interest && (
        <PublishInterestPost postHeaderData={props.postHeaderData} actionBarData={props.actionBarData} postParams={props.postParams as InterestPostParams} onSuccess={props.onCancel} />
      )}
      {props.postType === PostType.community && (
        <PublishCommunityPost postParams={props.postParams as CommunityPostParams} actionBarData={props.actionBarData} onSuccess={(data) => props.onSuccess?.(data)} onClose={props.onCancel} />
      )}
      {props.postType === PostType.challenge && (
        <PublishChallengePost postHeaderData={props.postHeaderData} actionBarData={props.actionBarData} postParams={props.postParams as ChallengePostParams} onSuccess={props.onCancel} />
      )}  
    </Modal>
  )
}
