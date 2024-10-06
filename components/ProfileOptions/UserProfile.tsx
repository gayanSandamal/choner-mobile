import { Colors } from "@/constants/Colors"
import { ActivityIndicator, FlatList, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Avatar } from "../Base/Avatar"
import { FontTypes, IconNames, InputSizes } from "@/types/Components"
import { useUser } from "@/contexts/userContext"
import Label from "../Base/Label"
import { Btn } from "../Base/Button"
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

const styles = StyleSheet.create({
    wrapper: {flex: 1, alignItems: 'center'},
    avatarWrapper: {flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10, marginBottom: 10},
    avatar: { marginTop: 20, backgroundColor: '#F7971E' },
    bioButtons: {flexDirection: 'row', width: '100%', marginTop: 10}
})

export default function UserProfile () {
    const uid = useAuthUserId()

    const [refreshing, setRefreching] = useState<boolean>(false)
  
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
            data={[{}]}
            scrollEnabled={true}
            renderItem={() => {
            return (
                <>
                    <Bio />
                    <FlatList
                        data={interests}
                        renderItem={({ item }) => {
                        const parsedItem = parseToInterestCardProps(item)
                        return (
                            <View className='mb-4'>
                            <InterestCard data={parsedItem} />
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
                </>
                )
            }}
        />
    </TouchableWithoutFeedback>)
}