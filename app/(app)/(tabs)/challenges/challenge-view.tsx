import NavigateBack from '@/components/Common/NavigateBack'
import ChallengeView from '@/components/PostViews/ChallengeView'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { View } from 'react-native'

function ChallengeViewPage() {
  return (
    <View className={'px-3 h-full'} style={{backgroundColor: Colors.dark.grey}}>
      <NavigateBack label={''} navigate={() => router.back()} />
      <ChallengeView />
    </View>
  )
}

export default ChallengeViewPage
