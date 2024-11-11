import { BtnDetailed } from '@/components/Base/Button'
import Label from '@/components/Base/Label'
import { InterestCard } from '@/components/Common/InterestCard'
import { Colors } from '@/constants/Colors'
import { FontTypes, IconNames, InterestCardData, InterestPostParams, JustifyContent, PostType } from '@/types/Components'
import { unescapePercent } from '@/utils/commonUtils'
import {router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import { PostModal } from '../Post/Post'
import { useFetchCommemnts } from '@/hooks/get/useFetchComments'
import { useUser } from '@/contexts/userContext'
import { useCreateComment } from '@/hooks/mutate/useMutateComments'
import { CommentsList } from '../Common/CommentsList'
import { POST_VISIBILITY, QueryKeys } from '@/constants/values'
import { useQueryClient } from '@tanstack/react-query'
import { JoinedParticipants } from '../Challenges/JoinedParticipants'

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

  useEffect(() => {
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
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <InterestCard noTextLimit disabled isOwner={postData.isOwner} classNames='mt-2' data={postData} showOptionInterest={showOptionInterest} navigationPath="/interest" onOptionPress={() => setInterestPostData({id: postData.id, interest: postData.title, interestDesc: postData.description, scheduledAt: postData.scheduledAt, visibility: postData.visibility})} setShowOptionInterest={setShowOptionInterest} onDelete={() => router.back()} />
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
