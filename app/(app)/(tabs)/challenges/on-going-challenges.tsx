import { CharmBtn } from "@/components/Base/Button"
import { ChallengePostCard } from "@/components/Common/ChallengePostCard"
import { ActionBar, PostModal } from "@/components/Post/Post"
import { useTabSelector } from "@/contexts/tabSelectorContext"
import { useUser } from "@/contexts/userContext"
import { ChallengePostCardProps, ChallengeState, IconNames, InputSizes, PostType, UserChallengeStatus } from "@/types/Components"
import { router } from "expo-router"
import { useState } from "react"
import { FlatList, View } from "react-native"

// Dummy data
const posts: ChallengePostCardProps[] = [
    {
        id: 'post-0',
        participantStatus: UserChallengeStatus.NOT_JOINED,
        challengeState: ChallengeState.SCHEDULED,
        type: 'virtual',
        participationRangeId: 1,
        description: '2 hour continuous cycling challenge',
        location: '47 W 13th St, New York, NY 10011, USA',
        createdAt: {
            _nanoseconds: 86840000,
            _seconds: 98493744,
        },
        challengeAt: {
            _nanoseconds: 997965443839,
            _seconds: 1050030455,
        },
        createdUser: {
            uid: 'uid',
            displayName: 'Nisal Pathmila Perera',
            profileImageUrl: ''
        },
        participantLimitReached: false
    },{
        id: 'post-0',
        participantStatus: UserChallengeStatus.COMPLETED,
        challengeState: ChallengeState.SCHEDULED,
        type: 'virtual',
        participationRangeId: 2,
        description: '2 hour continuous cycling challenge',
        location: '47 W 13th St, New York, NY 10011, USA',
        createdAt: {
            _nanoseconds: 86840000,
            _seconds: 98493744,
        },
        challengeAt: {
            _nanoseconds: 997965443839,
            _seconds: 1050030455,
        },
        createdUser: {
            uid: 'uid',
            displayName: 'Nisal Pathmila Perera',
            profileImageUrl: ''
        },
        participantLimitReached: false
    },
    {
        id: 'post-1',
        participantStatus: UserChallengeStatus.JOINED,
        challengeState: ChallengeState.SCHEDULED,
        type: 'vertual',
        participationRangeId: 2,
        description: '2 hour continuous cycling challenge',
        location: '47 W 13th St, New York, NY 10011, USA',
        createdAt: {
            _nanoseconds: 86840000,
            _seconds: 98493744,
        },
        challengeAt: {
            _nanoseconds: 997965443839,
            _seconds: 1050030455,
        },
        createdUser: {
            uid: 'uid',
            displayName: 'Nisal Pathmila Perera',
            profileImageUrl: ''
        },
        participantLimitReached: true
    },
    {
        id: 'post-2',
        participantStatus: UserChallengeStatus.NOT_JOINED,
        challengeState: ChallengeState.ONGOING,
        type: 'vertual',
        participationRangeId: 3,
        description: '2 hour continuous cycling challenge',
        location: '47 W 13th St, New York, NY 10011, USA',
        createdAt: {
            _nanoseconds: 86840000,
            _seconds: 98493744,
        },
        challengeAt: {
            _nanoseconds: 997965443839,
            _seconds: 1050030455,
        },
        createdUser: {
            uid: 'uid',
            displayName: 'Nisal Pathmila Perera',
            profileImageUrl: ''
        },
        participantLimitReached: true
    },
    {
        id: 'post-3',
        participantStatus: UserChallengeStatus.JOINED,
        challengeState: ChallengeState.ONGOING,
        type: 'vertual',
        participationRangeId: 2,
        description: '2 hour continuous cycling challenge',
        location: '47 W 13th St, New York, NY 10011, USA',
        createdAt: {
            _nanoseconds: 86840000,
            _seconds: 98493744,
        },
        challengeAt: {
            _nanoseconds: 997965443839,
            _seconds: 1050030455,
        },
        createdUser: {
            uid: 'uid',
            displayName: 'Nisal Pathmila Perera',
            profileImageUrl: ''
        },
    }
]

const OnGoingChallengesScreen = () => {
    const user = useUser()
    const { tabs, setTabs } = useTabSelector()

    const [showChallengeCreate, setShowChallengeCreate] = useState<boolean>(false)

    const onCloseModal = () => {
        setShowChallengeCreate(false)
    }

    return (
        <View className='bg-grey h-full'>
            <FlatList
                className='px-3 bg-grey'
                data={posts}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, index) => `${index}`}
                ListHeaderComponent={() => (
                    <>
                        <View className="w-full flex flex-row items-center justify-between">
                            <CharmBtn classNames="mb-1 mr-3" icon={IconNames.chevronLeft} onPress={() => router.back()} size={InputSizes.md} frame={true} />
                            <View style={{ flex: 1 }}>
                                <ActionBar title='Post a challenge...' active={false} onPress={() => setShowChallengeCreate(true)} />
                            </View>
                        </View>
                    </>
                )}
                renderItem={({ item }) => {
                    return (
                        <ChallengePostCard item={item} />
                    )
                }}
                ItemSeparatorComponent={() => <View className="w-full h-[15px]"/>}
            />
            <PostModal
                postType={PostType.challenge}
                showModal={showChallengeCreate}
                postParams={undefined}
                postHeaderData={{
                    icon: IconNames.trophy,
                    title: 'Publish challenge'
                }}
                actionBarData={{ title: 'Post a challenge...' }}
                onCancel={onCloseModal}
                setShowModal={onCloseModal}
            />
        </View>
    )
}

export default OnGoingChallengesScreen
