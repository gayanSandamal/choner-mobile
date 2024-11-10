import { ChallengePostCardProps, FontTypes } from "@/types/Components"
import { ActivityIndicator, FlatList, Modal, Platform, View } from "react-native"
import NavigateBack from "../Common/NavigateBack"
import { useFetchJoinedChallengeParticipants } from "@/hooks/get/useFetchChallengePosts"
import { Colors } from "@/constants/Colors"
import { useState } from "react"
import { PostUserItem } from "../Common/PostUserItem"
import { Btn } from "../Base/Button"

type JoinedParticipantsProps = {
    uid: string
    challenge: ChallengePostCardProps
}

export const JoinedParticipants = (props: JoinedParticipantsProps) => {
    const [showModal, setShowModal] = useState<boolean>(false)

    const {data: participants, isFetching: fetchingParticipants} = useFetchJoinedChallengeParticipants(props.uid, props.challenge.id, !!props.uid && !!props.challenge.id)

    return (
        <>
            <Btn classNames="mr-[auto] mt-4 h-[40px]" fontType={FontTypes.FTitle3} backgroundColor={Colors.dark.darkText} label={`View Participants ${participants? '(' + participants.length + ')': ''}`} onPress={() => setShowModal(true)} />
            <Modal animationType="fade" visible={showModal} onRequestClose={() => setShowModal(false)}>
                <View className='px-4 w-full h-full bg-grey'>
                    <View className={`mt-[${Platform.OS === 'ios'? '45px': '20px'}]`} />
                    <NavigateBack label="" navigate={() => setShowModal(false)} />
   
                    <FlatList
                        className="mt-6"
                        data={participants}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(_, index) => `${index}`}
                        ListHeaderComponent={() => <View className="h-3"/>}
                        renderItem={({item}) => {
                            return (
                                <PostUserItem width="200px" userName={item?.displayName} imageUrl={item?.profileImageUrl} />
                            )
                        }}
                        ListEmptyComponent={() => fetchingParticipants && !participants && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
                        ItemSeparatorComponent={() =>  <View className="h-4"/>}
                    />
                </View>
            </Modal>
        </>
    )
}