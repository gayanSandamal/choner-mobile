import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, View} from 'react-native'
import { CommunityPostParams, InputSizes, PostType } from '@/types/Components'
import { ActionBar, PostModal } from '@/components/Post/Post'
import { useFetchCommunityPosts } from '@/hooks/get/useFetchCommunityPosts'
import { useAuthUserId } from '@/hooks/useAuthUser'
import { Spacer } from '@/components/Base/Spacer'
import { Colors } from '@/constants/Colors'
import { CommunityPostTypes } from '@/constants/values'
import { Btn } from '@/components/Base/Button'
import { useTabSelector } from '@/contexts/tabSelectorContext'
import { CommunityList } from '@/components/Common/CommunityList'

export default function CommunityScreen() {
  const uid = useAuthUserId()
  const {tabs, setTabs} = useTabSelector()
  
  const [refreshing, setRefreching] = useState<boolean>(false)
  const [showPostTypeSelect, setShowPostTypeSelect] = useState<boolean>(false)
  const [communitytPostData, setCommunityPostData] = useState<CommunityPostParams | null>(null)
  
  const {
    data: communityPosts,
    isFetching: fetchingPosts,
    refetch: refetchPosts,
    fetchNextPage: fetchNextPosts
  } = useFetchCommunityPosts(uid || '', tabs?.tab || CommunityPostTypes[0], !!uid && !!tabs)


  useEffect(() => {
    !tabs && setTabs({tab: CommunityPostTypes[0]})
    !communityPosts && refetchPosts()
  }, [])

  const { communityPostList1, communityPostList2 } = useMemo(() => {
    const communityPostList1: any = []
    const communityPostList2: any = []
    
    if (!communityPosts) return { communityPostList1, communityPostList2}
    
    communityPosts.forEach((item, index) => {
      if (index % 2 === 0) {
        communityPostList1.push(item)
      } else {
        communityPostList2.push(item)
      }
    })

    return { communityPostList1, communityPostList2 }
  }, [communityPosts])

  const onRefresh = async () => {
    setRefreching(true)
    await refetchPosts().then(() => setRefreching(false))
  }

  const onCloseModal = () => {
    showPostTypeSelect && setShowPostTypeSelect(false)
    setCommunityPostData(null)
  }
 
  const setHeaderButtonBackgroundColor = (index: number) => {
    return tabs?.tab === CommunityPostTypes[index]? Colors.dark['soundcloud-gdr-1']: undefined
  }

  const setHeaderButtonTextColor = (index: number) => {
    return tabs?.tab !== CommunityPostTypes[index]? Colors.dark['primary-shade-2']: undefined
  }

  return (
    <View className='bg-grey h-full'>
      <FlatList
        className='px-3 bg-grey'
        data={[{}]}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <ActionBar title='Share your story...' active={false} onPress={() => setShowPostTypeSelect(true)} />
            <View className="flex flex-row mb-2">
              <Btn size={InputSizes.md} outlined={!!setHeaderButtonTextColor(0)} label="POSTS" color={setHeaderButtonTextColor(0)} backgroundColor={setHeaderButtonBackgroundColor(0)} wrapperClasses='mr-2 mb-2' onPress={() => setTabs({tab: CommunityPostTypes[0]})} />
              <Btn size={InputSizes.md} outlined={!!setHeaderButtonTextColor(1)} label="QUESTIONS" color={setHeaderButtonTextColor(1)} backgroundColor={setHeaderButtonBackgroundColor(1)} wrapperClasses='mr-2 mb-2' onPress={() => setTabs({tab: CommunityPostTypes[1]})} />
            </View>
            {fetchingPosts && !communityPosts && <ActivityIndicator color={Colors.light.white} className='mt-20 mr-auto ml-auto' size={40} />}
          </>
        }
        renderItem={({}) => (<CommunityList uid={uid || ''} communityPostList1={communityPostList1} communityPostList2={communityPostList2} />)}
        ListFooterComponent={<Spacer height={60} />}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchNextPosts()}
        onRefresh={onRefresh}
      />
      <PostModal
        postType={PostType.community}
        showModal={showPostTypeSelect}
        postParams={communitytPostData ? {
          id: communitytPostData.id,
          imageUrls: communitytPostData.imageUrls,
          title: communitytPostData.title,
          scheduledAt: communitytPostData.scheduledAt,
          type: communitytPostData.type,
          visibility: communitytPostData.visibility
        } : undefined}
        actionBarData={{ title: 'Share your story...' }}
        onCancel={onCloseModal}
        setShowModal={onCloseModal}
      />
    </View>
  )
}
