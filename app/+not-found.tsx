
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function NotFoundScreen() {
  return (
    <SafeAreaView>
      <View className='flex h-full items-center justify-center'>
        <Text className='text-2xl font-bold'>Page Not Found</Text>
      </View>
    </SafeAreaView>
  );
}
