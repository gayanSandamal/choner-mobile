import { BtnDetailed } from '@/components/Base/Button'
import { Spacer } from '@/components/Base/Spacer'
import { Circle } from '@/components/Common/Circle'
import { InterestCard } from '@/components/Common/InterestCard'
import { Post } from '@/components/Post/Post'
import { Colors } from '@/constants/Colors'
import { useFetchInterestPosts } from '@/hooks/get/useFetchInterestPosts'
import { useAuthUserId } from '@/hooks/useAuthUser'
import { Circle as CircleType, IconNames, PostType, PostTypeProps } from '@/types/Components'
import { parseToInterestCardProps } from '@/utils/commonUtils'
import { useEffect, useState } from 'react'
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

export default function InterestsScreen() {
  const uid = useAuthUserId()

  const [circles, setCircles] = useState<CircleType[]>([])
  const [refreshing, setRefreching] = useState<boolean>(false)

  const {data: interests, isFetching, refetch} = useFetchInterestPosts(uid || '', !!uid)

  useEffect(() => {
    setCircles(tempCircles)
  }, [])

  const onPostTypePress = (item: PostTypeProps) => {
    alert(item)
  }

  const onRefresh = async () => {
    setRefreching(true)
    await refetch().then((f) => {
      setRefreching(false)
    })
  }

  return (
      <FlatList
        className='px-3 bg-grey'
        data={interests}
        ListHeaderComponent={
          <>
            <Post
              postType={PostType.interest}
              onPostTypePress={onPostTypePress}
              postHeaderData={{
                icon: IconNames.addPost,
                title: 'Publish an interest'
              }}
              actionBarData={{ title: 'Hey, any interests on your mind..?' }}
            />
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
              <InterestCard data={parsedItem} />
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
        onRefresh={onRefresh}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
      />
  )
}
