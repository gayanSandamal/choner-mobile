import NavigateBack from '@/components/Common/NavigateBack'
import CommunityView from '@/components/PostViews/CommunityView'
import { router } from 'expo-router'
import { View } from 'react-native'

export default function CommunityViewScreen() {
  return (
    <View className={'px-3 bg-grey h-full'}>
      <NavigateBack label={''} navigate={() => router.back()} />
      <CommunityView />
    </View>
  )
}
