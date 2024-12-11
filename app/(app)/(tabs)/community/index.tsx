import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, View, StyleSheet } from 'react-native'
import { CommunityPostParams, FontTypes, InputSizes, PostType } from '@/types/Components'
import { ActionBar, PostModal } from '@/components/Post/Post'
import { useFetchCommunityPosts } from '@/hooks/get/useFetchCommunityPosts'
import { useAuthUserId } from '@/hooks/useAuthUser'
import { Spacer } from '@/components/Base/Spacer'
import { Colors } from '@/constants/Colors'
import { CommunityPostTypes } from '@/constants/values'
import { Btn } from '@/components/Base/Button'
import { useTabSelector } from '@/contexts/tabSelectorContext'
import { CommunityPostCard } from '@/components/Common/CommunityPostCard'
import Label from '@/components/Base/Label'

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.grey },
  actionContainer: { marginBottom: 10, flexDirection: 'row' },
  loader: { marginTop: 20, alignSelf: 'center' },
  flatList: { paddingHorizontal: 12 },
})

export default function CommunityScreen() {
  const uid = useAuthUserId()
  const { tabs, setTabs } = useTabSelector()

  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [showPostTypeSelect, setShowPostTypeSelect] = useState<boolean>(false)
  const [communityPostData, setCommunityPostData] = useState<CommunityPostParams | null>(null)

  const {
    data: communityPosts,
    isFetching: fetchingPosts,
    refetch: refetchPosts,
    fetchNextPage: fetchNextPosts,
  } = useFetchCommunityPosts(uid || '', tabs?.tab || CommunityPostTypes[0], !!uid && !!tabs)

  useEffect(() => {
    if (!tabs) setTabs({ tab: CommunityPostTypes[0] })
    if (!communityPosts) refetchPosts()
  }, [tabs, communityPosts, refetchPosts, setTabs])

  const { communityPostList1, communityPostList2 } = useMemo(() => {
    const communityPostList1: any[] = []
    const communityPostList2: any[] = []

    if (!communityPosts) return { communityPostList1, communityPostList2 }

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
    setRefreshing(true)
    await refetchPosts()
    setRefreshing(false)
  }

  const onCloseModal = () => {
    setShowPostTypeSelect(false)
    setCommunityPostData(null)
  }

  const setHeaderButtonBackgroundColor = (index: number) =>
    tabs?.tab === CommunityPostTypes[index] ? Colors.dark['soundcloud-gdr-1'] : undefined

  const setHeaderButtonTextColor = (index: number) =>
    tabs?.tab !== CommunityPostTypes[index] ? Colors.dark['primary-shade-2'] : undefined

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={communityPosts || []}
        keyExtractor={(_item, index) => `community-post-${index}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={
          <>
            <ActionBar
              title='Share your story...'
              active={false}
              onPress={() => setShowPostTypeSelect(true)}
            />
            <View style={styles.actionContainer}>
              {CommunityPostTypes?.map((type, index) => (
                <Btn
                  key={`tab-btn-${index}`}
                  size={InputSizes.md}
                  outlined={!!setHeaderButtonTextColor(index)}
                  label={type === CommunityPostTypes[0] ? 'POSTS' : 'QUESTIONS'}
                  color={setHeaderButtonTextColor(index)}
                  backgroundColor={setHeaderButtonBackgroundColor(index)}
                  wrapperClasses='mr-2 mb-2'
                  onPress={() => setTabs({ tab: type })}
                />
              ))}
            </View>
            {fetchingPosts && (
              <ActivityIndicator color={Colors.light.white} style={{ ...styles.loader, height: 400 }} size={40} />
            )}
            {!fetchingPosts && (!communityPosts || communityPosts.length === 0) && (
              <Label
                label={`No ${tabs?.tab} available at the moment. Try sharing a ${tabs?.tab}!`}
                type={FontTypes.FLabel}
                containerStyles={{ ...styles.loader, marginTop: 200, textAlign: 'center', paddingHorizontal: 30 }}
              />
            )}
          </>
        }
        renderItem={({ item: parsedData, index }) => (
          <CommunityPostCard key={index} data={parsedData} uid={uid} cols={2} />
        )}
        ListFooterComponent={<Spacer height={60} />}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchNextPosts}
        onRefresh={onRefresh}
      />
      <PostModal
        postType={PostType.community}
        showModal={showPostTypeSelect}
        postParams={
          communityPostData
            ? {
              id: communityPostData.id,
              imageUrls: communityPostData.imageUrls,
              title: communityPostData.title,
              scheduledAt: communityPostData.scheduledAt,
              type: communityPostData.type,
              visibility: communityPostData.visibility,
            }
            : undefined
        }
        actionBarData={{ title: 'Share your story...' }}
        onCancel={onCloseModal}
        setShowModal={onCloseModal}
      />
    </View>
  )
}
