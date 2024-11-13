import { BtnDetailed } from '@/components/Base/Button'
import { Spacer } from '@/components/Base/Spacer'
import { Circle } from '@/components/Common/Circle'
import { InterestCard } from '@/components/Common/InterestCard'
import { ActionBar, PostModal } from '@/components/Post/Post'
import { Colors } from '@/constants/Colors'
import { useFetchInterestPosts } from '@/hooks/get/useFetchInterestPosts'
import { useAuthUserId } from '@/hooks/useAuthUser'
import { Circle as CircleType, IconNames, InterestPostParams, PostType, PostTypeProps } from '@/types/Components'
import { parseToInterestCardProps } from '@/utils/commonUtils'
import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native'

const styles = StyleSheet.create({
  btnDetailedWrapper: {width: 150, backgroundColor: Colors.dark.darkText, borderRadius: 20, borderColor: Colors.dark.darkText}
})

const tempCircles: CircleType[] = [
  {
    id: 1,
    imageUri: 'https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_749471_16854181808683364.jpg',
    title: 'Weight Reducers',
    unreadCount: 101
  },
  {
    id: 2,
    imageUri: 'https://gymnation.com/media/movnxrjp/evening-jogs.jpg',
    title: 'Evening Joggers Club',
    unreadCount: 25
  },
  {
    id: 3,
    imageUri: 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/5/shutterstock_546341647.jpg',
    title: 'CKD Supports',
    unreadCount: 7
  },
  {
    id: 4,
    imageUri: 'https://www.hopkinsmedicine.org/-/media/images/health/1_-conditions/liver-gallbladder-and-pancreas/liver-health-teaser-image.jpg',
    title: 'Healthy Liver',
    unreadCount: 3
  },
]

export default function InterestsListScreen() {
  const uid = useAuthUserId()

  const [circles, setCircles] = useState<CircleType[]>([])
  const [refreshing, setRefreching] = useState<boolean>(false)
  const [interestPostData, setInterestPostData] = useState<InterestPostParams | null>(null)
  const [showOptionInterest, setShowOptionInterest] = useState<string>('')
  const [showCreateInterest, setShowCreateInterest] = useState<boolean>(false)

  const {data: interests, isFetching, refetch, fetchNextPage} = useFetchInterestPosts(uid || '', !!uid)

  useEffect(() => {
    setCircles(tempCircles)
  }, [])

  const onRefresh = async () => {
    setRefreching(true)
    await refetch().then((f) => {
      setRefreching(false)
    })
  }

  const onCloseModal = () => {
    showCreateInterest && setShowCreateInterest(false)
    setInterestPostData(null)
    setShowOptionInterest('')
  }

  return (
    <View className='bg-grey h-full'>
      <FlatList
        className='px-3 bg-grey'
        data={interests}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <ActionBar title='Hey, any interests on your mind..?' active={false} onPress={() => setShowCreateInterest(true)} />
            <FlatList
              data={circles}
              renderItem={({ item }) => <Circle {...item} />}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
            />
            <View className='mt-5 mb-4 flex items-end'>
              <BtnDetailed wrapperStyle={styles.btnDetailedWrapper} label={'Explore circles'} leftIcon={{name: IconNames.checkCircle, classNames: 'mt-[3px] ml-[3px]'}} onPress={() => {}} />
            </View>
          </>
        }
        renderItem={({ item }) => {
          const parsedItem = parseToInterestCardProps(item)
          return (
            <View className='mb-4'>
              <InterestCard uid={uid || ''} isOwner={parsedItem.createdBy.uid === uid} data={parsedItem} showOptionInterest={showOptionInterest} onOptionPress={() => setInterestPostData({id: parsedItem.id, interest: parsedItem.title, interestDesc: parsedItem.description, scheduledAt: parsedItem.scheduledAt, visibility: parsedItem.visibility})} setShowOptionInterest={setShowOptionInterest}  />
            </View>
          )
        }}
        ListFooterComponent={<Spacer height={60}/>}
        ListEmptyComponent={() => {
          return <>
            {isFetching && !interests && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
          </>
        }}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchNextPage()}
        onRefresh={onRefresh}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
      />
      <PostModal
        postType={PostType.interest}
        showModal={showCreateInterest || !!interestPostData}
        postParams={interestPostData || undefined}
        postHeaderData={{
          icon: IconNames.addPost,
          title: showCreateInterest? 'Publish an interest': 'Edit this interest'
        }}
        actionBarData={{ title: showCreateInterest? 'Hey, any interests on your mind..?': 'Hey, want to update your interest..?' }}
        onCancel={onCloseModal}
        setShowModal={onCloseModal}
      />
    </View>
  )
}
