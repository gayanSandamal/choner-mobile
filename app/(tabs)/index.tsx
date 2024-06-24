import Greeting from '@/components/Insights/Greeting';
import { ContentSection } from '@/components/Wrappers/Sections';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text } from 'react-native'

const HomeScreen = () => {
  return (
    <View className='flex'>
      <ContentSection classNames='mt-3' cardMode={false} slot={
        <Greeting />
      } />
      <StatusBar style="auto" />
    </View>
  );
}

export default HomeScreen;