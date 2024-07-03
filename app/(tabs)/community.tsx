import { Post } from '@/components/Post/Post'
import { ContentSection } from '@/components/Wrappers/Sections'
import { IconNames, PostTypeProps, PublishPostProps } from '@/types/Components'
import { ScrollView } from 'react-native'

export default function CommunityScreen() {
  const onPostTypePress = (item: PostTypeProps) => {
    alert(item)
  }
  const onPublish = (content: string) => {
    alert(content)
  }
  const postTypes: PostTypeProps[] = [
    {
      icon: IconNames.addPost,
      subtitle: 'Share your thoughts, ideas & tips with your followers',
      title: 'Publish Post',
      placeholder: 'Enter your thoughts...',
      enableScheduling: true,
      cancelButtonProps: {
        label: 'Cancel',
      },
      submitButtonProps: {
        label: 'Share',
        onPress: onPublish
      }
    },
    {
      icon: IconNames.qanda,
      title: 'Need an answer?',
      subtitle: 'Get help from your audience by publishing your question',
      placeholder: 'Ask your question...',
      enableScheduling: true,
      cancelButtonProps: {
        label: 'Cancel',
      },
      submitButtonProps: {
        label: 'Ask',
        onPress: onPublish
      }
    },
  ]
  return (
    <ScrollView className='px-3'>
      <ContentSection classNames='mt-3' cardMode={false} slot={
        <Post
          list={postTypes}
          onPostTypePress={onPostTypePress}
          actionBarData={
            { title: 'Share your story...' }
          } />
      } />
    </ScrollView>
  )
}
