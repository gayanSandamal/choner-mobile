import { TouchableOpacity, View, StyleSheet } from "react-native"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes, InterestCardProps } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { Btn, CharmBtn } from "../Base/Button"
import Icon from "../Base/Icon"
import { escapePercent } from "@/utils/commonUtils"
import { router } from "expo-router"
import { useDeleteInteresPost } from "@/hooks/mutate/useMutateInterestPosts"
import { useState } from "react"
import Modal from "../Base/Modal"
import { PostUserItem } from "./PostUserItem"
import { PostOptions } from "./PostOptions"

const styles = StyleSheet.create({
  wrapper: { position: 'relative', padding: 12, borderRadius: 16,  backgroundColor: Colors.dark.darkText, borderColor: Colors.dark['soundcloud-gdr-1'], borderWidth: 1 },
  optionList: { borderWidth: 1, width: 120, bottom: -1, right: -1, borderRadius: 10, paddingBottom: 6, borderColor: Colors.light.white, position: 'absolute', backgroundColor:Colors.dark.darkText },
  optionListButton: {borderWidth: 0, width: '100%', height: 30, marginBottom: 0, padding: 0, paddingLeft: 8, marginVertical: 6, backgroundColor: 'transparent'},
})

export const InterestCard = ({isOwner, data, disabled, classNames, navigationPath, showOptionInterest, scheduled, setShowOptionInterest, onOptionPress, onDelete}: InterestCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const {mutate: deletePost, isPending: isDeleting} = useDeleteInteresPost(() => onDelete && onDelete(), () => {})

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
          voteCount: data.voteCount,
        })
      },
    })
    
    setShowOptionInterest && setShowOptionInterest('')
  }

  return (
    <>
      <TouchableOpacity className={classNames} activeOpacity={disabled ? 1 : 0.5} style={{...styles.wrapper, ...(scheduled && {opacity: 0.5})}} onPress={navigateToInterest}>
        <View className='flex flex-row items-top'>
          <PostUserItem imageUrl={data.createdBy.profileImageUrl || undefined} userName={data.createdBy.displayName} createdAt={data.createdAt} dateProps={{newLineDate: true}} />
          <View style={{backgroundColor: Colors.light.white, width: 1, height: '100%'}} />
          <Label type={FontTypes.FTitle3Bold} label={data.title} classNames='ml-2 mt-[-4px] w-100' numberOfLines={3} containerStyles={{ flexShrink: 1 }} />
        </View>
        <View className='flex flex-row my-4'>
          <Label label="Why: " type={FontTypes.FLabel} color={Colors.dark.background} containerStyles={{ fontWeight: 500 }} />
          <Label label={data.description} type={FontTypes.FLabel} color={Colors.dark['grey-shade-3']} classNames='w-100' numberOfLines={2} containerStyles={{ flexShrink: 1 }} />
        </View>
        <View className='flex flex-row items-center justify-between'>
          <View className='flex flex-row items-center'>
            {!isOwner && <Btn classNames="mr-2" icon={IconNames.interests} label="Interested" size={InputSizes.sm} outlined />}
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
        <Label type={FontTypes.FTitle1} label={'Want to detete this interest post?'} />
        <Label classNames="mt-5" type={FontTypes.FLabelBold} label={'Post data will be permanently removed!'} />
        <View className="mt-10 ml-0.5 mr-0.5 flex-row justify-between">
          <Btn outlined disabled={isDeleting} onPress={() => setShowDeleteModal(false)} icon={IconNames.cancel} size={InputSizes.md} color={Colors.light.white} label="Cancel" />
          <Btn isLoading={isDeleting} disabled={isDeleting} onPress={() => deletePost({uid: data.createdBy.uid, id: data.id, visibility: data.visibility})} icon={IconNames.delete} size={InputSizes.md} backgroundColor={Colors.dark.red} label="Yes, Delete" />
        </View>
      </Modal>
    </>
  )
}