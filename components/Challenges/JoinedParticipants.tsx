import { ChallengePostCardProps, FontTypes, PostType } from "@/types/Components"
import { ActivityIndicator, FlatList, Modal, Platform, View } from "react-native"
import NavigateBack from "../Common/NavigateBack"
import { useFetchJoinedChallengeParticipants } from "@/hooks/get/useFetchChallengePosts"
import { Colors } from "@/constants/Colors"
import { useState } from "react"
import { PostUserItem } from "../Common/PostUserItem"
import { Btn } from "../Base/Button"
import { useFetchWhoShowedInterest } from "@/hooks/get/useFetchInterestPosts"

type JoinedParticipantsProps = {
    uid: string
    text: string
    postType: PostType
    postId: string
}

export const JoinedParticipants = (props: JoinedParticipantsProps) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [refreshing, setRefreching] = useState<boolean>(false)

    const {data: participants, isFetching: fetchingParticipants, refetch: refetchChallengeParticipants, fetchNextPage: fetchChallengeParticipants} = useFetchJoinedChallengeParticipants(props.uid, props.postId, !!props.uid && !!props.postId && props.postType === PostType.challenge)
    const {data: interested, isFetching: fetchingInterested, refetch: refetchInterestedUsers, fetchNextPage: fetchInterestedUsers} = useFetchWhoShowedInterest(props.uid, props.postId, !!props.uid && !!props.postId && props.postType === PostType.interest)

    const fetchNextPage = () => {
        if (props.postType === PostType.challenge) {
            fetchChallengeParticipants()
            return
        }

        if (props.postType === PostType.interest) {
            fetchInterestedUsers()
            return
        }
    }

    const onRefresh = async () => {
        setRefreching(true)

        const refetchFn = props.postType === PostType.challenge 
        ? refetchChallengeParticipants 
            : props.postType === PostType.interest 
            ? refetchInterestedUsers 
                : null
        
        if (refetchFn) {
            await refetchFn().then(() => {
                setRefreching(false)
            })
        }
    }

    return (
        <>
            <Btn classNames="mr-[auto] mt-4 h-[40px]" fontType={FontTypes.FTitle3} backgroundColor={Colors.dark.darkText} label={`${props.text} ${participants? '(' + participants.length + ')': ''}`} onPress={() => setShowModal(true)} />
            <Modal animationType="fade" visible={showModal} onRequestClose={() => setShowModal(false)}>
                <View className='px-4 w-full h-full bg-grey'>
                    <View className={`mt-[${Platform.OS === 'ios'? '45px': '20px'}]`} />
                    <NavigateBack label="" navigate={() => setShowModal(false)} />
   
                    <FlatList
                        className="mt-6"
                        data={props.postType === PostType.challenge? participants: interested}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(_, index) => `${index}`}
                        ListHeaderComponent={() => <View className="h-3"/>}
                        renderItem={({item}) => {
                            return (
                                <PostUserItem width="200px" userName={item?.displayName} imageUrl={item?.profileImageUrl} />
                            )
                        }}
                        ListEmptyComponent={() => ((fetchingParticipants && !participants) || (fetchingInterested && !interested)) && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
                        ItemSeparatorComponent={() =>  <View className="h-4"/>}
                        refreshing={refreshing}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => fetchNextPage()}
                        onRefresh={onRefresh}
                    />
                </View>
            </Modal>
        </>
    )
}