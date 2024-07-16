import { Avatar } from '@/components/Base/Avatar'
import { Btn, CharmBtn } from '@/components/Base/Button'
import Icon from '@/components/Base/Icon'
import Label from '@/components/Base/Label'
import { Circle } from '@/components/Common/Circle'
import { InterestCard } from '@/components/Common/InterestCard'
import Greeting from '@/components/Insights/Greeting'
import { Post } from '@/components/Post/Post'
import { ContentSection } from '@/components/Wrappers/Sections'
import { Colors } from '@/constants/Colors'
import { Circle as CircleType, FontTypes, IconNames, InputSizes, InterestCardProps, PostTypeProps, PublishPostProps } from '@/types/Components'
import { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native' // Import the Text component from react-native
import { ScrollView } from 'react-native-virtualized-view'

export default function InterestsScreen() {
  const [circles, setCircles] = useState<CircleType[]>([])
  const [interests, setInterests] = useState<InterestCardProps[]>([])

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
    }
  ]

  const tempInterests: InterestCardProps[] = [
    {
      id: 1,
      title: `I'm interested in cycling on Fridays`,
      subtitle: `To improve cardiovascular health`,
      postedBy: {
        name: 'Clara Peterz',
        postedDate: 'May 09, 2024'
      },
      interestedCount: 101
    },
    {
      id: 2,
      title: `I'm interested in cycling on Fridays`,
      subtitle: `To improve cardiovascular health`,
      postedBy: {
        name: 'Clara Peterz',
        postedDate: 'May 09, 2024'
      },
      interestedCount: 101
    },
    {
      id: 3,
      title: `I'm interested in cycling on Fridays`,
      subtitle: `To improve cardiovascular health`,
      postedBy: {
        name: 'Clara Peterz',
        postedDate: 'May 09, 2024'
      },
      interestedCount: 101
    },
    {
      id: 4,
      title: `I'm interested in cycling on Fridays`,
      subtitle: `To improve cardiovascular health`,
      postedBy: {
        name: 'Clara Peterz',
        postedDate: 'May 09, 2024'
      },
      interestedCount: 101
    }
  ]

  useEffect(() => {
    setCircles(tempCircles)
    setInterests(tempInterests)
  }, [])
  const onPostTypePress = (item: PostTypeProps) => {
    alert(item)
  }
  const onPublish = (content: string) => {
    alert(content)
  }
  return (
    <ScrollView className='px-3'>
      <ContentSection classNames='mt-3' cardMode={false}>
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
      </ContentSection>
      <FlatList
        data={circles}
        renderItem={({ item }) => <Circle {...item} />}
        keyExtractor={item => item.id.toString()} // Convert the id to a string
        horizontal={true}
      />

      <ContentSection classNames='mt-8' containerStyles={{ paddingBottom: 60 }} cardMode={false}>
        {/* Interest card */}
        <FlatList
          data={interests}
          renderItem={({ item }) =>
            <View className='mb-4'>
              <InterestCard {...item} />
            </View>
          }
          keyExtractor={item => item.id.toString()} // Convert the id to a string
        />
      </ContentSection>
    </ScrollView >
  )
}
