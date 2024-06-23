import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text } from 'react-native'

const HomeScreen = () => {
  return (
    <View className='flex h-full items-center justify-center' style={{ backgroundColor: Colors.dark.grey }}>
      <Text className='text-2xl font-bold text-white'>Insights Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default HomeScreen;