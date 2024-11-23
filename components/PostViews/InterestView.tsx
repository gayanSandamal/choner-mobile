import { InterestCard } from '@/components/Common/InterestCard'
import { Colors } from '@/constants/Colors'
import { IconNames, InterestCardData, InterestPostParams, PostType } from '@/types/Components'
import { unescapePercent } from '@/utils/commonUtils'
import {router, useLocalSearchParams } from 'expo-router'
import { useCallback, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import { PostModal } from '../Post/Post'
import { useFetchCommemnts } from '@/hooks/get/useFetchComments'
import { useUser } from '@/contexts/userContext'
import { useCreateComment } from '@/hooks/mutate/useMutateComments'
import { CommentsList } from '../Common/CommentsList'
import { POST_VISIBILITY, QueryKeys } from '@/constants/values'
import { useQueryClient } from '@tanstack/react-query'
import { JoinedParticipants } from '../Challenges/JoinedParticipants'
import { useToggleInterested } from '@/hooks/mutate/useMutateInterestPosts'

const styles = StyleSheet.create({
  btnDetailedWrapper: {width: 140, backgroundColor: Colors.dark['soundcloud-gdr-1'], borderRadius: 20, borderColor: Colors.dark['soundcloud-gdr-1'], paddingLeft: 15, paddingRight: 12, marginBottom: 0},
  commentsSelerator: {borderTopWidth: 1, borderTopColor: Colors.dark['grey-shade-3'], width: '100%'}
})

export default function InterestView() {
  const {user} = useUser()
  const  {data}  = useLocalSearchParams()

  const queryClient = useQueryClient()

  const [postData, setPostData] = useState<InterestCardData | null>(null)
  const [interestPostData, setInterestPostData] = useState<InterestPostParams | null>(null)
  const [showOptionInterest, setShowOptionInterest] = useState<string>('')
  const [commentText, setCommentText] = useState<string>('')
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const {mutate: addComment, isPending: addingComment} = useCreateComment(() => setCommentText(''), () => {})
  const {data: comments, isFetching: fetchingComments, refetch : refetchComments} = useFetchCommemnts(postData?.id || '', user?.uid || '', 'interestsPost', !!postData && !!user && postData.visibility === POST_VISIBILITY.PUBLIC)
  const {mutate: toggleEnrolment, isPending: isToggling} = useToggleInterested((data) => onSuccessEnrolled(data), () => {})

  useLayoutEffect(() => {
    const interest = JSON.parse(data as string)
    const decodedInterest = {
        ...interest,
        createdBy: {
          ...interest.createdBy,
          profileImageUrl: unescapePercent(interest.createdBy.profileImageUrl)
        }
      }
      setPostData(decodedInterest)
  }, [data])
  
  const onCloseModal = () => {
    setInterestPostData(null)
    setShowOptionInterest('')
  }

  const onSuccessEnrolled = (data: InterestCardData) => {
    if (!postData) return
    const newPost = {...postData, enrolmentStatus: data.enrolmentStatus}
    setPostData(newPost)
  }
  
  const onAddComment = () => addComment({
    uid: user?.uid || '',
    postId: postData?.id || '',
    comment: commentText,
    type: 'interestsPost'
  })

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetchComments().then(() => {
      try {
        queryClient.invalidateQueries({queryKey: [QueryKeys.REPLIES, postData?.id]})
      } catch (e) {}
    })
    setRefreshing(false)
  }, [refetchComments])

  const onPressInterested = () => {
    postData && user && toggleEnrolment({uid: user?.uid, interestId: postData.id})
  }

  if (!postData || !user) {
    return <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />
  }

  return (
    <>
      <PostModal
        postType={PostType.interest}
        showModal={!!interestPostData}
        postParams={interestPostData || undefined}
        postHeaderData={{
          icon: IconNames.addPost,
          title: 'Edit this interest'
        }}
        actionBarData={{ title: 'Hey, want to update your interest..?' }}
        onCancel={onCloseModal}
        setShowModal={onCloseModal}
      />
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} onTouchEnd={() => showOptionInterest && setShowOptionInterest('')}/>}>
      <InterestCard noTextLimit disabled isTogglingEnrole={isToggling} isOwner={postData.isOwner} classNames='mt-2' data={postData} showOptionInterest={showOptionInterest} navigationPath="/interest" onOptionPress={() => setInterestPostData({id: postData.id, interest: postData.title, interestDesc: postData.description, scheduledAt: postData.scheduledAt, visibility: postData.visibility})} setShowOptionInterest={setShowOptionInterest} onDelete={() => router.back()} onToggleEnrole={onPressInterested} />
        {/* <View className='flex-row items-center justify-between mt-5 mb-3'>
            <Label label=''/>
            <BtnDetailed wrapperStyle={styles.btnDetailedWrapper} label={'Form circle'} fontType={FontTypes.FLabelBold} labelAlign={JustifyContent.center} rightIcon={{name: IconNames.addCircle, classNames: 'mt-[3px]'}} onPress={() => {}} />
        </View> */}

        <JoinedParticipants text='Who showed interest' postType={PostType.interest} uid={user.uid} postId={postData.id} />

        <View className='mt-4' style={styles.commentsSelerator} />

        {postData.visibility === POST_VISIBILITY.PUBLIC && (
          <CommentsList
            comments={comments}
            uid={user?.uid || ''}
            postCreatedUserId={postData.createdBy.uid}
            idFetching={fetchingComments}
            user={user}
            commentText={commentText}
            addingComment={addingComment}
            postType='interestsPost'
            setCommentText={setCommentText}
            onAddComment={onAddComment}
          />
        )}

      </ScrollView>
    </>
  )
}
