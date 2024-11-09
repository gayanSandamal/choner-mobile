import { ChallengePostCardProps, FontTypes, IconNames } from "@/types/Components"
import { ActivityIndicator, FlatList, Modal, Platform, ScrollView, TouchableOpacity, View } from "react-native"
import NavigateBack from "../Common/NavigateBack"
import { useFetchPendingChallengeParticipants } from "@/hooks/get/useFetchChallengePosts"
import Icon from "../Base/Icon"
import Label from "../Base/Label"
import { Colors } from "@/constants/Colors"
import Checkbox from "../Base/CheckBox"
import { useCallback, useEffect, useState } from "react"
import { PostUserItem } from "../Common/PostUserItem"
import { Btn } from "../Base/Button"
import { useBulkApproveRequestedParticipants } from "@/hooks/mutate/useMutateChallengePosts"
import { Toast } from "toastify-react-native"

const AskedToJoin = () => {
    return (
        <View style={{marginLeft: 'auto', backgroundColor: Colors.dark["green-shade-1"] + '3A', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5}}>
            <Label type={FontTypes.FLabel} label="Awaiting to join" color={Colors.dark["green-shade-1"]} />
        </View>
    )
}

type RequestedParticipantsProps = {
    uid: string
    challenge: ChallengePostCardProps
    showModal: boolean
    setShowModal: (show: boolean) => void
}

export const RequestedParticipants = (props: RequestedParticipantsProps) => {
    const {data: pendingParticipants, isFetching: fetchingParticipants, refetch} = useFetchPendingChallengeParticipants(props.uid, props.challenge.id, !!props.uid && !!props.challenge.id)
    const {mutate: approve, isPending: approving} = useBulkApproveRequestedParticipants((data) => onSuccessApprove(data), () => {})

    useEffect(() => {refetch()}, [])

    const [checkedParticipants, setCheckedParticipants] = useState<string[]>([])
    const [selectAll, setSelectAll] = useState<boolean>(false)

    const toggleCheckedParticipant = (uid: string) => {
        if (approving) return

        const uids = checkedParticipants.includes(uid) ? checkedParticipants.filter((id) => id !== uid) : [...checkedParticipants, uid]
        setCheckedParticipants(uids)

        if (pendingParticipants?.length === uids.length) {
            setSelectAll(true)
            return
        }
        setSelectAll(false)
    }

    const addOrRemoveAll = () => {
        if (!pendingParticipants || approving) return
        if (selectAll) {
            setCheckedParticipants([])
            setSelectAll(false)
            return
        }
        const allIds = pendingParticipants?.map((user) => user.uid)
        setCheckedParticipants(allIds)
        setSelectAll(true)
    }

    const onSuccessApprove = (uids: string[]) => {
        if (uids.length === checkedParticipants.length) {
            Toast.success('Approved all requests')
            props.setShowModal(false)
        } else {
            Toast.success(`Approved ${checkedParticipants.length} requests`)
        }
    }

    const onApprove = () => {
        approve({
            uid: props.uid,
            challengeId: props.challenge.id,
            uids: checkedParticipants
        })
    }

    const selectAllStyles = {backgroundColor: selectAll? Colors.dark['primary-material-1']: undefined, borderColor: Colors.dark['primary-material-1']}

    return (
        <Modal animationType="fade" visible={props.showModal} onRequestClose={() => props.setShowModal(false)}>
            <View className='px-4 w-full h-full bg-grey'>
                <View className={`mt-[${Platform.OS === 'ios'? '45px': '20px'}]`} />
                <NavigateBack label={props.challenge.description} navigate={() => props.setShowModal(false)} />
                <View className="flex flex-row items-center w-full mt-6 mb-2">
                    <TouchableOpacity className="w-[23px] h-[23px] rounded-[5px] mr-2 border" style={selectAllStyles} onPress={addOrRemoveAll} />
                    <Icon name={IconNames.exclamation} color={Colors.dark["grey-shade-2"]} />
                    <Label classNames="ml-2 w-[90%]" color={Colors.dark["grey-shade-2"]} containerStyles={{ fontStyle: 'italic' }} label={'Only checked participants will be joined when you approve'} />
                </View>
                <FlatList
                    data={pendingParticipants}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, index) => `${index}`}
                    ListHeaderComponent={() => <View className="h-3"/>}
                    renderItem={({item}) => {
                        const isChecked = checkedParticipants.includes(item?.uid)
                        return (
                            <TouchableOpacity className="flex flex-row w-full items-center" onPress={() => toggleCheckedParticipant(item?.uid)}>
                                <Checkbox classNames="mr-2" isChecked={isChecked} onPress={() => toggleCheckedParticipant(item?.uid)} />
                                <PostUserItem width="200px" userName={item?.displayName} imageUrl={item?.profileImageUrl} />
                                <AskedToJoin />
                            </TouchableOpacity>
                        )
                    }}
                    ListEmptyComponent={() => <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
                    ItemSeparatorComponent={() =>  <View className="h-4"/>}
                />
                <View className="w-full flex-row justify-end h-[60px]" style={{borderTopWidth: 1, borderColor: Colors.dark.darkText}}>
                    <Btn isLoading={approving} disabled={checkedParticipants.length === 0 || approving} fontType={FontTypes.FTitle3} icon={IconNames.check} label="APPROVE" backgroundColor={Colors.dark["green-shade-1"]} onPress={onApprove} />
                </View>
            </View>
        </Modal>
    )
}