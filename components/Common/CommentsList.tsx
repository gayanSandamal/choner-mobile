import { ActivityIndicator, FlatList, View, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { PostUserItem } from "./PostUserItem"
import { Btn, CharmBtn } from "../Base/Button"
import { ChatListProps, CommentData, CommentType, FontSizes, FontTypes, IconNames, InputSizes, ReplyData } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import Label from "../Base/Label"
import { PostOptions } from "./PostOptions"
import { useEffect, useRef, useState } from "react"
import { POST_VISIBILITY } from "@/constants/values"
import { useCreateReply, useDeleteComment, useDeleteReply, useUpdateComment, useUpdateReply } from "@/hooks/mutate/useMutateComments"
import { CommentInput } from "./CommentInput"
import { useFetchReplies } from "@/hooks/get/useFetchComments"
import { User } from "@/types/User"
import Icon from "../Base/Icon"

const styles = StyleSheet.create({
  commentUser: {borderTopWidth: 1, borderTopColor: Colors.dark['grey-shade-3'], width: '100%', paddingVertical: 10},
    commnetInput: {width: '100%', height: 70, borderRadius: 10, borderWidth: 1, borderColor: Colors.dark['grey-shade-3'], paddingHorizontal: 10, paddingVertical: 8, color: Colors.dark.text, fontSize: FontSizes.FLabel, textAlign: 'left' },
    cancelBtn: {width: 115, height: 35, marginEnd: 0, marginTop: 10, backgroundColor: Colors.dark.red, borderRadius: 20, borderColor: Colors.dark.red, paddingLeft: 12, paddingRight: 10, marginBottom: 0},
    btnDetailedWrapper: {width: 130, height: 35, marginEnd: 0, marginStart: 'auto', marginTop: 10, backgroundColor: Colors.dark['soundcloud-gdr-1'], borderRadius: 20, borderColor: Colors.dark['soundcloud-gdr-1'], paddingLeft: 9, paddingRight: 10, marginBottom: 0},
    optionBtnWrapper: { position: 'absolute', height: 10, width: 120, right: 0, zIndex: 3},
    listHeaderLine: { borderStyle: 'dashed', paddingTop: 10, width: '100%', borderBottomWidth: 1, borderColor: Colors.dark['grey-shade-2']},
    chatWrapper: {width: '100%', height: 'auto', zIndex: 1},
    chatItemBottomLine: {width: '100%', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.dark['grey-shade-2'], zIndex: 0}
})

type SelectedComment = {
  postId: string
  comment: string
  commentId: string
  replyId?: string
}

type OptionView = {
  commentId?: string,
  replyId?: string
}

type SelectedReply = {
  replyId: string
  cereatedUserID: string
}

type CommentItemProps = {
  uid: string
  postCreatedUserId: string
  showOptions: OptionView | null
  comment: CommentData | ReplyData
  message: string
  type: 'COMMENT' | 'REPLY'
  onUpdate: () => void
  onDelete: () => void
  setShowOptions: (data: OptionView | null) => void
}

const DeletingView = () => {
  return (
    <View className=" absolute w-full h-full flex flex-row items-center justify-center" style={{backgroundColor: Colors.dark["primary-material-1"] + '1A'}}>
      <View className="relative">
        <ActivityIndicator size={32} color={Colors.dark.red} />
        <Icon size={InputSizes.sm} classNames="absolute mt-[4px] ml-[3.5px]" name={IconNames.delete} color={Colors.dark.red} />
      </View>
    </View>
  )
}

const CommentItem = (props: CommentItemProps) => {
  const showOptopnById = props.type === 'REPLY'? props.showOptions?.replyId === props.comment.id: props.showOptions?.commentId === props.comment.id
  
  const setOptionMenuId = () => {
    props.setShowOptions(props.type === 'REPLY'? {replyId: props.comment.id}: {commentId: props.comment.id})
  }
  
  return (
    <View style={styles.chatWrapper}>
      <View className='w-[100%] mt-[10px] mb-[10px] flex flex-row justify-between z-1'>
        <PostUserItem width={'max-w-[250px]'} imageUrl={props.comment.createdBy.profileImageUrl} userName={props.comment.createdBy.displayName} createdAt={props.comment.createdAt} />
        <CharmBtn frame={false} icon={IconNames.options} onPress={setOptionMenuId} size={InputSizes.md} />
        {showOptopnById && (
          <View style={styles.optionBtnWrapper}>
            <PostOptions show={showOptopnById} isOwner={props.uid === props.postCreatedUserId || props.uid === props.comment.createdBy.uid} bottom={0} right={0} postVisibility={props.uid === props.comment.createdBy.uid? POST_VISIBILITY.SCHEDULED: POST_VISIBILITY.PUBLIC} onUpdate={props.onUpdate} onDelete={props.onDelete} />
          </View>
        )}
      </View>
      <Label type={FontTypes.FLabel} label={props.message} color={Colors.dark['grey-shade-4']} />
    </View>
  )
}

type CommentBottomItemsProps = {
  isReplying: boolean
  replyCount: string
  isShowingReplies: boolean
  setShowReplies: () => void
  onReply: () => void
}

const CommentBottomItems = (props: CommentBottomItemsProps) => {
  return (
    <View className="flex flex-row pt-[5px] justify-between">
      <Btn wrapperClasses='text-center mt-0.5' link='' fontStyle={{fontStyle: 'underline'}} size={InputSizes.sm} textMode color={Colors.dark['grey-shade-4']} label={props.isShowingReplies? 'Hide replies': `Show${props.replyCount} replies`} onPress={props.setShowReplies} />
      <Btn wrapperClasses='text-center ml-auto mt-0.5' link='' fontStyle={{fontStyle: 'underline'}} size={InputSizes.sm} textMode color={Colors.dark['grey-shade-4']} label={props.isReplying? "Close" :"Reply"} onPress={props.onReply} />
    </View>
  )
}

interface ReplyItemProps {
  item: ReplyData
  user: User | null
  postId: string
  postType: string
  postCreatedUserId: string
  showOptions: OptionView | null
  setShowOptions: (options: OptionView | null) => void
}

const Reply = (props: ReplyItemProps) => {
  const replyUpdateInputRef = useRef<TextInput | null>(null)
  
  const [selectedReply, setSelectedReply] = useState<SelectedReply | null>(null)
  const [replyText, setReplyText] = useState<string>('')

  const {mutate: updateReply, isPending: updatingReply} = useUpdateReply(() => onSuccessCancelUpdate(), () => {})
  const {mutate: deleteReply, isPending: deletingReply} = useDeleteReply(() => {}, () => {})

  const onSuccessCancelUpdate = () => {
    setSelectedReply(null)
    setReplyText('')
  }

  const onPressUpdate = (reply: string, replyId: string, cereatedUserID: string) => {
    setReplyText(reply)
    setSelectedReply({replyId, cereatedUserID})
  }
  const onUpdateReply = () => {
    selectedReply && updateReply({
      reply: replyText,
      type: props.postType,
      uid: props.user?.uid || '',
      postId: props.postId,
      replyId: selectedReply?.replyId,
      commentId: props.item.commentId
    })
  }
  
  const onDeleteReply = () => {
    deleteReply({
      uid: props.user?.uid || '',
      replyId: props.item.id,
      postId: props.postId,
      commentId: props.item.commentId,
      type: props.postType,
    })
  }
  
  return (
    <View className="relative">
      <CommentItem type={"REPLY"} uid={props.user?.uid || ''} postCreatedUserId={props.postCreatedUserId} message={props.item.reply} showOptions={props.showOptions} comment={props.item} onUpdate={() => onPressUpdate(props.item.reply, props.item.id, props.item.createdBy.uid)} setShowOptions={props.setShowOptions} onDelete={onDeleteReply}
      />
      {selectedReply?.replyId === props.item.id && (
        <CommentInput hideUser ref={replyUpdateInputRef} placeholder="Update your reply..." text={replyText} isDisabled={updatingReply} isUpdating={updatingReply} onTextChange={setReplyText} onSubmit={onUpdateReply} onCancelUpdate={onSuccessCancelUpdate} user={props.user} commentType={"COMMENT"} />
      )}
      {deletingReply && <DeletingView />}
    </View>
  )
}

type RepliesProps = {
  user: User | null
  postType: string
  postId:string
  replyCount: number
  commentId: string
  showOptions: OptionView | null
  postCreatedUserId: string
  setShowOptions: (data: OptionView | null) => void
}

const Replies = (props: RepliesProps) => {
  const {data, isFetching: fetchingReplies, isRefetching: refetchingReplies, refetch: refetchReplies} = useFetchReplies(props.postId, props.commentId, props.postType, props.user?.uid || '', false)

  useEffect(() => {
    !data && refetchReplies()
  }, [])

  return (
    <>
      {!data && fetchingReplies && <ActivityIndicator color={Colors.light.white} className='mt-5' size={30} />}
      <FlatList
        data={data?.[0].replies}
        extraData={data?.[0].replies}
        removeClippedSubviews={true}
        scrollEnabled={false}
        onTouchEnd={() => props.showOptions && props.setShowOptions(null)}
        keyExtractor={(_, index) => `reply-item-${index}`}
        renderItem={({item}) => {
          return (
            <Reply item={item} user={props.user} postId={props.postId} postType={props.postType} postCreatedUserId={props.postCreatedUserId} showOptions={props.showOptions} setShowOptions={props.setShowOptions} />
          )
        }}
        ItemSeparatorComponent={() => <View style={styles.chatItemBottomLine} />}
        ListFooterComponent={() => (
          <>
            {!!data?.[0].hasMore ? (
              <TouchableOpacity className="flex flex-row h-[16px] items-center mt-2 w-[120px]" onPress={() => !refetchingReplies && refetchReplies()}>
                <Label underline type={FontTypes.FP} label="View more replies" />
                {refetchingReplies && <ActivityIndicator color={Colors.light.white} className='mt-0.5 ml-1' size={16} />}
              </TouchableOpacity>
            ): <View className="mt-2" />}
          </>
        )}
      />
    </>
  )
}

type CommentProps = {
  uid: string
  user: User | null
  postCreatedUserId: string
  showOptions: OptionView | null
  comment: CommentData
  postType: string
  replyingComment: SelectedComment | null
  setReplyingComment: (coment: SelectedComment | null) => void
  onUpdate: () => void
  setShowOptions: (data: OptionView | null) => void
}

const Comment = (props: CommentProps) => {
  const commentReplyInputRef = useRef<TextInput | null>(null)
  const [replyText, setReplyText] = useState<string>('')
  const [showReplies, setShowReplies] = useState<string | null>(null)

  const {mutate: createReply, isPending: addingReply} = useCreateReply(() => onSuccessReply(), () => {})
  const {mutate: deleteComment, isPending: deletingComment} = useDeleteComment(() => {}, () => {})

  const onSuccessReply = () => {
    props.setReplyingComment(null)
    setReplyText('')
    setShowReplies(props.comment.id)
  }

  const onSelectReply = () => {
    const isReplying = props.replyingComment?.commentId === props.comment.id
    props.setReplyingComment(isReplying? null: {commentId: props.comment.id, postId: props.comment.postId, comment: props.comment.comment})
  }

  const onReply = () => {
    createReply({
      postId: props.comment.postId,
      commentId: props.comment.id,
      replyCount: props.comment?.replyCount || 0,
      uid: props.uid,
      type: props.postType,
      reply: replyText
    })
  }

  const onDeleteComment = () => {
    deleteComment({
      uid: props.uid,
      postId: props.comment.postId,
      commentId: props.comment.id,
      type: props.postType,
    })
  }

  const replyPlaceholder = props.uid === props.comment.createdBy.uid? 'Your thoughts...': `Your thoughts on ${props.comment.createdBy.displayName?.split(' ')?.[0]}'s comment...`
  const replyCount = props.comment.replyCount || props.comment.replyCount === 0? ' ' + props.comment.replyCount.toString() : ''

  return (
    <View className="relative">
      <CommentItem uid={props.uid} type="COMMENT" message={props.comment.comment} postCreatedUserId={props.postCreatedUserId} showOptions={props.showOptions} comment={props.comment} onUpdate={props.onUpdate} setShowOptions={props.setShowOptions} onDelete={onDeleteComment}/>
      <CommentBottomItems replyCount={replyCount} isShowingReplies={!!showReplies && showReplies === props.comment.id} isReplying={props.replyingComment?.commentId === props.comment.id} onReply={onSelectReply} setShowReplies={() => setShowReplies(!showReplies? props.comment.id: null)} />
      <View className="pl-5 w-full z-2">
        {props.replyingComment?.commentId === props.comment.id && <CommentInput ref={commentReplyInputRef} placeholder={replyPlaceholder} user={props.user} text={replyText} isDisabled={addingReply} isUpdating={addingReply} commentType={CommentType.REPLY} onTextChange={setReplyText} onSubmit={onReply} onCancelUpdate={() => {}} />}
        {showReplies === props.comment.id && <Replies replyCount={props.comment.replyCount || 0} user={props.user} postType={props.postType} postId={props.comment.postId} commentId={props.comment.id} showOptions={props.showOptions} postCreatedUserId={props.postCreatedUserId} setShowOptions={props.setShowOptions} />}
      </View>
      <View style={styles.chatItemBottomLine} />
      {deletingComment && <DeletingView />}
    </View>
  )
}

export const CommentsList = (props: ChatListProps) => {
    const commentInputRef = useRef<TextInput | null>(null)
    const [showOptions, setShowOptions] = useState<OptionView | null>(null)
    const [updatingCommentData, setUpdatingCommentData] = useState<SelectedComment | null>(null)
    const [replyingComment, setReplyingComment] = useState<SelectedComment | null>(null)

    const {mutate: updateComment, isPending: updatingComment} = useUpdateComment(() => onUpdateCommnet(), () => onUpdateCommnet())

    const onUpdateCommnet = () => {
      props.setCommentText('')
      setShowOptions(null)
      setUpdatingCommentData(null)
    }
    
    const onCommentUpdate = () => {
      updatingCommentData && updateComment({
        uid: props.uid,
        postId: updatingCommentData?.postId,
        commentId: updatingCommentData?.commentId,
        type: props.postType,
        comment: props.commentText
      })
    }

    const onCommentOrReply = () => {
      if (props.commentText?.trim() === '') return

      if (!updatingCommentData) {
        props.onAddComment()
      } else {
        onCommentUpdate()
      }
    }

    const onCancelUpdateComment = () => {
      props.setCommentText('')
      setUpdatingCommentData(null)
    }

    const onOptionUpdatePress = (commentId: string, postId: string, comment: string) => {
      setUpdatingCommentData({commentId, postId, comment})
      props.setCommentText(comment)
      commentInputRef.current?.focus()
    }

    return (
      <>
        <CommentInput ref={commentInputRef} headerText="Comments" user={props.user} text={props.commentText} isDisabled={props.addingComment || updatingComment} isUpdating={updatingComment} commentType={!!updatingCommentData?.commentId? CommentType.UPDATE: CommentType.COMMENT} onTextChange={props.setCommentText} onSubmit={onCommentOrReply} onCancelUpdate={onCancelUpdateComment} />
        <FlatList
          data={props.comments}
          removeClippedSubviews={true}
          scrollEnabled={false}
          initialNumToRender={1}
          windowSize={2}
          onTouchEnd={() => showOptions && setShowOptions(null)}
          keyExtractor={(_, index) => `comment-item-${index}`}
          ListHeaderComponent={() => <View style={styles.listHeaderLine} />}
          renderItem={({item}) => {
            return (
              <Comment user={props.user} uid={props.uid} postCreatedUserId={props.postCreatedUserId} postType={props.postType} showOptions={showOptions} comment={item} replyingComment={replyingComment} setReplyingComment={setReplyingComment} onUpdate={() => onOptionUpdatePress(item.id, item.postId, item.comment)} setShowOptions={setShowOptions} />
            )
          }}
          ListFooterComponent={() => !!props.comments && props.comments?.length > 0 && <View className="w-full h-20" />}
          ListEmptyComponent={() => props.idFetching && !props.comments && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
        />
      </>
    )
}
