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
import { commonStyles } from "@/assets/styles/common"


export const CommunityPostCard = (props: CommunityPostCardProps) => {
  const { navigationPath, uid = '', data, scheduled, cols = 1 } = props
  const { id, title, imageUrls, type, scheduledAt, visibility, voteCount, createdBy, createdAt } = data

  const thumbnail = imageUrls?.sm

  const gridItemWidth = `${100 / cols - (cols > 1 ? 1 : 0)}%`

  const styles = StyleSheet.create({
    wrapper: {
      width: gridItemWidth,
      borderRadius: 10,
      backgroundColor: Colors.dark.darkText,
      marginBottom: 10,
      overflow: 'hidden',
      position: 'relative',
      ...commonStyles['shadow-md']
    }
  })

  const navigateToCommunityScreen = () => {
    router.push({
      pathname: navigationPath || '/(app)/(tabs)/community/community-view',
      params: {
        data: JSON.stringify({
          isOwner: createdBy.uid === uid,
          id: id,
          title: title,
          type: type,
          imageUrls: {
            sm: escapePercent(imageUrls?.sm || ''),
            md: escapePercent(imageUrls?.md || ''),
            lg: escapePercent(imageUrls?.lg || '')
          },
          createdBy: {
            ...createdBy,
            profileImageUrl: escapePercent(createdBy?.profileImageUrl || '')
          },
          createdAt,
          scheduledAt: scheduledAt || null,
          visibility,
          voteCount
        })
      },
    })
  }

  return (
    <TouchableOpacity style={{ ...styles.wrapper }} onPress={navigateToCommunityScreen}>
      <Image style={{ width: '100%', aspectRatio: thumbnail ? 1 : 2, opacity: scheduled ? 0.5 : 1 }} source={thumbnail} placeholder={{ blurhash: BLURHASH[2] }} contentFit={thumbnail ? "cover" : "fill"} transition={500} />
      <View className='px-3 pb-3' style={{ width: '100%', opacity: scheduled ? 0.5 : 1 }}>
        <Label numberOfLines={6} classNames='py-3' type={FontTypes.FLabel} label={title} color={Colors.dark['grey-shade-4']} />
        <PostUserItem fullWidth={true} imageUrl={createdBy?.profileImageUrl} userName={createdBy?.displayName} createdAt={createdAt} />
      </View>
      {scheduled && (
        <View className="absolute right-2.5 top-2.5">
          <Icon name={IconNames.timer} size={InputSizes.md} color={Colors.dark["primary-material-1"]} />
        </View>
      )}
    </TouchableOpacity>
  )
}