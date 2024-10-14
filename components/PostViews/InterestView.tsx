import { BtnDetailed } from '@/components/Base/Button'
import Label from '@/components/Base/Label'
import { InterestCard } from '@/components/Common/InterestCard'
import { Colors } from '@/constants/Colors'
import { FontTypes, IconNames, InterestCardData, InterestPostParams, JustifyContent, PostType } from '@/types/Components'
import { unescapePercent } from '@/utils/commonUtils'
import {router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { PostModal } from '../Post/Post'

const styles = StyleSheet.create({
  btnDetailedWrapper: {width: 140, backgroundColor: Colors.dark['soundcloud-gdr-1'], borderRadius: 20, borderColor: Colors.dark['soundcloud-gdr-1'], paddingLeft: 15, paddingRight: 12, marginBottom: 0}
})

export default function InterestView() {

  const  {data}  = useLocalSearchParams()

  const [postData, setPostData] = useState<InterestCardData | null>(null)
  const [interestPostData, setInterestPostData] = useState<InterestPostParams | null>(null)
  const [showOptionInterest, setShowOptionInterest] = useState<string>('')

  useEffect(() => {
    const interest = JSON.parse(data as string)
    const decodedInterest = {
        ...interest,
        createdUser: {
          ...interest.createdUser,
          profileImageUrl: unescapePercent(interest.createdUser.profileImageUrl)
        }
      }
      setPostData(decodedInterest)
  }, [data])
  
  const onCloseModal = () => {
    setInterestPostData(null)
    setShowOptionInterest('')
  }

  if (!postData) {
    return <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />
  }

  return (
    <>
      <PostModal
        postType={PostType.interest}
        showModal={!!interestPostData}
        postParams={interestPostData ? {
          id: interestPostData.id,
          interest: interestPostData.interest,
          interestDesc: interestPostData.interestDesc,
          scheduledAt: interestPostData.scheduledAt,
          visibility: interestPostData.visibility
        }: undefined}
        postHeaderData={{
          icon: IconNames.addPost,
          title: 'Edit this interest'
        }}
        actionBarData={{ title: 'Hey, want to update your interest..?' }}
        onCancel={onCloseModal}
        setShowModal={onCloseModal}
      />
      <InterestCard disabled isOwner={postData.isOwner} classNames='mt-2' data={postData} showOptionInterest={showOptionInterest} navigationPath="/interest" onOptionPress={() => setInterestPostData({id: postData.id, interest: postData.title, interestDesc: postData.description, scheduledAt: postData.scheduledAt, visibility: postData.visibility})} setShowOptionInterest={setShowOptionInterest} onDelete={() => router.back()} />
      <View className='flex-row items-center justify-between mt-5'>
          <Label label='Comments'/>
          <BtnDetailed wrapperStyle={styles.btnDetailedWrapper} label={'Form circle'} fontType={FontTypes.FLabelBold} labelAlign={JustifyContent.center} rightIcon={{name: IconNames.addCircle, classNames: 'mt-[3px]'}} onPress={() => {}} />
      </View>
    </>
  )
}
