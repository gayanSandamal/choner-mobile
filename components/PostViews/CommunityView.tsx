import { Btn, BtnDetailed, CharmBtn } from '@/components/Base/Button'
import Label from '@/components/Base/Label'
import { InterestCard } from '@/components/Common/InterestCard'
import { Colors } from '@/constants/Colors'
import { CommunityCardData, CommunityPostCategory, CommunityPostParams, FontTypes, IconNames, InputSizes, InterestCardData, InterestPostParams, JustifyContent, PostType } from '@/types/Components'
import { unescapePercent } from '@/utils/commonUtils'
import {router, useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, FlatList, TouchableWithoutFeedback, ScrollView, LayoutRectangle, Pressable } from 'react-native'
import { PostModal } from '../Post/Post'
import { BLURHASH, CommunityPostTypes } from '@/constants/values'
import { Image } from 'expo-image'
import { PostUserItem } from '../Common/PostUserItem'
import { PostOptions } from '../Common/PostOptions'
import Modal from '../Base/Modal'
import { useDeleteCommunityPost } from '@/hooks/mutate/useMutateCommunityPosts'
import { useRouteInfo } from 'expo-router/build/hooks'

const styles = StyleSheet.create({
  imageSmall: {width: '100%', aspectRatio: 1.5, borderRadius: 10, borderWidth: 3, marginTop: 10, borderColor: Colors.dark['grey-shade-3']},
  btnDetailedWrapper: {width: 120, height: 34, backgroundColor: Colors.dark['soundcloud-gdr-1'], borderRadius: 20, borderColor: Colors.dark['soundcloud-gdr-1'], paddingLeft: 15, paddingRight: 12, marginBottom: 0}
})

export default function CommunityView() {
  const optionsButtonRef = useRef<View>(null)
  
  const  routeInfo  = useRouteInfo()
  const  {data}  = useLocalSearchParams()

  const [postData, setPostData] = useState<CommunityCardData | null>(null)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [buttonPosition, setButtonPosition] = useState<LayoutRectangle | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showUpdate, setShowUpdate] = useState<boolean>(false)

  const {mutate: deletePost, isPending} = useDeleteCommunityPost(() => router.back(), () => {})

  useEffect(() => {
    const post = JSON.parse(data as string)
    const decodedPost = {
        ...post,
        createdUser: {
          ...post.createdUser,
          profileImageUrl: unescapePercent(post.createdUser.profileImageUrl)
        },
        imageUrls: {
          sm: unescapePercent(post?.imageUrls?.sm || ''),
          md: unescapePercent(post?.imageUrls?.md || ''),
          lg: unescapePercent(post?.imageUrls?.lg || '')
        }
      }
      setPostData(decodedPost)
  }, [])
  
  const onCloseModal = () => {
    setShowUpdate(false)
  }

  const measureButtonPosition = () => {
    optionsButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setButtonPosition({ x: pageX, y: pageY, width, height })
    })
  }
  
  const setOptionMenuY = () => {
    if (buttonPosition) {
      if (buttonPosition?.y < 200) {
        return 75
      } else {
        if (routeInfo.pathname === '/community-post') {
          return buttonPosition?.y - 65
        }
        return buttonPosition?.y - 120
      } 
    } else {
      return 100
    }
  }

  const onSuccessUpdate = (data: CommunityCardData) => {
    setPostData(data)
  }

  if (!postData) {
    return <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />
  }

  return (
    <>
      <PostModal
        postType={PostType.community}
        showModal={showUpdate}
        postParams={!!postData ? {
          id: postData.id,
          title: postData.title,
          type: postData.type as CommunityPostCategory.POST | CommunityPostCategory.QUESTION,
          imageUrls: postData.imageUrls,
          scheduledAt: postData.scheduledAt,
          visibility: postData.visibility
        }: undefined}
        postHeaderData={{
          icon: IconNames.addPost,
          title: `Edit this  ${postData.type === CommunityPostTypes[0]? 'Post': 'Question'}`
        }}
        actionBarData={{ title: `Hey, want to update your ${postData.type === CommunityPostTypes[0]? 'Post': 'Question'}..?` }}
        onCancel={onCloseModal}
        setShowModal={onCloseModal}
        onSuccess={onSuccessUpdate}
      />
      <ScrollView showsVerticalScrollIndicator={false} onTouchEnd={() => showOptions && setShowOptions(false)}>
        {showOptions && (
          <View style={{ position: 'absolute', top: setOptionMenuY(), right: 0, zIndex: 1}}>
            <PostOptions show={showOptions} styles={{bottom: 0, right: 0}} isOwner={!!postData?.isOwner} postVisibility={postData.visibility} onUpdate={() => setShowUpdate(true)} onDelete={() => setShowDeleteModal(true)} />
          </View>
        )}
        {postData.imageUrls.md && <Image source={postData?.imageUrls?.md} style={styles.imageSmall} contentFit={"cover"} placeholder={{ blurhash: BLURHASH[3] }} />}
        <Label classNames='mt-[10px]' type={FontTypes.FLabel} label={postData.title} color={Colors.dark['grey-shade-4']} />
        <View className='w-[100%] mt-[10px] flex flex-row justify-between' ref={optionsButtonRef} onLayout={measureButtonPosition}>
          <PostUserItem width={'max-w-[180px]'} userName={postData.createdUser.displayName} createdAt={postData.createdAt} />
          <BtnDetailed wrapperStyle={styles.btnDetailedWrapper} label={'FOLLOW'} fontType={FontTypes.FLabel} labelAlign={JustifyContent.center} leftIcon={{name: IconNames.plus, classNames: 'mt-[8px]'}} onPress={() => {}} />
          <CharmBtn frame icon={IconNames.options} onPress={() => setShowOptions(true)} size={InputSizes.md} />
        </View>
        <FlatList
          data={[{}]}
          removeClippedSubviews={true}
          scrollEnabled={false}
          ListHeaderComponent={() => (
            <>  
            </>
          )}
          renderItem={({}) => <></>}
        />
        <View className='w-full h-[200px]'/>
      </ScrollView>
      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <Label type={FontTypes.FTitle1} label={'Want to detete this community post?'} />
        <Label classNames="mt-5" type={FontTypes.FLabelBold} label={'Post data will be permanently removed!'} />
        <View className="mt-10 ml-0.5 mr-0.5 flex-row justify-between">
          <Btn outlined disabled={isPending} onPress={() => setShowDeleteModal(false)} icon={IconNames.cancel} size={InputSizes.md} color={Colors.light.white} label="Cancel" />
          <Btn isLoading={isPending} disabled={isPending} onPress={() => deletePost({uid: postData.createdUser.uid, id: postData.id, type: postData.type, visibility: postData.visibility})} icon={IconNames.save} size={InputSizes.md} backgroundColor={Colors.dark.red} label="Yes, Delete" />
        </View>
      </Modal>
    </>
  )
}
