import { Avatar } from '@/components/Base/Avatar'
import Indicator from '@/components/Base/Indicator'
import { Post } from '@/components/Post/Post'
import { ContentSection } from '@/components/Wrappers/Sections'
import { Colors } from '@/constants/Colors'
import { Circle, IconNames, InputSizes, PostTypeProps, PublishPostProps } from '@/types/Components'
import { useEffect, useState } from 'react'
import { FlatList, View, Text } from 'react-native' // Import the Text component from react-native
import { ScrollView } from 'react-native-virtualized-view'

export default function InterestsScreen() {
  const [circles, setCircles] = useState<Circle[]>([])

  const tempCircles: Circle[] = [
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
    }
  ]
  useEffect(() => {
    setCircles(tempCircles)
  }, [])
  const onPostTypePress = (item: PostTypeProps) => {
    alert(item)
  }
  const onPublish = (content: string) => {
    alert(content)
  }
  return (
    <ScrollView className='px-3'>
      <ContentSection classNames='mt-3' cardMode={false} slot={
        <Post
          onPostTypePress={onPostTypePress}
          publishPostData={{
            icon: IconNames.interests,
            title: 'Share Interests',
            placeholder: 'Write your interest',
            enableScheduling: true,
            cancelButtonProps: {
              label: 'Cancel',
            },
            submitButtonProps: {
              label: 'Share',
              onPress: onPublish
            }
          } as PostTypeProps}
          actionBarData={
            { title: 'Hey, any interests on your mind..?' }
          } />
      } />
      <FlatList
        data={circles}
        renderItem={({ item }) => <View style={{ marginRight: 20 }}>
          <Avatar img={item.imageUri} size={InputSizes.md} bgColor={Colors.dark['primary-material-1']} />
          <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Indicator>
              <Text className='text-xs text-white'>99+</Text>
            </Indicator>
          </View>
        </View>}
        keyExtractor={item => item.id.toString()} // Convert the id to a string
        horizontal={true}
      />
    </ScrollView >
  )
}
