import { View, StyleSheet, TextInput } from "react-native"
import { PostUserItem } from "./PostUserItem"
import { BtnDetailed } from "../Base/Button"
import { CommentInputProps, CommentType, FontSizes, FontTypes, IconNames, JustifyContent } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import Label from "../Base/Label"
import { User } from "@/types/User"

const styles = StyleSheet.create({
    commentUser: {borderTopWidth: 1, borderTopColor: Colors.dark['grey-shade-3'], width: '100%', paddingVertical: 10},
    commnetInput: {width: '100%', height: 70, borderRadius: 10, borderWidth: 1, borderColor: Colors.dark['grey-shade-3'], paddingHorizontal: 10, paddingVertical: 8, color: Colors.dark.text, fontSize: FontSizes.FLabel, textAlign: 'left' },
    cancelBtn: {width: 115, height: 35, marginEnd: 0, marginTop: 10, backgroundColor: Colors.dark.red, borderRadius: 20, borderColor: Colors.dark.red, paddingLeft: 12, paddingRight: 10, marginBottom: 0},
    btnDetailedWrapper: {width: 130, height: 35, marginEnd: 0, marginStart: 'auto', marginTop: 10, backgroundColor: Colors.dark['soundcloud-gdr-1'], borderRadius: 20, borderColor: Colors.dark['soundcloud-gdr-1'], paddingLeft: 9, paddingRight: 10, marginBottom: 0},
})


export const CommentInput = (props: CommentInputProps) => {
    return (
        <View style={styles.commentUser}>
          <Label classNames='mt-1 mb-3' label='Comments' type={FontTypes.FLabel} />
          <PostUserItem useRNImage width={'max-w-[250px]'} imageUrl={props.user?.profileImageUrl} userName={props.user?.displayName || ''} />
          <View className="pb-3" />
          <TextInput multiline ref={props.ref} textAlignVertical="top" value={props.text} editable={!props.isDisabled} maxLength={1000} style={styles.commnetInput} onChangeText={props.onTextChange} placeholder='Your thoughts...' placeholderTextColor={Colors.dark['grey-shade-3']} />
          <View className="flex flex-row w-full">
            {props.commentType === CommentType.UPDATE && <BtnDetailed disabled={props.isUpdating} wrapperStyle={styles.cancelBtn} label={'CENCEL'} fontType={FontTypes.FLabel} labelAlign={JustifyContent.center} leftIcon={{name: IconNames.cancel}} onPress={props.onCancelUpdate} />}
            <BtnDetailed isLoading={props.isDisabled} disabled={props.isDisabled} wrapperStyle={styles.btnDetailedWrapper} label={props.commentType === CommentType.UPDATE ? CommentType.UPDATE: props.commentType === CommentType.COMMENT? CommentType.COMMENT: CommentType.REPLY} fontType={FontTypes.FLabel} labelAlign={JustifyContent.center} leftIcon={{name: IconNames.send}} onPress={props.onSubmit} />
          </View>
        </View>
    )
}