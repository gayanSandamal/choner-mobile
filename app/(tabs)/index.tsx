import Card from '@/components/Base/Card';
import BaseGrid from '@/components/Base/Grids/BaseGrid';
import GridItem from '@/components/Base/Grids/GridItem';
import Greeting from '@/components/Insights/Greeting';
import { ContentSection } from '@/components/Wrappers/Sections';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  return (
    <ScrollView className='px-3'>
      {/* <View className='flex'> */}
      <ContentSection classNames='mt-3' cardMode={false} slot={
        <Greeting />
      } />
      <BaseGrid onFetchDimensions={setDimensions}>
        <GridItem columns={1} gridDimentions={dimensions}>
          <Card></Card>
        </GridItem>
        <GridItem columns={2} gridDimentions={dimensions}>
          <Card></Card>
        </GridItem>
        <GridItem columns={2} gridDimentions={dimensions}>
          <Card></Card>
        </GridItem>
        <GridItem columns={1} gridDimentions={dimensions}>
          <Card></Card>
        </GridItem>
        <GridItem columns={1} gridDimentions={dimensions}>
          <Card></Card>
        </GridItem>
        <GridItem columns={1} gridDimentions={dimensions}>
          <Card></Card>
        </GridItem>
      </BaseGrid>
      <StatusBar style="auto" />
      {/* </View> */}
    </ScrollView>
  );
}

export default HomeScreen;