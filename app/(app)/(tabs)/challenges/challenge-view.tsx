import NavigateBack from '@/components/Common/NavigateBack'
import ChallengeView from '@/components/PostViews/ChallengeView'
import { router } from 'expo-router'
import { View } from 'react-native'

function ChallengeViewPage() {
  return (
    <View className={'px-3 bg-grey h-full'}>
      <NavigateBack label={''} navigate={() => router.back()} />
      <ChallengeView />
    </View>
  )
}

export default ChallengeViewPage
