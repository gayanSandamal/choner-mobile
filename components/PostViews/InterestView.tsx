import { BtnDetailed } from '@/components/Base/Button'
import Label from '@/components/Base/Label'
import { InterestCard } from '@/components/Common/InterestCard'
import { Colors } from '@/constants/Colors'
import { FontTypes, IconNames, InterestCardData, JustifyContent } from '@/types/Components'
import { unescapePercent } from '@/utils/commonUtils'
import {useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

const styles = StyleSheet.create({
  btnDetailedWrapper: {width: 140, backgroundColor: Colors.dark['soundcloud-gdr-1'], borderRadius: 20, borderColor: Colors.dark['soundcloud-gdr-1'], paddingLeft: 15, paddingRight: 12, marginBottom: 0}
})

export default function InterestView() {

  const  {data}  = useLocalSearchParams()

  const [postData, setPostData] = useState<InterestCardData | null>(null)

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

  if (!postData) {
    return <ActivityIndicator color={Colors.light.white} className='mt-20' size={40} />
  }

  return (
    <>
        <InterestCard disabled classNames='mt-2' data={postData} />
        <View className='flex-row items-center justify-between mt-5'>
            <Label label='Comments'/>
            <BtnDetailed wrapperStyle={styles.btnDetailedWrapper} label={'Form circle'} fontType={FontTypes.FLabelBold} labelAlign={JustifyContent.center} rightIcon={{name: IconNames.addCircle, classNames: 'mt-[3px]'}} onPress={() => {}} />
        </View>
    </>
  )
}
