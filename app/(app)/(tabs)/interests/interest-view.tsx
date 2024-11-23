import NavigateBack from '@/components/Common/NavigateBack'
import InterestView from '@/components/PostViews/InterestView'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { ScrollView } from 'react-native'

export default function InterestScreen() {
  return (
    <ScrollView className={'px-3'} style={{backgroundColor: Colors.dark.grey}}>
      <NavigateBack label={''} navigate={() => router.back()} />
      <InterestView />
    </ScrollView>
  )
}
