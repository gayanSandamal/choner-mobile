import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavouritesScreen() {
  return (
    <SafeAreaView>
      <View className='flex h-full items-center justify-center'>
        <Text className='text-2xl font-bold'>Favourites Screen</Text>
      </View>
    </SafeAreaView>
  )
}
