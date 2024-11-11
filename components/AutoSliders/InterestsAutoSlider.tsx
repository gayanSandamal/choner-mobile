import { FontTypes, IconNames, InputSizes, InterestCardData } from '@/types/Components'
import { escapePercent, parseToInterestCardProps } from '@/utils/commonUtils'
import React, { useRef, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useAuthUserId } from '@/hooks/useAuthUser'
import { useFetchInterestPosts } from '@/hooks/get/useFetchInterestPosts'
import { Colors } from '@/constants/Colors'
import { PostUserItem } from '../Common/PostUserItem'
import Label from '../Base/Label'
import { router } from 'expo-router'
import Icon from '../Base/Icon'

const styles = StyleSheet.create({
    cardWrapper: { padding: 12, borderRadius: 16, height: 135, backgroundColor: Colors.dark.darkText, borderColor: Colors.dark['soundcloud-gdr-1'], borderWidth: 1 }
  })

type AutoSliderProps = {
    interval: number
}
export const InterestAutoSlider = ({ interval = 3000 }: AutoSliderProps) => {
  const flatListRef = useRef(null)

  const uid = useAuthUserId()
  const {width} = useWindowDimensions()

  const [currentIndex, setCurrentIndex] = useState(0)

  const {data: interests} = useFetchInterestPosts(uid || '', !!uid)


  useEffect(() => {
    if (!interests || !uid) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % interests?.length)
    }, interval)

    return () => clearInterval(timer)
  }, [interval, interests])

  useEffect(() => {
    if (!interests || !uid) return

    flatListRef.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
    })
  }, [currentIndex])

  const navigateToInterest = (data: InterestCardData) => {
    router.push({
      pathname: '/interests/interest-view',
      params: {
        data: JSON.stringify({
          isOwner: false,
          id: data.id,
          title: data.title,
          description: data.description,
          createdBy: {
            ...data.createdBy,
            profileImageUrl: escapePercent(data?.createdBy?.profileImageUrl || '')
          },
          createdAt: data.createdAt,
          scheduledAt: data.scheduledAt,
          visibility: data.visibility,
          voteCount: data.voteCount,
        })
      },
    })
  }

  if (!interests || !uid) {
    return (
      <View style={styles.cardWrapper} className='flex justify-center items-center'>
        <ActivityIndicator color={Colors.light.white} />
      </View>
    )
  }

  return (
    <FlatList
      ref={flatListRef}
      className='w-full'
      horizontal
      style={styles.cardWrapper}
      data={interests}
      scrollEnabled={false}
      removeClippedSubviews={true}
      keyExtractor={(item, index) => `${index}-${item.id}`}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        const parsedItem = parseToInterestCardProps(item)
          return (
            <TouchableOpacity className='' style={{width}} onPress={() => navigateToInterest(parsedItem)}>
              <View className='flex flex-row items-top w-full'>
                <PostUserItem imageUrl={parsedItem.createdBy.profileImageUrl || undefined} userName={parsedItem.createdBy.displayName} createdAt={parsedItem.createdAt} dateProps={{newLineDate: false, clipeDate: true}} />
                <View style={{backgroundColor: Colors.light.white, width: 1, height: '100%'}} />
                <View style={{flex: 1, paddingRight: 30}}>
                  <Label type={FontTypes.FTitle3Bold} label={parsedItem.title} classNames='ml-2 mt-[-4px]' numberOfLines={2} ellipsizeMode='tail' />
                </View>
                <View className='w-[12px]' />
              </View>

              
              <View className='flex flex-row my-4'>
                <Label label="Why: " type={FontTypes.FLabel} color={Colors.dark.background} containerStyles={{ fontWeight: 500 }} />
                <View style={{flex: 1, paddingRight: 30}}>
                  <Label label={parsedItem.description} type={FontTypes.FLabel} color={Colors.dark['grey-shade-3']} numberOfLines={1} />
                </View>
                <View className='w-[12px]' />
              </View>

              <View className='flex-row items-center mb-[-6px]'>
              <Icon name={IconNames.interestsFill} size={InputSizes.sm} />
              <Label label={`|  ${parsedItem.voteCount || 0}`} type={FontTypes.FLabel} classNames='ml-1' />
            </View>
            </TouchableOpacity>
          )
      }}
    />
  )
}
