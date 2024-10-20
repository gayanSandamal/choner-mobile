import { BLURHASH } from "@/constants/values"
import { CommunityPostCardProps, FontTypes } from "@/types/Components"
import { View, StyleSheet } from "react-native"
import Label from "../Base/Label"
import { PostUserItem } from "./PostUserItem"
import { Image } from "expo-image"
import { Colors } from "@/constants/Colors"
import { truncateText } from "@/utils/commonUtils"

const styles = StyleSheet.create({
    wrapper: {width: '100%', borderRadius: 10, backgroundColor: Colors.dark.darkText, marginBottom: 6, overflow: 'hidden'}
})


export const CommunityPostCard = (props: CommunityPostCardProps) => {
    return (
        <View  style={styles.wrapper}>
            <Image style={{width: '100%', aspectRatio: props.image? 1: 2}} source={props.image} placeholder={{ blurhash: BLURHASH[2] }} contentFit={props.image ? "cover": "fill"} transition={500} />
            <View className='px-3 pb-3' style={{width: '100%'}}>
                <Label numberOfLines={6} classNames='py-3' type={FontTypes.FLabel} label={props.title} color={Colors.dark['grey-shade-4']} />
                <PostUserItem fullWidth={true} imageUrl={props.createdUser.profileImageUrl} userName={props.createdUser.displayName} createdAt={props.createdAt} />
            </View>
      </View>
    )
}