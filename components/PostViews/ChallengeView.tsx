import { useUser } from "@/contexts/userContext"
import { ChallengePostCardProps, ChallengeState, FontTypes, IconNames, InputSizes, PostType, UserChallengeStatus } from "@/types/Components"
import { unescapePercent } from "@/utils/commonUtils"
import { router, useLocalSearchParams } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, RefreshControl, ScrollView, View, StyleSheet } from "react-native"
import { Colors } from "@/constants/Colors"
import { QueryKeys } from "@/constants/values"
import { useQueryClient } from "@tanstack/react-query"
import { useFetchCommemnts } from "@/hooks/get/useFetchComments"
import { ChallengeViewCard } from "../Common/ChallengeViewCard"
import { useCreateComment } from "@/hooks/mutate/useMutateComments"
import { PostModal } from "../Post/Post"
import { Btn, BtnDetailed } from "../Base/Button"
import Label from "../Base/Label"
import Modal from "../Base/Modal"
import { useDeleteChallengePost, useToggleUserChallengeStatus } from "@/hooks/mutate/useMutateChallengePosts"
import { CommentsList } from "../Common/CommentsList"
import { RequestedParticipants } from "../Challenges/RequestedParticipants"

const styles = StyleSheet.create({
  optionList: { zIndex: 2, borderWidth: 1, width: 120, right: 10, top: 45, borderRadius: 10, paddingBottom: 6, borderColor: Colors.light.white, position: 'absolute', backgroundColor:Colors.dark.darkText },
  optionListButton: {borderWidth: 0, width: '100%', height: 30, marginBottom: 0, padding: 0, paddingLeft: 8, marginVertical: 6, backgroundColor: 'transparent'},
  commentsSelerator: {borderTopWidth: 1, borderTopColor: Colors.dark['grey-shade-3'], width: '100%'}
})



export default function ChallengeView() {
  const { user } = useUser()
  const { data } = useLocalSearchParams()

  const queryClient = useQueryClient()

  const [postData, setPostData] = useState<ChallengePostCardProps | null>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showUpdate, setShowUpdate] = useState<boolean>(false)
  const [commentText, setCommentText] = useState<string>('')
  const [showWaitingList, setShowWaitingList] = useState<boolean>(false)

  const {mutate: deletePost, isPending: deletingPost} = useDeleteChallengePost(() => router.back(), () => {})
  const { mutate: addComment, isPending: addingComment } = useCreateComment(() => setCommentText(''), () => { })
  const {mutate: toggleParticipation, isPending: togglingChallenge} = useToggleUserChallengeStatus((data) => onSuccessToggleJoin(data), () => {})
  const { data: comments, isFetching: fetchingComments, refetch: refetchComments } = useFetchCommemnts(postData?.id || '', user?.uid || '', 'challengesPost', !!postData?.id && !!user?.uid)

  useEffect(() => {
    const challenge = JSON.parse(data as string)
    const decodedInterest = {
      ...challenge,
      createdBy: {
        ...challenge.createdBy,
        profileImageUrl: unescapePercent(challenge.createdBy.profileImageUrl)
      }
    }
    setPostData(decodedInterest)
  }, [data])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetchComments().then(() => {
      try {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.REPLIES, postData?.id] })
      } catch (e) { }
    })
    setRefreshing(false)
  }, [refetchComments])

  const onCloseModal = () => {
    setShowUpdate(false)
  }

  const onToggleParticipation = () => toggleParticipation({uid: user?.uid || '', challengeId: postData?.id})

  const onSuccessToggleJoin = (data: ChallengePostCardProps) => {
    const updatedChallenge = {...postData, participantStatus: data.participantStatus}
    setPostData(updatedChallenge as ChallengePostCardProps)
  }

  const onScrollTouchEnd = () => {
    showOptions && setShowOptions(false)
  }

  const onSuccessUpdate = (data: ChallengePostCardProps) => {
    setPostData({ ...data, isOwner: postData?.isOwner })
    setShowUpdate(false)
  }

  const onAddComment = () => addComment({
    uid: user?.uid || '',
    postId: postData?.id || '',
    comment: commentText,
    type: 'challengesPost'
  })

  const onDeletePost = () => user && postData && deletePost({uid: user?.uid, challengeId: postData.id, type: postData.type})

  const optionButtons = [{ name: 'Edit', icon: IconNames.editPencil, visible: postData?.isOwner, onPress: () => setShowUpdate(true) }, { name: 'Delete', icon: IconNames.delete, visible: postData?.isOwner, onPress: () => setShowDeleteModal(true) }, { name: 'Leave', icon: IconNames.logout, visible: !postData?.isOwner && postData?.participantStatus !== UserChallengeStatus.NOT_JOINED, onPress: () => onToggleParticipation() }, { name: 'Report', icon: IconNames.report, visible: !postData?.isOwner, onPress: () => {} }]

  if (!postData || !user) {
    return <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />
  }

  return (
    <>
      <PostModal
        postType={PostType.challenge}
        showModal={showUpdate}
        postParams={postData}
        postHeaderData={{
          icon: IconNames.addPost,
          title: 'Edit this challenge'
        }}
        actionBarData={{ title: 'Hey, want to update your challenge..?' }}
        onCancel={onCloseModal}
        setShowModal={onCloseModal}
        onSuccess={(data) => onSuccessUpdate(data as ChallengePostCardProps)}
      />
      <ScrollView className="mt-2" onTouchEnd={onScrollTouchEnd} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <ChallengeViewCard item={postData} isLeaving={togglingChallenge} isJoining={postData.participantStatus === UserChallengeStatus.NOT_JOINED && togglingChallenge} uid={user?.uid} onPressOptions={() => setShowOptions(true)} onJoin={onToggleParticipation} setShowWaitingList={setShowWaitingList} />
        {showOptions && (
          <View style={styles.optionList}>
            {optionButtons.map((btn, index) => (
              btn.visible && <BtnDetailed key={index} label={btn.name} leftIcon={{name: btn.icon}} wrapperStyle={styles.optionListButton} onPress={btn.onPress} />
            ))}
          </View>
        )}

        <View className="mt-5" style={styles.commentsSelerator} />

        <CommentsList
          disableCommenting={postData.participantStatus !== UserChallengeStatus.JOINED && postData.participantStatus !== UserChallengeStatus.PENDING_REQUEST}
          comments={comments}
          uid={user?.uid || ''}
          postCreatedUserId={postData.createdBy.uid}
          idFetching={fetchingComments}
          user={user}
          commentText={commentText}
          addingComment={addingComment}
          postType='challengesPost'
          setCommentText={setCommentText}
          onAddComment={onAddComment}
        />

      </ScrollView>

      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <Label type={FontTypes.FTitle1} label={'Want to detete this challenge?'} />
        <Label classNames="mt-5" type={FontTypes.FLabelBold} label={'Post data will be permanently removed!'} />
        <View className="mt-10 ml-0.5 mr-0.5 flex-row justify-between">
          <Btn outlined disabled={deletingPost} onPress={() => setShowDeleteModal(false)} icon={IconNames.cancel} size={InputSizes.md} color={Colors.light.white} label="Cancel" />
          <Btn isLoading={deletingPost} disabled={deletingPost} onPress={onDeletePost} icon={IconNames.delete} size={InputSizes.md} backgroundColor={Colors.dark.red} label="Yes, Delete" />
        </View>
      </Modal>

      {showWaitingList && <RequestedParticipants uid={user.uid || ''} challenge={postData} showModal={showWaitingList} setShowModal={setShowWaitingList} />}
    </>
  )
}