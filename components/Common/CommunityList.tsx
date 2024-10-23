import { FlatList, View, StyleSheet } from "react-native"
import { CommunityPostCard } from "./CommunityPostCard"
import { parseToCommunityCardProps } from "@/utils/commonUtils"
import { CommunityListProps } from "@/types/Components"

const styles = StyleSheet.create({
    wrapper: {flexDirection: 'row', width: '100%'},
    postListLeft: {flex: 1, marginRight: 5},
    postListRight: {flex: 1, marginLeft: 5},
    listTypeSelectBtn1: {width: 70, height: 36, paddingHorizontal: 10, marginRight: 15, borderRadius: 15, borderWidth: 0},
    listTypeSelectBtn2: {width: 96, height: 36, paddingHorizontal: 10, marginRight: 15, borderRadius: 15, borderWidth: 0}
  })

export const CommunityList = ({uid, communityPostList1, communityPostList2, scheduled, navigationPath}: CommunityListProps) => {

    return (
        <View style={styles.wrapper}>
            <FlatList
                removeClippedSubviews={true}
                style={styles.postListLeft}
                data={communityPostList1}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                    const parsedData = parseToCommunityCardProps(item)
                    return <CommunityPostCard data={parsedData} isOwner={parsedData.createdUser.uid === uid} scheduled={scheduled} image={parsedData.imageUrls.sm} title={parsedData.title} createdUser={parsedData.createdUser} createdAt={parsedData.createdAt} navigationPath={navigationPath} />
                }}
                keyExtractor={(item, index) => `${item?.id}-${index}-1`}
            />
            <FlatList
                removeClippedSubviews={true}
                style={styles.postListRight}
                data={communityPostList2}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    const parsedData = parseToCommunityCardProps(item)
                    return <CommunityPostCard data={parsedData} isOwner={parsedData.createdUser.uid === uid} scheduled={scheduled} image={parsedData.imageUrls.sm} title={parsedData.title} createdUser={parsedData.createdUser} createdAt={parsedData.createdAt} navigationPath={navigationPath} />
                }}
                keyExtractor={(item, index) => `${item?.id}-${index}-2`}
            />
        </View>
    )
}