import { TouchableOpacity, View, StyleSheet, FlatList, ActivityIndicator } from "react-native"
import { Avatar } from "../Base/Avatar"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes, InterestCardProps, PostVisibility } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { Btn, BtnDetailed, CharmBtn } from "../Base/Button"
import Icon from "../Base/Icon"
import { escapePercent, postCreateTimeToDate } from "@/utils/commonUtils"
import { router } from "expo-router"
import { useDeleteInteresPost } from "@/hooks/mutate/useMutateInterestPosts"
import { useState } from "react"
import Modal from "../Base/Modal"
import { PostUserItem } from "./PostUserItem"

const styles = StyleSheet.create({
  wrapper: { position: 'relative', padding: 12, borderRadius: 16,  backgroundColor: Colors.dark.darkText, borderColor: Colors.dark['soundcloud-gdr-1'], borderWidth: 1 },
  optionList: { borderWidth: 1, width: 120, bottom: -1, right: -1, borderRadius: 10, paddingBottom: 6, borderColor: Colors.light.white, position: 'absolute', backgroundColor:Colors.dark.darkText },
  optionListButton: {borderWidth: 0, width: '100%', height: 30, marginBottom: 0, padding: 0, paddingLeft: 8, marginVertical: 6, backgroundColor: 'transparent'},
})

export const InterestCard = ({isOwner, data, disabled, classNames, navigationPath, showOptionInterest, setShowOptionInterest, onOptionPress, onDelete}: InterestCardProps) => {
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
          createdUser: {
            ...data.createdUser,
            profileImageUrl: escapePercent(data?.createdUser?.profileImageUrl || '')
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
      <TouchableOpacity className={classNames} activeOpacity={disabled ? 1 : 0.5} style={styles.wrapper} onPress={navigateToInterest}>
        <View className='flex flex-row items-top'>
          <PostUserItem imageUrl={data.createdUser.profileImageUrl || undefined} userName={data.createdUser.displayName} createdAt={data.createdAt} />
          <View style={{backgroundColor: Colors.light.white, width: 1, height: '100%'}} />
          <Label type={FontTypes.FTitle3Bold} label={data.title} classNames='ml-2 mt-[-4px] w-100' numberOfLines={3} containerStyles={{ flexShrink: 1 }} />
        </View>
        <View className='flex flex-row my-4'>
          <Label label="Why: " type={FontTypes.FLabel} color={Colors.dark.background} containerStyles={{ fontWeight: 500 }} />
          <Label label={data.description} type={FontTypes.FLabel} color={Colors.dark['grey-shade-3']} classNames='w-100' numberOfLines={2} containerStyles={{ flexShrink: 1 }} />
        </View>
        <View className='flex flex-row items-center justify-between'>
          <View className='flex flex-row items-center'>
            <Btn icon={IconNames.interests} label="Interested" size={InputSizes.sm} outlined />
            <View className='flex-row items-center ml-2'>
              <Icon name={IconNames.interestsFill} size={InputSizes.sm} />
              <Label label={`|  ${data.voteCount}`} type={FontTypes.FLabel} classNames='ml-1' />
            </View>
          </View>
          <CharmBtn icon={IconNames.options} onPress={() => setShowOptionInterest && setShowOptionInterest(data.id)} size={InputSizes.md} frame={true} />
        </View>
        {showOptionInterest === data.id && (
          <View style={styles.optionList}>
            {isOwner? <>
              {data.visibility !== PostVisibility.public && <>
                  <BtnDetailed label="Update" leftIcon={{name: IconNames.editPencil}} wrapperStyle={styles.optionListButton} onPress={onOptionPress} />
                </>
              }
              <BtnDetailed label="Delete" leftIcon={{name: IconNames.delete}} wrapperStyle={styles.optionListButton} onPress={() => setShowDeleteModal(true)} />
            </>: <BtnDetailed label="Report" leftIcon={{name: IconNames.report}} wrapperStyle={styles.optionListButton} onPress={() => {}} />}
          </View>
        )}
      </TouchableOpacity>
      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <Label type={FontTypes.FTitle1} label={'Want to detete this interest post?'} />
        <Label classNames="mt-5" type={FontTypes.FLabelBold} label={'Post data will be permanently removed!'} />
        <View className="mt-10 ml-0.5 mr-0.5 flex-row justify-between">
          <Btn outlined disabled={isDeleting} onPress={() => setShowDeleteModal(false)} icon={IconNames.cancel} size={InputSizes.md} color={Colors.light.white} label="Cancel" />
          <Btn isLoading={isDeleting} disabled={isDeleting} onPress={() => deletePost({uid: data.createdUser.uid, id: data.id})} icon={IconNames.save} size={InputSizes.md} backgroundColor={Colors.dark.red} label="Yes, Delete" />
        </View>
      </Modal>
    </>
  )
}