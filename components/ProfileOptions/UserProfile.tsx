import { Colors } from "@/constants/Colors"
import { ActivityIndicator, FlatList, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { FontTypes, IconNames, InputSizes, InterestPostParams, JustifyContent, PostType } from "@/types/Components"
import Label from "../Base/Label"
import {  BtnDetailed, CharmBtn } from "../Base/Button"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Bio } from "./Bio"
import { useAuthUserId } from "@/hooks/useAuthUser"
import { useFetchUserInterestPosts } from "@/hooks/get/useFetchInterestPosts"
import { parseToInterestCardProps } from "@/utils/commonUtils"
import { InterestCard } from "../Common/InterestCard"
import { PostModal } from "../Post/Post"
import { useTabSelector } from "@/contexts/tabSelectorContext"
import { CommunityPostTypes, POST_VISIBILITY } from "@/constants/values"
import { useFetchUserCommunityPosts } from "@/hooks/get/useFetchCommunityPosts"
import { CommunityList } from "../Common/CommunityList"

const tabNames = [ 'Posts', 'Questions', 'Interests',]

const styles = StyleSheet.create({
    wrapper: {flex: 1, alignItems: 'center'},
    avatarWrapper: {flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10, marginBottom: 10},
    avatar: { marginTop: 20, backgroundColor: '#F7971E' },
    bioButtons: {flexDirection: 'row', width: '100%', marginTop: 10},
    listTypeSelectBtn: {height: 36, paddingHorizontal: 10, marginTop: 0, marginRight: 10, borderRadius: 15, borderWidth: 0},
})

