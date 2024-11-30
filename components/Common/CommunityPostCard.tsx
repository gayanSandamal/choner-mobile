import { BLURHASH } from "@/constants/values"
import { CommunityPostCardProps, FontTypes, IconNames, InputSizes } from "@/types/Components"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import Label from "../Base/Label"
import { PostUserItem } from "./PostUserItem"
import { Image } from "expo-image"
import { Colors } from "@/constants/Colors"
import { escapePercent } from "@/utils/commonUtils"
import Icon from "../Base/Icon"
import { router } from "expo-router"

const styles = StyleSheet.create({
    wrapper: {width: '100%', borderRadius: 10, backgroundColor: Colors.dark.darkText, marginBottom: 6, overflow: 'hidden', position: 'relative'}
})


export const CommunityPostCard = (props: CommunityPostCardProps) => {

    const navigateToCommunityScreen = () => {
        router.push({
          pathname: props.navigationPath || '/(app)/(tabs)/community/community-view',
          params: {
            data: JSON.stringify({
              isOwner: props.isOwner,
              id: props.data.id,
              title: props.data.title,
              type: props.data.type,
              imageUrls: {
                sm: escapePercent(props.data?.imageUrls?.sm || ''),
                md: escapePercent(props.data?.imageUrls?.md || ''),
                lg: escapePercent(props.data?.imageUrls?.lg || '')
              },
              createdBy: {
                ...props.data.createdBy,
                profileImageUrl: escapePercent(props.data?.createdBy?.profileImageUrl || '')
              },
              createdAt: props.data.createdAt,
              scheduledAt: props.data.scheduledAt,
              visibility: props.data.visibility,
              voteCount: props.data.voteCount,
            })
          },
        })
    }

    return (
        <TouchableOpacity  style={{...styles.wrapper}} onPress={navigateToCommunityScreen}>
            <Image style={{width: '100%', aspectRatio: props.image? 1: 2, opacity: props.scheduled ? 0.5 : 1}} source={props.image} placeholder={{ blurhash: BLURHASH[2] }} contentFit={props.image ? "cover": "fill"} transition={500} />
            <View className='px-3 pb-3' style={{width: '100%', opacity: props.scheduled ? 0.5 : 1}}>
                <Label numberOfLines={6} classNames='py-3' type={FontTypes.FLabel} label={props.title} color={Colors.dark['grey-shade-4']} />
                <PostUserItem fullWidth={true} imageUrl={props.createdBy.profileImageUrl} userName={props.createdBy.displayName} createdAt={props.createdAt} />
            </View>
            {props.scheduled && (
                <View className="absolute right-2.5 top-2.5">
                  <Icon name={IconNames.timer} size={InputSizes.md} color={Colors.dark["primary-material-1"]}/>
                </View>
            )}
      </TouchableOpacity>
    )
}