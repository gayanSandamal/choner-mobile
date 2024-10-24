import { parseToCommentProps } from "@/utils/commonUtils"
import { ActivityIndicator, FlatList, View, StyleSheet, TextInput } from "react-native"
import { PostUserItem } from "./PostUserItem"
import { BtnDetailed, CharmBtn } from "../Base/Button"
import { ChatListProps, FontSizes, FontTypes, IconNames, InputSizes, JustifyContent } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import Label from "../Base/Label"
import { PostOptions } from "./PostOptions"
import { useRef, useState } from "react"
import { POST_VISIBILITY } from "@/constants/values"
import { useUpdateComment } from "@/hooks/mutate/useMutateComments"

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

export const CommentsList = (props: ChatListProps) => {
    const inputRef = useRef<TextInput | null>(null)
    const [showOptions, setShowOptions] = useState<string | null>(null)
    const [updatingCommentData, setUpdatingCommentData] = useState<SelectedComment | null>(null)

    const {mutate: updateComment, isPending: updatingComment} = useUpdateComment(() => onUpdateCommnet(), () => onUpdateCommnet())

    const onUpdateCommnet = () => {
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
      inputRef.current?.focus()
    }

    return (
      <>
        <View style={styles.commentUser}>
          <Label classNames='mt-1 mb-3' label='Comments' type={FontTypes.FLabel} />
          <PostUserItem useRNImage width={'max-w-[250px]'} imageUrl={props.user?.profileImageUrl} userName={props.user?.displayName || ''} />
          <View className="pb-3" />
          <TextInput multiline ref={inputRef} textAlignVertical="top" value={props.commentText} editable={!props.addingComment || !updatingComment} maxLength={1000} style={styles.commnetInput} onChangeText={props.setCommentText} placeholder='Your thoughts...' placeholderTextColor={Colors.dark['grey-shade-3']}
        />
        <View className="flex flex-row w-full">
        {updatingCommentData?.commentId && <BtnDetailed disabled={updatingComment} wrapperStyle={styles.cancelBtn} label={'CENCEL'} fontType={FontTypes.FLabel} labelAlign={JustifyContent.center} leftIcon={{name: IconNames.cancel}} onPress={onCancelUpdateComment} />}
        <BtnDetailed isLoading={props.addingComment || updatingComment} disabled={props.addingComment || updatingComment} wrapperStyle={styles.btnDetailedWrapper} label={!!updatingCommentData?.comment ? 'UPDATE': 'COMMENT'} fontType={FontTypes.FLabel} labelAlign={JustifyContent.center} leftIcon={{name: IconNames.send}} onPress={onCommentOrReply} />
        </View>
        </View>
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
              <View style={styles.chatWrapper}>
                <View className='w-[100%] mt-[10px] mb-[10px] flex flex-row justify-between'>
                  <PostUserItem width={'max-w-[250px]'} imageUrl={comment.createdUser.profileImageUrl} userName={comment.createdUser.displayName} createdAt={comment.createdAt} />
                  <CharmBtn frame={false} icon={IconNames.options} onPress={() => setShowOptions(comment.id)} size={InputSizes.md} />
                  {showOptions === comment.id && (
                    <View style={styles.optionBtnWrapper}>
                      <PostOptions show={showOptions === comment.id} isOwner={props.uid === props.postCreatedUserId || props.uid === comment.createdUser.uid} bottom={0} right={0} postVisibility={POST_VISIBILITY.SCHEDULED} onUpdate={() => onOptionUpdatePress(comment.id, comment.postId, comment.comment)} onDelete={() => {}} />
                    </View>
                  )}
                </View>
                <Label classNames='' type={FontTypes.FLabel} label={comment.comment} color={Colors.dark['grey-shade-4']} />
              </View>
            )
          }}
          ListFooterComponent={() => !!props.comments && props.comments?.length > 0 && <View className="w-full h-5" />}
          ListEmptyComponent={() => props.idFetching && !props.comments && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
        />
      </>
    )
}