export default function UserProfile () {
    const uid = useAuthUserId()
    const {tabs, setTabs} = useTabSelector()

    const [refreshing, setRefreching] = useState<boolean>(false)
    const [interestPostData, setInterestPostData] = useState<InterestPostParams | null>(null)
    const [showOptionInterest, setShowOptionInterest] = useState<string>('')

    const {
        data: interests,
        isFetching: fetchingInterests,
        refetch: refetchInterest,
        fetchNextPage: fetchNextInterests
    } = useFetchUserInterestPosts(tabs?.visibility || '', uid || '', !!uid && !!tabs && tabs?.tab === tabNames[2])
    
    const {data: communityPosts,
        isFetching: fetchingCommunityPosts,
        refetch: refetchCommunityPosts,
        fetchNextPage: fetchNextCommunityPosts
    } = useFetchUserCommunityPosts(tabs?.visibility || '', uid || '', tabs?.tab === tabNames[1]? CommunityPostTypes[1]: CommunityPostTypes[0], !!uid && !!tabs && (tabs?.tab === tabNames[0] || tabs?.tab === tabNames[1]))

    useEffect(() => {
        !tabs && setTabs({tab: tabNames[0], visibility: POST_VISIBILITY.PUBLIC})
    }, [])

    useEffect(() => {
        !communityPosts && !!tabs && tabs?.tab === tabNames[0] && uid && fetchNextCommunityPosts()
        !communityPosts && !!tabs && tabs?.tab === tabNames[1]  && uid && fetchNextCommunityPosts()
        !interests && !!tabs && tabs?.tab === tabNames[2]  && uid && refetchInterest()
    }, [tabs?.tabs])

    const { communityPostList1, communityPostList2 } = useMemo(() => {
    const communityPostList1: any = []
    const communityPostList2: any = []
    
    if (!communityPosts) return { communityPostList1, communityPostList2}
    
    communityPosts.forEach((item, index) => {
      if (index % 2 === 0) {
        communityPostList1.push(item)
      } else {
        communityPostList2.push(item)
      }
    })

    return { communityPostList1, communityPostList2 }
  }, [communityPosts])

    const onRefresh = async () => {
        setRefreching(true)

        if (tabs?.tab === tabNames[2]) {
            await refetchInterest().then((f) => {
                setRefreching(false)
            })
            return
        }
        await refetchCommunityPosts().then((f) => {
            setRefreching(false)
        })
    }

    const onViewPress = () => {
        Keyboard.dismiss()
        showOptionInterest && setShowOptionInterest('')
    }

    const onCloseModal = () => {
        setInterestPostData(null)
        setShowOptionInterest('')
    }
    
    const setHeaderButtonColor = (index: number) => {
        return tabs?.tab === tabNames[index]? Colors.dark['primary-material-1'] + '3A': Colors.dark['grey-shade-3'] + '2A'
    }
    
    const setHeaderButtonTextColor = (index: number) => {
        return tabs?.tab === tabNames[index]? Colors.dark['primary-material-1']: Colors.dark['grey-shade-2']
    }

    const setVisibility = () => {
        tabs && setTabs({tab: tabs?.tab, visibility: tabs?.visibility === POST_VISIBILITY.PUBLIC? POST_VISIBILITY.SCHEDULED: POST_VISIBILITY.PUBLIC})
    }

    const setSelectdTab = (index: number) => {
        setTabs({tab: tabNames[index], ...(tabs?.visibility && {visibility: tabs?.visibility})})
    }

    return  (
    <TouchableWithoutFeedback onPress={onViewPress} accessible={false}>
        <FlatList
            className="mt-3"
            data={tabs?.tab === tabNames[2]? interests: communityPosts? [{}]: []}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <>
                    <PostModal
                        postType={PostType.interest}
                        showModal={!!interestPostData}
                        postParams={interestPostData ? {
                            id: interestPostData.id,
                            interest: interestPostData.interest,
                            interestDesc: interestPostData.interestDesc,
                            scheduledAt: interestPostData.scheduledAt,
                            visibility: interestPostData.visibility
                        }: undefined}
                        postHeaderData={{
                            icon: IconNames.addPost,
                            title: 'Edit this interest'
                        }}
                        actionBarData={{ title: 'Hey, want to update your interest..?' }}
                        onCancel={onCloseModal}
                        setShowModal={onCloseModal}
                    />
                    <Bio />
                    <Label label="Activity" type={FontTypes.FTitle3Bold} />
                    <View className="flex flex-row mt-4 mb-4">
                        <BtnDetailed wrapperStyle={{...styles.listTypeSelectBtn, width: 70, backgroundColor: setHeaderButtonColor(0)}} labelAlign={JustifyContent.center} fontType={FontTypes.FLabel} label={"Posts"} labelColor={setHeaderButtonTextColor(0)} onPress={() => setSelectdTab(0)} />
                        <BtnDetailed wrapperStyle={{...styles.listTypeSelectBtn, width: 96, backgroundColor: setHeaderButtonColor(1)}} labelAlign={JustifyContent.center} fontType={FontTypes.FLabel} label={"Questions"} labelColor={setHeaderButtonTextColor(1)} onPress={() => setSelectdTab(1)} />
                        <BtnDetailed wrapperStyle={{...styles.listTypeSelectBtn, width: 80, backgroundColor: setHeaderButtonColor(2)}} labelAlign={JustifyContent.center} fontType={FontTypes.FLabel} label={"Interests"} labelColor={setHeaderButtonTextColor(2)} onPress={() => setSelectdTab(2)} />
                        <View className="mt-[2px] mr-0 ml-auto">
                            <CharmBtn icon={IconNames.timer} color={tabs?.visibility === POST_VISIBILITY.SCHEDULED? Colors.dark["primary-material-1"]: Colors.light.white} onPress={setVisibility} size={InputSizes.md} frame={true} />
                        </View>
                    </View>
                </>
            }
            renderItem={({ item, index }) => {
                if (tabs?.tab !== tabNames[2]) {
                    return <CommunityList uid={uid || ''} scheduled={tabs?.visibility === POST_VISIBILITY.SCHEDULED} communityPostList1={communityPostList1} communityPostList2={communityPostList2} navigationPath="/community-post" />
                } else {
                    const parsedItem = parseToInterestCardProps(item)
                    return (
                        <View className='mb-4'>
                            <InterestCard scheduled={tabs?.visibility === POST_VISIBILITY.SCHEDULED} isOwner={parsedItem.createdUser.uid === uid} data={parsedItem} showOptionInterest={showOptionInterest} navigationPath="/interest" onOptionPress={() => setInterestPostData({id: parsedItem.id, interest: parsedItem.title, interestDesc: parsedItem.description, scheduledAt: parsedItem?.scheduledAt, visibility: parsedItem.visibility})} setShowOptionInterest={setShowOptionInterest} />
                        </View>
                    )
                }
            }}
            ListEmptyComponent={() =>  (fetchingInterests && !interests) || (fetchingCommunityPosts && !communityPosts) && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
            keyExtractor={(item, index) => `${item?.id}-${index}`}
            refreshing={refreshing}
            onEndReachedThreshold={0.4}
            onRefresh={onRefresh}
            onEndReached={() => tabs?.tab === tabNames[2]? fetchNextInterests(): fetchNextCommunityPosts()}
        />
    </TouchableWithoutFeedback>)
}