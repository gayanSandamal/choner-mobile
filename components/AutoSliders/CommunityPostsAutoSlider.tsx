import { CommunityCardData, FontTypes } from '@/types/Components'
import { escapePercent, parseToCommunityCardProps } from '@/utils/commonUtils'
import React, { useRef, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useAuthUserId } from '@/hooks/useAuthUser'
import { Colors } from '@/constants/Colors'
import { PostUserItem } from '../Common/PostUserItem'
import Label from '../Base/Label'
import { router } from 'expo-router'
import { useFetchCommunityPosts } from '@/hooks/get/useFetchCommunityPosts'
import { BLURHASH } from '@/constants/values'
import { Image } from 'expo-image'

const styles = StyleSheet.create({
    cardWrapper: {width: '100%', borderRadius: 10, height: 295, backgroundColor: Colors.dark.darkText, overflow: 'hidden'}

})

type RenderCommunityPostProps = {
    item: CommunityCardData
}

const RenderCommunityPost = React.memo(({ item }: RenderCommunityPostProps) => {
    const navigateToPost = () => {
        router.push({
          pathname: '/community/community-view',
          params: {
            data: JSON.stringify({
              isOwner: item.isOwner,
              id: item.id,
              title: item.title,
              type: item.type,
              imageUrls: {
                sm: escapePercent(item?.imageUrls?.sm || ''),
                md: escapePercent(item?.imageUrls?.md || ''),
                lg: escapePercent(item?.imageUrls?.lg || '')
              },
              createdBy: {
                ...item.createdBy,
                profileImageUrl: escapePercent(item?.createdBy?.profileImageUrl || '')
              },
              createdAt: item.createdAt,
              scheduledAt: item.scheduledAt,
              visibility: item.visibility,
              voteCount: item.voteCount,
            })
          },
        })
    }
    return (
        <TouchableOpacity onPress={() => navigateToPost()}>
            <Image style={{ width: '100%', aspectRatio: 1, opacity: 1 }} source={item.imageUrls.md} placeholder={{ blurhash: BLURHASH[2] }} contentFit="cover" transition={500} />
            <View className="px-3 pb-3" style={{ width: '100%' }}>
                <Label numberOfLines={2} classNames="py-3" type={FontTypes.FLabel} label={item.title} color={Colors.dark['grey-shade-4']} />
                <PostUserItem fullWidth imageUrl={item.createdBy.profileImageUrl} userName={item.createdBy.displayName} createdAt={item.createdAt} />
            </View>
        </TouchableOpacity>
    );
});

type AutoSliderProps = {
    interval: number
    communityPostType: string
}
export const CommunityPostsAutoSlider = ({ communityPostType, interval = 3000 }: AutoSliderProps) => {
  const flatListRef = useRef(null)

  const uid = useAuthUserId()

  const [currentIndex, setCurrentIndex] = useState(0)

  const { data: communityPosts } = useFetchCommunityPosts(uid || '', communityPostType, !!uid)

  useEffect(() => {
    if (!communityPosts || !uid) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % communityPosts?.length)
    }, interval)

    return () => clearInterval(timer)
  }, [interval, communityPosts])

  useEffect(() => {
    if (!communityPosts || !uid) return

    flatListRef.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
    })
  }, [currentIndex])


  if (!communityPosts || !uid) {
    return (
      <View style={styles.cardWrapper} className='flex justify-center items-center'>
        <ActivityIndicator color={Colors.light.white} />
      </View>
    )
  }

  return (
    <View style={styles.cardWrapper}>
        <FlatList
        ref={flatListRef}
        data={communityPosts}
        style={{flex: 1}}
        scrollEnabled={false}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => `${index}-${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
            const parsedItem = parseToCommunityCardProps(item)
            return (
                <RenderCommunityPost item={parsedItem} />
            )
        }}
        />
    </View>
  )
}
