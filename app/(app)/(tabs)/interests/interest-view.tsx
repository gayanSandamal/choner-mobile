import { BtnDetailed } from '@/components/Base/Button'
import Label from '@/components/Base/Label'
import { InterestCard } from '@/components/Common/InterestCard'
import NavigateBack from '@/components/Common/NavigateBack'
import { Colors } from '@/constants/Colors'
import { FontTypes, IconNames, JustifyContent } from '@/types/Components'
import { router, useLocalSearchParams } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'

const styles = StyleSheet.create({
  btnDetailedWrapper: {width: 140, backgroundColor: Colors.dark['soundcloud-gdr-1'], borderRadius: 20, borderColor: Colors.dark['soundcloud-gdr-1'], paddingLeft: 15, paddingRight: 12, marginBottom: 0}
})

export default function InterestScreen() {

  const  {data}  = useLocalSearchParams()

  const interest = JSON.parse(data as string)

  return (
    <ScrollView className={'px-3 bg-grey'}>
      <NavigateBack label={''} navigate={() => router.back()} />
      <InterestCard disabled classNames='mt-2' data={interest} />
      <View className='flex-row items-center justify-between mt-5'>
        <Label label='Comments'/>
        <BtnDetailed wrapperStyle={styles.btnDetailedWrapper} label={'Form circle'} fontType={FontTypes.FLabelBold} labelAlign={JustifyContent.center} rightIcon={{name: IconNames.addCircle, classNames: 'mt-[3px]'}} onPress={() => {}} />
      </View>
    </ScrollView >
  )
}
