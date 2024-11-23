import { TouchableOpacity, View, StyleSheet } from "react-native"
import Label from "../Base/Label"
import { EnrolmentStatus, FontTypes, IconNames, InputSizes, InterestCardProps } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { Btn, CharmBtn } from "../Base/Button"
import Icon from "../Base/Icon"
import { escapePercent } from "@/utils/commonUtils"
import { router } from "expo-router"
import { useDeleteInteresPost, useToggleInterested } from "@/hooks/mutate/useMutateInterestPosts"
import { useState } from "react"
import Modal from "../Base/Modal"
import { PostUserItem } from "./PostUserItem"
import { PostOptions } from "./PostOptions"

const styles = StyleSheet.create({
  wrapper: { position: 'relative', padding: 12, borderRadius: 16,  backgroundColor: Colors.dark.darkText, borderColor: Colors.dark['soundcloud-gdr-1'], borderWidth: 1 },
  optionList: { borderWidth: 1, width: 120, bottom: -1, right: -1, borderRadius: 10, paddingBottom: 6, borderColor: Colors.light.white, position: 'absolute', backgroundColor:Colors.dark.darkText },
  optionListButton: {borderWidth: 0, width: '100%', height: 30, marginBottom: 0, padding: 0, paddingLeft: 8, marginVertical: 6, backgroundColor: 'transparent'},
})

export const InterestCard = ({uid, isOwner, data, disabled, classNames, navigationPath, showOptionInterest, scheduled, noTextLimit, isTogglingEnrole, setShowOptionInterest, onToggleEnrole, onOptionPress, onDelete}: InterestCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const {mutate: deletePost, isPending: isDeleting} = useDeleteInteresPost(() => onDelete && onDelete(), () => {})
  const {mutate: toggleEnrolment, isPending: isToggling} = useToggleInterested(() => {}, () => {})

  const navigateToInterest = () => {
    if (showOptionInterest === data.id) {
      setShowOptionInterest && setShowOptionInterest('')
      return
    }
  
    !disabled && router.push({
      pathname: navigationPath || '/interests/interest-view',
      params: {
        data: JSON.stringify({
          isOwner,
          id: data.id,
          title: data.title,
          description: data.description,
          createdBy: {
            ...data.createdBy,
            profileImageUrl: escapePercent(data?.createdBy?.profileImageUrl || '')
          },
          createdAt: data.createdAt,
          scheduledAt: data.scheduledAt,
          visibility: data.visibility,
          enrolmentStatus: data.enrolmentStatus,
          voteCount: data.voteCount,
        })
      },
    })
    
    setShowOptionInterest && setShowOptionInterest('')
  }

  const onPressInterest = () => {
    if (onToggleEnrole) {
      onToggleEnrole()
    }
    toggleEnrolment({uid: uid || '', interestId: data.id})
  }

  const notEnrolled = !data?.enrolmentStatus || data.enrolmentStatus === EnrolmentStatus.NOT_ENROLLED

  return (
    <>
      <TouchableOpacity className={classNames} activeOpacity={disabled ? 1 : 0.5} style={{...styles.wrapper, ...(scheduled && {opacity: 0.5})}} onPress={navigateToInterest}>
        <View className='flex flex-row items-top'>
          <PostUserItem imageUrl={data.createdBy.profileImageUrl || undefined} userName={data.createdBy.displayName} createdAt={data.createdAt} dateProps={{newLineDate: true}} />
          <View style={{backgroundColor: Colors.light.white, width: 1, height: '100%'}} />
          <Label type={FontTypes.FTitle3Bold} label={data.title} classNames='ml-2 mt-[-4px] w-100' numberOfLines={noTextLimit? undefined: 3} containerStyles={{ flexShrink: 1 }} />
        </View>
        <View className='flex flex-row my-4'>
          <Label label="Why: " type={FontTypes.FLabel} color={Colors.dark.background} containerStyles={{ fontWeight: 500 }} />
          <Label label={data.description} type={FontTypes.FLabel} color={Colors.dark['grey-shade-3']} classNames='w-100' numberOfLines={noTextLimit? undefined: 2} containerStyles={{ flexShrink: 1 }} />
        </View>
        {data.location?.name && <View className="flex flex-row items-center mb-1 pr-3 w-full">
          <Icon name={IconNames.location} color={Colors.light.white} classNames="mr-3" />
          <Label classNames="mr-6" containerStyles={{ fontSize: 16, fontWeight: 400 }} color={Colors.light.white} label={data.location?.name} ellipsizeMode="tail" numberOfLines={noTextLimit? undefined: 2} />
        </View>}
        <View className='flex flex-row items-center justify-between'>
          <View className='flex flex-row items-center'>
            {!isOwner && <Btn isLoading={isToggling || isTogglingEnrole} disabled={isToggling} classNames="mr-2" icon={notEnrolled? IconNames.interests: IconNames.interestsFill} label="Interested" size={InputSizes.sm} outlined={notEnrolled} onPress={onPressInterest} />}
            <View className='flex-row items-center'>
              <Icon name={IconNames.interestsFill} size={InputSizes.sm} />
              <Label label={`|  ${data.voteCount || 0}`} type={FontTypes.FLabel} classNames='ml-1' />
            </View>
          </View>
          <CharmBtn icon={IconNames.options} onPress={() => setShowOptionInterest && setShowOptionInterest(data.id)} size={InputSizes.md} frame={true} />
        </View>
        <PostOptions show={showOptionInterest === data.id} isOwner={!!isOwner} bottom={-1} right={-1} postVisibility={data.visibility} onUpdate={onOptionPress} onDelete={() => setShowDeleteModal(true)} />
      </TouchableOpacity>
      {scheduled && <View className="absolute right-2.5 top-2.5">
        <Icon name={IconNames.timer} size={InputSizes.md} color={Colors.dark["primary-material-1"]}/>
      </View>}
      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <Label type={FontTypes.FTitle1} label={'Do you want to delete this interest post?'} />
        <Label classNames="mt-5" type={FontTypes.FLabelBold} label={'This will be permanently removed!'} />
        <View className="mt-10 ml-0.5 mr-0.5 flex-row justify-between">
          <Btn outlined disabled={isDeleting} onPress={() => setShowDeleteModal(false)} icon={IconNames.cancel} size={InputSizes.md} color={Colors.light.white} label="Cancel" />
          <Btn isLoading={isDeleting} disabled={isDeleting} onPress={() => deletePost({uid: data.createdBy.uid, id: data.id, visibility: data.visibility})} icon={IconNames.delete} size={InputSizes.md} backgroundColor={Colors.dark.red} label="Yes, Delete" />
        </View>
      </Modal>
    </>
  )
}