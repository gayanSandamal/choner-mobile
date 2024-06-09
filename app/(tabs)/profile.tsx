import { View, Text, Alert, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useConnectedInputs } from 'react-native-connected-inputs'

export default function ProfileScreen() {
  const handleFormSubmit = () => {
    Alert.alert('Form Submitted');
  };

  const connectInput = useConnectedInputs(handleFormSubmit);
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View className='flex h-full items-center justify-center px-4'>
          <Text className='text-2xl font-bold mb-20'>react-native-connected-inputs</Text>
          <TextInput className='w-full py-6 px-4 border-gray-700 bg-white border-2 rounded-md mb-4' placeholder="First Input" {...connectInput(0)} />
          <TextInput className='w-full py-6 px-4 border-gray-700 bg-white border-2 rounded-md mb-4' placeholder="Second Input" {...connectInput(1)} />
          <TextInput className='w-full py-6 px-4 border-gray-700 bg-white border-2 rounded-md mb-4' placeholder="Third Input" {...connectInput(2)} />
          <TextInput className='w-full py-6 px-4 border-gray-700 bg-white border-2 rounded-md mb-4' placeholder="Forth Input" {...connectInput(3)} />
          <TextInput className='w-full py-6 px-4 border-gray-700 bg-white border-2 rounded-md mb-4' placeholder="Fifth Input" {...connectInput(4)} />
          <TextInput className='w-full py-6 px-4 border-gray-700 bg-white border-2 rounded-md mb-4' placeholder="Sixth Input" {...connectInput(5)} />
          <TextInput className='w-full py-6 px-4 border-gray-700 bg-white border-2 rounded-md mb-4' placeholder="Seventh Input" {...connectInput(6)} />
          <TextInput className='w-full py-6 px-4 border-gray-700 bg-white border-2 rounded-md mb-4' placeholder="Nineth Input" {...connectInput(7)} />
          <TextInput className='w-full py-6 px-4 border-gray-700 bg-white border-2 rounded-md mb-4' placeholder="Tenth Input" {...connectInput(8)} />
          <TextInput className='w-full py-6 px-4 border-gray-700 bg-white border-2 rounded-md mb-4' placeholder="Eleventh Input" {...connectInput(9)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
