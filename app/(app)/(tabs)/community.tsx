import { useState } from 'react'
import { FlatList} from 'react-native'
import { CommunityPostParams, PostType } from '@/types/Components'
import { ActionBar, PostModal } from '@/components/Post/Post'

export default function CommunityScreen() {

  const [refreshing, setRefreching] = useState<boolean>(false)
  const [showPostTypeSelect, setShowPostTypeSelect] = useState<boolean>(false)
  const [communitytPostData, setCommunityPostData] = useState<CommunityPostParams | null>(null)
  const [showOptionCommunity, setShowOptionInterest] = useState<string>('')
  
  const onCloseModal = () => {
    showPostTypeSelect && setShowPostTypeSelect(false)
    setCommunityPostData(null)
    setShowOptionInterest('')
  }

  return (
    <FlatList
        className='px-3 bg-grey'
        data={[{}]}
        ListHeaderComponent={
          <>
            <ActionBar title='Share your story...' active={false} onPress={() => setShowPostTypeSelect(true)} />
            <PostModal
              postType={PostType.community}
              showModal={showPostTypeSelect}
              postParams={communitytPostData ? {
                id: communitytPostData.id,
                imageUrl: communitytPostData.imageUrl,
                description: communitytPostData.description,
                scheduledAt: communitytPostData.scheduledAt,
                type: communitytPostData.type,
                visibility: communitytPostData.visibility
              } : undefined}
              actionBarData={{ title: 'Share your story...' }}
              onCancel={onCloseModal}
              setShowModal={onCloseModal}
            />
          </>
        }
        renderItem={({}) => <></>}
      />
  )
}
