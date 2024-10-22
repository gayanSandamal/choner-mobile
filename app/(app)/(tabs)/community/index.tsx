import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View} from 'react-native'
import { CommunityPostParams, FontTypes, JustifyContent, PostType } from '@/types/Components'
import { ActionBar, PostModal } from '@/components/Post/Post'
import { useFetchCommunityPosts } from '@/hooks/get/useFetchCommunityPosts'
import { useAuthUserId } from '@/hooks/useAuthUser'
import { Spacer } from '@/components/Base/Spacer'
import { Colors } from '@/constants/Colors'
import { CommunityPostTypes } from '@/constants/values'
import { BtnDetailed } from '@/components/Base/Button'
import { useTabSelector } from '@/contexts/tabSelectorContext'
import { CommunityList } from '@/components/Common/CommunityList'

const styles = StyleSheet.create({
  wrapper: {flexDirection: 'row', width: '100%'},
  postListLeft: {flex: 1, marginRight: 5},
  postListRight: {flex: 1, marginLeft: 5},
  listTypeSelectBtn1: {width: 70, height: 36, paddingHorizontal: 10, marginRight: 10, borderRadius: 15, borderWidth: 0},
  listTypeSelectBtn2: {width: 96, height: 36, paddingHorizontal: 10, marginRight: 10, borderRadius: 15, borderWidth: 0}
})

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

  const setHeaderButtonColor = (index: number) => {
    return tabs?.tab === CommunityPostTypes[index]? Colors.dark['primary-material-1'] + '3A': Colors.dark['grey-shade-3'] + '2A'
  }

  const setHeaderButtonTextColor = (index: number) => {
    return tabs?.tab === CommunityPostTypes[index]? Colors.dark['primary-material-1']: Colors.dark['grey-shade-2']
  }

  return (
    <View className='bg-grey h-full'>
      <FlatList
        className='px-3 bg-grey'
        data={[{}]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <ActionBar title='Hey, any interests on your mind..?' active={false} onPress={() => setShowPostTypeSelect(true)} />
            <View className="flex flex-row mb-2">
              <BtnDetailed wrapperStyle={{...styles.listTypeSelectBtn1, backgroundColor: setHeaderButtonColor(0)}} labelAlign={JustifyContent.center} fontType={FontTypes.FLabel} label={"Posts"} labelColor={setHeaderButtonTextColor(0)} onPress={() => setTabs({tab: CommunityPostTypes[0]})} />
              <BtnDetailed wrapperStyle={{...styles.listTypeSelectBtn2, backgroundColor: setHeaderButtonColor(1)}} labelAlign={JustifyContent.center} fontType={FontTypes.FLabel} label={"Questions"} labelColor={setHeaderButtonTextColor(1)} onPress={() => setTabs({tab: CommunityPostTypes[1]})} />
            </View>
            {fetchingPosts && !communityPosts && <ActivityIndicator color={Colors.light.white} className='mt-20 mr-auto ml-auto' size={40} />}
          </>
        }
        renderItem={({}) => (<CommunityList communityPostList1={communityPostList1} communityPostList2={communityPostList2} />)}
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
