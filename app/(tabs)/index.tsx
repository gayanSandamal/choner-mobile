import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text } from 'react-native'

const HomeScreen = () => {
  return (
    <View className='flex h-full items-center justify-center'>
      <Text className='text-2xl font-bold'>Insights Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default HomeScreen;