import { Btn, CharmBtn } from "@/components/Base/Button"
import { ChallengePostCard } from "@/components/Common/ChallengePostCard"
import { ActionBar, PostModal } from "@/components/Post/Post"
import { Colors } from "@/constants/Colors"
import { useTabSelector } from "@/contexts/tabSelectorContext"
import { useFetchChallengePosts } from "@/hooks/get/useFetchChallengePosts"
import { useAuthUserId } from "@/hooks/useAuthUser"
import { IconNames, InputSizes, PostType } from "@/types/Components"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, View } from "react-native"

export const ChallegeScreenTabs = ['ALL', 'JOINED']

const OnGoingChallenges = () => {
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
                className="px-3 w-full h-full"
                style={{backgroundColor: Colors.dark.grey}}
                data={[{}]}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, index) => `main-${index}`}
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
                        data={challenges}
                        scrollEnabled={false}
                        removeClippedSubviews={true}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${item?.id}-${index}`}
                        renderItem={({ item }) => {
                            const parsedItem = {...item, isOwner: uid === item.createdBy.uid}
                            return (
                                <ChallengePostCard uid={uid || ''} item={parsedItem} />
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

export default OnGoingChallenges
