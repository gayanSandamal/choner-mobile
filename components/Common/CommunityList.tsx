import { FlatList, View, StyleSheet } from "react-native"
import { CommunityPostCard } from "./CommunityPostCard"
import { parseToCommunityCardProps } from "@/utils/commonUtils"

const styles = StyleSheet.create({
    wrapper: {flexDirection: 'row', width: '100%'},
    postListLeft: {flex: 1, marginRight: 5},
    postListRight: {flex: 1, marginLeft: 5},
    listTypeSelectBtn1: {width: 70, height: 36, paddingHorizontal: 10, marginRight: 15, borderRadius: 15, borderWidth: 0},
    listTypeSelectBtn2: {width: 96, height: 36, paddingHorizontal: 10, marginRight: 15, borderRadius: 15, borderWidth: 0}
  })

type CommunityListProps = {
    communityPostList1: any
    communityPostList2: any
    scheduled?: boolean
}

export const CommunityList = ({communityPostList1, communityPostList2, scheduled}: CommunityListProps) => {

    return (
        <View style={styles.wrapper}>
            <FlatList
                style={styles.postListLeft}
                data={communityPostList1}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    const parsedData = parseToCommunityCardProps(item)
                    return <CommunityPostCard scheduled={scheduled} image={parsedData.imageUrls.sm} title={parsedData.title} createdUser={parsedData.createdUser} createdAt={parsedData.createdAt} />
                }}
                keyExtractor={(item, index) => `${item?.id}-${index}-1`}
            />
            <FlatList
                style={styles.postListRight}
                data={communityPostList2}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    const parsedData = parseToCommunityCardProps(item)
                    return <CommunityPostCard scheduled={scheduled} image={parsedData.imageUrls.sm} title={parsedData.title} createdUser={parsedData.createdUser} createdAt={parsedData.createdAt} />
                }}
                keyExtractor={(item, index) => `${item?.id}-${index}-2`}
            />
        </View>
    )
}