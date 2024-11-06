import { Btn, CharmBtn } from "@/components/Base/Button"
import { ChallengePostCard } from "@/components/Common/ChallengePostCard"
import { ActionBar, PostModal } from "@/components/Post/Post"
import { Colors } from "@/constants/Colors"
import { useTabSelector } from "@/contexts/tabSelectorContext"
import { useUser } from "@/contexts/userContext"
import { useFetchChallengePosts } from "@/hooks/get/useFetchChallengePosts"
import { useAuthUserId } from "@/hooks/useAuthUser"
import { ChallengePostCardProps, ChallengeState, IconNames, InputSizes, PostType, UserChallengeStatus } from "@/types/Components"
import { parseToChallengeCardProps } from "@/utils/commonUtils"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native"

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
        type: 'on-locaion',
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
        type: 'virtual',
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
        type: 'on-locaion',
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

export const ChallegeScreenTabs = ['ALL', 'JOINED', 'COMPLETED']

const OnGoingChallengesScreen = () => {
    const uid = useAuthUserId()
    const { tabs, setTabs } = useTabSelector()

    const [refreshing, setRefreching] = useState<boolean>(false)
    const [showChallengeCreate, setShowChallengeCreate] = useState<boolean>(false)

    const {data: challenges, isFetching: fetchingPosts, fetchNextPage: fetchNextChallenges, refetch: refetchChallenges} = useFetchChallengePosts(uid || '', !!uid)
        
    useEffect(() => {
        !tabs && setTabs({tab: ChallegeScreenTabs[0]})
        !challenges && refetchChallenges()
    }, [])
  
    const onRefresh = async () => {
        setRefreching(true)
        await refetchChallenges().then(() => {
          setRefreching(false)
        })
      }
    
    const onCloseModal = () => {
        setShowChallengeCreate(false)
    }

  const setBtnBackgroundColor = (index: number) => {
    return tabs?.tab === ChallegeScreenTabs[index]? Colors.dark['soundcloud-gdr-1']: undefined
  }

  const setBtnTextColor = (index: number) => {
    return tabs?.tab !== ChallegeScreenTabs[index]? Colors.dark['primary-shade-2']: undefined
  }

    return (
        <>
            <FlatList
                className="px-3 bg-grey w-full h-full"
                data={[{}]}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <>
                        <View className="w-full flex flex-row items-center justify-between">
                            <CharmBtn classNames="mb-1 mr-3" icon={IconNames.chevronLeft} onPress={() => router.back()} size={InputSizes.md} frame={true} />
                            <View style={{ flex: 1 }}>
                                <ActionBar title='Post a challenge...' active={false} onPress={() => setShowChallengeCreate(true)} />
                            </View>
                        </View>
                        <View className="flex flex-row mb-2">
                            {ChallegeScreenTabs.map((item, index) => (
                                <Btn key={index} size={InputSizes.md} outlined={!!setBtnTextColor(index)} label={item} color={setBtnTextColor(index)} backgroundColor={setBtnBackgroundColor(index)} wrapperClasses='mr-2 mb-2' onPress={() => setTabs({tab: ChallegeScreenTabs[index]})} />
                            ))}
                        </View>
                        {fetchingPosts && !challenges && <ActivityIndicator color={Colors.light.white} className='mt-20 mr-auto ml-auto' size={40} />}
                    </>
                )}
                renderItem={() => (
                    <FlatList
                        className='bg-grey'
                        data={challenges}
                        scrollEnabled={false}
                        removeClippedSubviews={true}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(_, index) => `${index}`}
                        renderItem={({ item }) => {
                            const parsedItem = parseToChallengeCardProps(item)
                            return (
                                <ChallengePostCard item={parsedItem} />
                            )
                        }}
                        ItemSeparatorComponent={() => <View className="w-full h-[15px]"/>}
                        ListFooterComponent={() => <View className="w-full h-[70px]"/>}
                    />
                )}
                refreshing={refreshing}
                onEndReachedThreshold={0.5}
                onEndReached={() => fetchNextChallenges()}
                onRefresh={onRefresh}
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
        </>
    )
}

export default OnGoingChallengesScreen
