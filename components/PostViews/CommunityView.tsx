import { Btn, CharmBtn } from '@/components/Base/Button'
import Label from '@/components/Base/Label'
import { Colors } from '@/constants/Colors'
import { CommunityCardData, CommunityPostCategory, FontTypes, IconNames, InputSizes, PostType } from '@/types/Components'
import { unescapePercent } from '@/utils/commonUtils'
import {router, useLocalSearchParams } from 'expo-router'
import { useCallback, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import { PostModal } from '../Post/Post'
import { BLURHASH, CommunityPostTypes, POST_VISIBILITY, QueryKeys } from '@/constants/values'
import { Image as ExpoImage } from 'expo-image'
import { PostUserItem } from '../Common/PostUserItem'
import { PostOptions } from '../Common/PostOptions'
import Modal from '../Base/Modal'
import { useDeleteCommunityPost } from '@/hooks/mutate/useMutateCommunityPosts'
import React from 'react'
import { useUser } from '@/contexts/userContext'
import { useCreateComment } from '@/hooks/mutate/useMutateComments'
import { useFetchCommemnts } from '@/hooks/get/useFetchComments'
import { CommentsList } from '../Common/CommentsList'
import { useQueryClient } from '@tanstack/react-query'

const styles = StyleSheet.create({
  imageSmall: {width: '100%', aspectRatio: 1.5, borderRadius: 10, borderWidth: 3, borderColor: Colors.dark['grey-shade-3']},
  btnDetailedWrapper: {width: 130, height: 35, marginEnd: 0, marginStart: 'auto', marginTop: 10, backgroundColor: Colors.dark['soundcloud-gdr-1'], borderRadius: 20, borderColor: Colors.dark['soundcloud-gdr-1'], paddingLeft: 9, paddingRight: 10, marginBottom: 0},
  optionBtnWrapper: { position: 'absolute', height: 10, width: 120, right: 0, zIndex: 1},
  commentsSelerator: {borderTopWidth: 1, borderTopColor: Colors.dark['grey-shade-3'], width: '100%'}
})

export default function CommunityView() {
  const {user} = useUser()
  const  {data}  = useLocalSearchParams()

  const queryClient = useQueryClient()

  const [postData, setPostData] = useState<CommunityCardData | null>(null)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showUpdate, setShowUpdate] = useState<boolean>(false)
  const [commentText, setCommentText] = useState<string>('')
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const {mutate: deletePost, isPending: deletingPost} = useDeleteCommunityPost(() => router.back(), () => {})
  const {mutate: addComment, isPending: addingComment} = useCreateComment(() => setCommentText(''), () => {})
  const {data: comments, isFetching: fetchingComments, refetch : refetchComments} = useFetchCommemnts(postData?.id || '', user?.uid || '', postData?.type === CommunityPostTypes[0]? 'communityPost': 'communityQuestion', !!postData && !!user && postData.visibility === POST_VISIBILITY.PUBLIC)

  useLayoutEffect(() => {
    const post = JSON.parse(data as string)
    const decodedPost = {
        ...post,
        createdBy: {
          ...post.createdBy,
          profileImageUrl: unescapePercent(post.createdBy.profileImageUrl)
        },
        imageUrls: {
          sm: unescapePercent(post?.imageUrls?.sm || ''),
          md: unescapePercent(post?.imageUrls?.md || ''),
          lg: unescapePercent(post?.imageUrls?.lg || '')
        }
      }
      setPostData(decodedPost)
  }, [data])
  
  const onCloseModal = () => {
    setShowUpdate(false)
  }

  const onSuccessUpdate = (data: CommunityCardData) => {
    setPostData({...data, isOwner: postData?.isOwner})
  }

  const onAddComment = () => addComment({
    uid: user?.uid || '',
    postId: postData?.id || '',
    comment: commentText,
    type: postData?.type === CommunityPostTypes[0]? 'communityPost': 'communityQuestion'
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

  const onScrollTouchEnd = () => {
    showOptions && setShowOptions(false)
  }

  if (!postData) {
    return <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />
  }

  return (
    <>
      <PostModal
        postType={PostType.community}
        showModal={showUpdate}
        postParams={!!postData ? {
          id: postData.id,
          title: postData.title,
          type: postData.type as CommunityPostCategory.POST | CommunityPostCategory.QUESTION,
          imageUrls: postData.imageUrls,
          scheduledAt: postData.scheduledAt,
          visibility: postData.visibility
        }: undefined}
        postHeaderData={{
          icon: IconNames.addPost,
          title: `Edit this ${postData.type === CommunityPostTypes[0]? 'Post': 'Question'}`
        }}
        actionBarData={{ title: `Hey, want to update your ${postData.type === CommunityPostTypes[0]? 'Post': 'Question'}..?` }}
        onCancel={onCloseModal}
        setShowModal={onCloseModal}
        onSuccess={(data) => onSuccessUpdate(data as CommunityCardData)}
      />
      <ScrollView className='mt-2' showsVerticalScrollIndicator={false} onTouchEnd={() => onScrollTouchEnd()} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {postData.imageUrls.md && <ExpoImage source={postData?.imageUrls?.md} style={styles.imageSmall} contentFit={"cover"} placeholder={{ blurhash: BLURHASH[3] }} />}
        <Label classNames='mt-[10px]' type={FontTypes.FLabel} label={postData.title} color={Colors.dark['grey-shade-4']} />
        <View className='w-[100%] mt-[15px] mb-[10px] flex flex-row justify-between'>
          <PostUserItem width={'max-w-[250px]'} imageUrl={postData.createdBy.profileImageUrl} userName={postData.createdBy.displayName} createdAt={postData.createdAt} />
          <CharmBtn frame icon={IconNames.options} onPress={() => setShowOptions((prev) => !prev)} size={InputSizes.md} />
          {showOptions && (
            <View style={styles.optionBtnWrapper}>
              <PostOptions show={showOptions} isOwner={!!postData?.isOwner} bottom={0} right={0} postVisibility={postData.visibility} onUpdate={() => setShowUpdate(true)} onDelete={() => setShowDeleteModal(true)} />
            </View>
          )}
        </View>
        <View style={styles.commentsSelerator} />
        
        {postData.visibility === POST_VISIBILITY.PUBLIC && (
          <CommentsList
            comments={comments}
            uid={user?.uid || ''}
            postCreatedUserId={postData.createdBy.uid}
            idFetching={fetchingComments}
            user={user}
            commentText={commentText}
            addingComment={addingComment}
            postType={postData?.type === CommunityPostTypes[0]? 'communityPost': 'communityQuestion'}
            setCommentText={setCommentText}
            onAddComment={onAddComment}
          />
        )}

      </ScrollView>
      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <Label type={FontTypes.FTitle1} label={'Do you want to delete this community post?'} />
        <Label classNames="mt-5" type={FontTypes.FLabelBold} label={'This will be permanently removed!'} />
        <View className="mt-10 ml-0.5 mr-0.5 flex-row justify-between">
          <Btn outlined disabled={deletingPost} onPress={() => setShowDeleteModal(false)} icon={IconNames.cancel} size={InputSizes.md} color={Colors.light.white} label="Cancel" />
          <Btn isLoading={deletingPost} disabled={deletingPost} onPress={() => deletePost({uid: postData.createdBy.uid, id: postData.id, type: postData.type, visibility: postData.visibility})} icon={IconNames.delete} size={InputSizes.md} backgroundColor={Colors.dark.red} label="Yes, Delete" />
        </View>
      </Modal>
    </>
  )
}
