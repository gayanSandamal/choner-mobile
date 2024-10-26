import { parseToCommentProps } from "@/utils/commonUtils"
import { ActivityIndicator, FlatList, View, StyleSheet, TextInput } from "react-native"
import { PostUserItem } from "./PostUserItem"
import { Btn, CharmBtn } from "../Base/Button"
import { ChatListProps, CommentData, CommentType, CreatedAt, FontSizes, FontTypes, IconNames, InputSizes, JustifyContent } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import Label from "../Base/Label"
import { PostOptions } from "./PostOptions"
import { useRef, useState } from "react"
import { POST_VISIBILITY } from "@/constants/values"
import { useUpdateComment } from "@/hooks/mutate/useMutateComments"
import { CommentInput } from "./CommentInput"

const styles = StyleSheet.create({
  commentUser: {borderTopWidth: 1, borderTopColor: Colors.dark['grey-shade-3'], width: '100%', paddingVertical: 10},
    commnetInput: {width: '100%', height: 70, borderRadius: 10, borderWidth: 1, borderColor: Colors.dark['grey-shade-3'], paddingHorizontal: 10, paddingVertical: 8, color: Colors.dark.text, fontSize: FontSizes.FLabel, textAlign: 'left' },
    cancelBtn: {width: 115, height: 35, marginEnd: 0, marginTop: 10, backgroundColor: Colors.dark.red, borderRadius: 20, borderColor: Colors.dark.red, paddingLeft: 12, paddingRight: 10, marginBottom: 0},
    btnDetailedWrapper: {width: 130, height: 35, marginEnd: 0, marginStart: 'auto', marginTop: 10, backgroundColor: Colors.dark['soundcloud-gdr-1'], borderRadius: 20, borderColor: Colors.dark['soundcloud-gdr-1'], paddingLeft: 9, paddingRight: 10, marginBottom: 0},
    optionBtnWrapper: { position: 'absolute', height: 10, width: 120, right: 0, zIndex: 1},
    listHeaderLine: {borderStyle: 'dashed', width: '100%', borderWidth: 1, borderColor: Colors.dark['grey-shade-2']},
    chatWrapper: {width: '100%', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.dark['grey-shade-2']}
})

type SelectedComment = {
  commentId: string
  postId: string
  comment: string
}

type CommentItemProps = {
  uid: string
  postCreatedUserId: string
  showOptions: string | null
  comment: CommentData
  onUpdate: () => void
  setShowOptions: () => void
  addOrRemoveFromShowReplies: (id: string) => void
}

const CommentItem = (props: CommentItemProps) => {
  return (
    <View style={styles.chatWrapper}>
      <View className='w-[100%] mt-[10px] mb-[10px] flex flex-row justify-between'>
        <PostUserItem width={'max-w-[250px]'} imageUrl={props.comment.createdUser.profileImageUrl} userName={props.comment.createdUser.displayName} createdAt={props.comment.createdAt} />
        <CharmBtn frame={false} icon={IconNames.options} onPress={props.setShowOptions} size={InputSizes.md} />
        {props.showOptions === props.comment.id && (
          <View style={styles.optionBtnWrapper}>
            <PostOptions show={props.showOptions === props.comment.id} isOwner={props.uid === props.postCreatedUserId || props.uid === props.comment.createdUser.uid} bottom={0} right={0} postVisibility={props.uid === props.comment.createdUser.uid? POST_VISIBILITY.SCHEDULED: POST_VISIBILITY.PUBLIC} onUpdate={props.onUpdate} onDelete={() => {}} />
          </View>
        )}
      </View>
      <Label type={FontTypes.FLabel} label={props.comment.comment} color={Colors.dark['grey-shade-4']} />
      <View className="flex flex-row justify-between">
        <Btn wrapperClasses='text-center ml-auto mt-0.5' link='' fontStyle='underline' size={InputSizes.sm} textMode color={Colors.dark['grey-shade-4']} label="Reply" onPress={() => props.addOrRemoveFromShowReplies(props.comment.id)} />
      </View>
    </View>
  )
}

const Replies = () => {
  const [showOptions, setShowOptions] = useState<string | null>(null)
  return (
    <FlatList
      data={[]}
      extraData={[]}
      removeClippedSubviews={true}
      scrollEnabled={false}
      initialNumToRender={1}
      windowSize={2}
      onTouchEnd={() => showOptions && setShowOptions(null)}
      keyExtractor={(_, index) => `item-${index}`}
      renderItem={({items}) => <></>}
    />
  )
}

export const CommentsList = (props: ChatListProps) => {
    const commentInputRef = useRef<TextInput | null>(null)
    const [showOptions, setShowOptions] = useState<string | null>(null)
    const [showRepliesList, setShowRepliesList] = useState<string[]>([])
    const [updatingCommentData, setUpdatingCommentData] = useState<SelectedComment | null>(null)

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

    const addOrRemoveFromShowReplies = (commentId: string) => {
      const isShowing = showRepliesList?.includes(commentId)
      if (isShowing) {
        const filtered = showRepliesList?.filter((item) => item === commentId)
        setShowRepliesList(filtered)
      } else {
        setShowRepliesList((prev) => [...prev, commentId])
      }
    }

    return (
      <>
        <CommentInput ref={commentInputRef} user={props.user} text={props.commentText} isDisabled={props.addingComment || updatingComment} isUpdating={updatingComment} commentType={!!updatingCommentData?.commentId? CommentType.UPDATE: CommentType.COMMENT} onTextChange={props.setCommentText} onSubmit={onCommentOrReply} onCancelUpdate={onCancelUpdateComment} />
        <FlatList
          data={props.comments}
          extraData={props.comments}
          removeClippedSubviews={true}
          scrollEnabled={false}
          initialNumToRender={1}
          windowSize={2}
          onTouchEnd={() => showOptions && setShowOptions(null)}
          keyExtractor={(_, index) => `item-${index}`}
          ListHeaderComponent={() => <View style={styles.listHeaderLine} />}
          renderItem={({item}) => {
            const comment = parseToCommentProps(item)
            return (
              <>
                <CommentItem uid={props.uid} postCreatedUserId={props.postCreatedUserId} showOptions={showOptions} comment={comment} onUpdate={() => onOptionUpdatePress(comment.id, comment.postId, comment.comment)} setShowOptions={() => setShowOptions(comment.id)} addOrRemoveFromShowReplies={addOrRemoveFromShowReplies} />
              </>
            )
          }}
          ListFooterComponent={() => !!props.comments && props.comments?.length > 0 && <View className="w-full h-5" />}
          ListEmptyComponent={() => props.idFetching && !props.comments && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
        />
      </>
    )
}
