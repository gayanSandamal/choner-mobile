import { Colors } from "@/constants/Colors"
import { ActivityIndicator, FlatList, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { FontTypes, IconNames, InterestPostParams, JustifyContent, PostType } from "@/types/Components"
import Label from "../Base/Label"
import {  BtnDetailed } from "../Base/Button"
import React, { useEffect, useState } from "react"
import { Bio } from "./Bio"
import { useAuthUserId } from "@/hooks/useAuthUser"
import { useFetchInterestPosts } from "@/hooks/get/useFetchInterestPosts"
import { parseToInterestCardProps } from "@/utils/commonUtils"
import { InterestCard } from "../Common/InterestCard"
import { PostModal } from "../Post/Post"

const styles = StyleSheet.create({
    wrapper: {flex: 1, alignItems: 'center'},
    avatarWrapper: {flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10, marginBottom: 10},
    avatar: { marginTop: 20, backgroundColor: '#F7971E' },
    bioButtons: {flexDirection: 'row', width: '100%', marginTop: 10},
    listTypeSelect: {width: 80, height: 36, paddingHorizontal: 10, borderRadius: 15, backgroundColor: Colors.dark['primary-material-1'] + '5A', borderWidth: 0}
})

export default function UserProfile () {
    const uid = useAuthUserId()

    const [refreshing, setRefreching] = useState<boolean>(false)
    const [interestPostData, setInterestPostData] = useState<InterestPostParams | null>(null)
    const [showOptionInterest, setShowOptionInterest] = useState<string>('')

    const {data: interests, isFetching, refetch, fetchNextPage} = useFetchInterestPosts(true, uid || '', !!uid)

    const onRefresh = async () => {
        setRefreching(true)
        await refetch().then((f) => {
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
    
    return  (
    <TouchableWithoutFeedback onPress={onViewPress} accessible={false}>
        <FlatList
            className="mt-3"
            data={interests}
            scrollEnabled={true}
            nestedScrollEnabled={true}
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
                        <BtnDetailed wrapperStyle={styles.listTypeSelect} labelAlign={JustifyContent.center} fontType={FontTypes.FLabel} label={"Interests"} labelColor={Colors.dark['primary-material-1']} onPress={() => {}} />
                    </View>
                </>
            }
            renderItem={({ item }) => {
                const parsedItem = parseToInterestCardProps(item)
                return (
                    <View className='mb-4'>
                        <InterestCard isOwner={parsedItem.createdUser.uid === uid} data={parsedItem} showOptionInterest={showOptionInterest} navigationPath="/interest" onOptionPress={() => setInterestPostData({id: parsedItem.id, interest: parsedItem.title, interestDesc: parsedItem.description, scheduledAt: parsedItem.scheduledAt, visibility: parsedItem.visibility})} setShowOptionInterest={setShowOptionInterest} />
                    </View>
                )
            }}
            ListEmptyComponent={() => {
            return <>
                {isFetching && !interests && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
            </>
            }}
            keyExtractor={(item, index) => `${item?.id}-${index}`}
            refreshing={refreshing}
            onEndReachedThreshold={0.4}
            onRefresh={onRefresh}
            onEndReached={() => fetchNextPage()}
        />
    </TouchableWithoutFeedback>)
}