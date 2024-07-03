import { Post } from '@/components/Post/Post'
import { ContentSection } from '@/components/Wrappers/Sections'
import { IconNames, PostTypeProps, PublishPostProps } from '@/types/Components'
import { ScrollView } from 'react-native'

export default function InterestsScreen() {
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
    </ScrollView>
  )
}
