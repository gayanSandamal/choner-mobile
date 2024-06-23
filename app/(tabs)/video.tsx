import { Colors } from '@/constants/Colors'
import { View, Text } from 'react-native'

export default function VideoScreen() {
  return (
    <View className='flex h-full items-center justify-center' style={{ backgroundColor: Colors.dark.grey }}>
      <Text className='text-2xl font-bold text-white'>Video Screen</Text>
    </View>
  )
}
