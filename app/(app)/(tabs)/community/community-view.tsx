import NavigateBack from '@/components/Common/NavigateBack'
import CommunityView from '@/components/PostViews/CommunityView'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { View } from 'react-native'

export default function CommunityViewScreen() {
  return (
    <View className={'px-3 h-full'} style={{backgroundColor: Colors.dark.grey}}>
      <NavigateBack label={''} navigate={() => router.back()} />
      <CommunityView />
    </View>
  )
}
