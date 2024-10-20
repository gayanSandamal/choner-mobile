import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View} from 'react-native'
import { CommunityPostParams, FontTypes, JustifyContent, PostType } from '@/types/Components'
import { ActionBar, PostModal } from '@/components/Post/Post'
import { useFetchCommunityPosts } from '@/hooks/get/useFetchCommunityPosts'
import { useAuthUserId } from '@/hooks/useAuthUser'
import { Spacer } from '@/components/Base/Spacer'
import { Colors } from '@/constants/Colors'
import { parseToCommunityCardProps } from '@/utils/commonUtils'
import { CommunityPostTypes } from '@/constants/values'
import { CommunityPostCard } from '@/components/Common/CommunityPostCard'
import { BtnDetailed } from '@/components/Base/Button'

const styles = StyleSheet.create({
  wrapper: {flexDirection: 'row', width: '100%'},
  postListLeft: {flex: 1, marginRight: 5},
  postListRight: {flex: 1, marginLeft: 5},
  listTypeSelectBtn1: {width: 70, height: 36, paddingHorizontal: 10, marginRight: 15, borderRadius: 15, borderWidth: 0},
  listTypeSelectBtn2: {width: 96, height: 36, paddingHorizontal: 10, marginRight: 15, borderRadius: 15, borderWidth: 0}
})

export default function CommunityScreen() {
  const uid = useAuthUserId()

  const listTypeRef = useRef<string>(CommunityPostTypes[0])
  
  const [refreshing, setRefreching] = useState<boolean>(false)
  const [showPostTypeSelect, setShowPostTypeSelect] = useState<boolean>(false)
  const [communitytPostData, setCommunityPostData] = useState<CommunityPostParams | null>(null)
  const [selectedListType, setSelectedListType] = useState<string | null>(listTypeRef.current)
  
  const {
    data: communityPosts,
    isFetching: fetchingPosts,
    refetch: refetchPosts,
    fetchNextPage: fetchNextPosts
  } = useFetchCommunityPosts(false,  uid || '',CommunityPostTypes[0], !!uid)
  
  const {
    data: communityQuestions,
    isFetching: fetchingQuestions,
    refetch: refetchQuestions,
    fetchNextPage: fetchNextQuestions
  } = useFetchCommunityPosts(false,  uid || '', CommunityPostTypes[1], !!uid)

  useEffect(() => {
    setSelectedListType(listTypeRef.current)
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

  const { communityQuestionList1, communityQuestionList2 } = useMemo(() => {
    const communityQuestionList1: any = []
    const communityQuestionList2: any = []
    
    if (!communityQuestions) return { communityQuestionList1, communityQuestionList2}
    
    communityQuestions.forEach((item, index) => {
      if (index % 2 === 0) {
        communityQuestionList1.push(item)
      } else {
        communityQuestionList2.push(item)
      }
    })

    return { communityQuestionList1, communityQuestionList2 }
  }, [communityQuestions])
  
  const handleListTypeChange = useCallback((type: string) => {
    listTypeRef.current = type
    setSelectedListType(type)
  }, [])

  const onRefresh = async () => {
    setRefreching(true)
    
    if (selectedListType === CommunityPostTypes[0]) {
      await refetchPosts().then(() => setRefreching(false))
      return
    }
    await refetchQuestions().then(() => setRefreching(false))
  }

  const onCloseModal = () => {
    showPostTypeSelect && setShowPostTypeSelect(false)
    setCommunityPostData(null)
  }

  const setHeaderButtonColor = (index: number) => {
    return selectedListType === CommunityPostTypes[index]? Colors.dark['primary-shade-1'] + '5A': Colors.dark['primary-material-1'] + '2A'
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
              <BtnDetailed wrapperStyle={{...styles.listTypeSelectBtn1, backgroundColor: setHeaderButtonColor(0)}} labelAlign={JustifyContent.center} fontType={FontTypes.FLabel} label={"Posts"} labelColor={Colors.dark['primary-material-1']} onPress={() => handleListTypeChange(CommunityPostTypes[0])} />
              <BtnDetailed wrapperStyle={{...styles.listTypeSelectBtn2, backgroundColor: setHeaderButtonColor(1)}} labelAlign={JustifyContent.center} fontType={FontTypes.FLabel} label={"Questions"} labelColor={Colors.dark['primary-material-1']} onPress={() => handleListTypeChange(CommunityPostTypes[1])} />
            </View>
          </>
        }
        renderItem={({}) => (
          <View style={styles.wrapper}>
            <FlatList
              style={styles.postListLeft}
              data={selectedListType === CommunityPostTypes[0]? communityPostList1: communityQuestionList1}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                const parsedData = parseToCommunityCardProps(item)
                return <CommunityPostCard image={parsedData.imageUrls.sm} title={parsedData.title} createdUser={parsedData.createdUser} createdAt={parsedData.createdAt} />
              }}
              keyExtractor={(item, index) => `${item?.id}-${index}`}
            />
            <FlatList
              style={styles.postListRight}
              data={selectedListType === CommunityPostTypes[0]? communityPostList2: communityQuestionList2}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                const parsedData = parseToCommunityCardProps(item)
                return <CommunityPostCard image={parsedData.imageUrls.sm} title={parsedData.title} createdUser={parsedData.createdUser} createdAt={parsedData.createdAt} />
              }}
              keyExtractor={(item, index) => `${item?.id}-${index}`}
            />
          </View>
        )}
        ListFooterComponent={<Spacer height={60}/>}
        ListEmptyComponent={() => {
          return <>
            {selectedListType === CommunityPostTypes[0] && ((fetchingPosts && !communityPosts) || (communityPosts && communityPosts?.length > 0 && communityPostList1.length === 0 && communityPostList2 === 0)) && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
            {selectedListType === CommunityPostTypes[1] && ((fetchingQuestions && !communityQuestions) || (communityQuestions && communityQuestions?.length > 0 && communityQuestionList1.length === 0 && communityQuestionList2 === 0)) && <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />}
          </>
        }}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={() => selectedListType === CommunityPostTypes[0]? fetchNextPosts(): fetchNextQuestions()}
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
