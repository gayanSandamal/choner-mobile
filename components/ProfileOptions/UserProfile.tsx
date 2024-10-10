import { Colors } from "@/constants/Colors"
import { ActivityIndicator, FlatList, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Avatar } from "../Base/Avatar"
import { FontTypes, IconNames, InputSizes, JustifyContent, PostType } from "@/types/Components"
import { useUser } from "@/contexts/userContext"
import Label from "../Base/Label"
import { Btn, BtnDetailed } from "../Base/Button"
import React, { useState } from "react"
import { TextArea } from "../Base/TextArea"
import { useSetUser } from "@/hooks/mutate/useMutateUser"
import { router } from "expo-router"
import { User } from "@/types/User"
import { Bio } from "./Bio"
import { useAuthUserId } from "@/hooks/useAuthUser"
import { useFetchInterestPosts } from "@/hooks/get/useFetchInterestPosts"
import { parseToInterestCardProps } from "@/utils/commonUtils"
import { InterestCard } from "../Common/InterestCard"
import { Spacer } from "../Base/Spacer"
import { PostModal } from "../Post/Post"

const styles = StyleSheet.create({
    wrapper: {flex: 1, alignItems: 'center'},
    avatarWrapper: {flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10, marginBottom: 10},
    avatar: { marginTop: 20, backgroundColor: '#F7971E' },
    bioButtons: {flexDirection: 'row', width: '100%', marginTop: 10},
    listTypeSelect: {width: 70, height: 36, paddingHorizontal: 10, borderRadius: 15, backgroundColor: Colors.dark['primary-material-1'] + '5A', borderWidth: 0}
})

export default function UserProfile () {
    const uid = useAuthUserId()

    const [refreshing, setRefreching] = useState<boolean>(false)
    const [showUpdateInterest, setShowUpdateInterest] = useState<boolean>(false)
  
    const {data: interests, isFetching, refetch} = useFetchInterestPosts(uid || '', !!uid)

    const onRefresh = async () => {
        setRefreching(true)
        await refetch().then((f) => {
          setRefreching(false)
        })
    }
    
    return  (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <FlatList
            className="mt-3"
            data={[{}]}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <PostModal
                    postType={PostType.interest}
                    showModal={showUpdateInterest}
                    postParams={{
                        edit: true
                    }}
                    postHeaderData={{
                        icon: IconNames.addPost,
                        title: 'Edit this interest'
                    }}
                    onCancel={() => setShowUpdateInterest(false)}
                    setShowModal={setShowUpdateInterest}               />
            }
            renderItem={() => (<Bio />)}
            ListFooterComponent={
                <FlatList
                    data={interests} 
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
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
                            <InterestCard data={parsedItem} navigationPath="/interest" onOptionPress={() => setShowUpdateInterest(true)} />
                        </View>
                    )
                    }}
                    ListEmptyComponent={() => {
                    return <>
                        {isFetching && !interests && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
                    </>
                    }}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    keyExtractor={(item, index) => `${item?.id}-${index}`}
                />
            }
        />
    </TouchableWithoutFeedback>)
}