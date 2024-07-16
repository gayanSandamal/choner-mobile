import BaseGrid from '@/components/Base/Grids/BaseGrid';
import GridItem from '@/components/Base/Grids/GridItem';
import { Spacer } from '@/components/Base/Spacer';
import Greeting from '@/components/Insights/Greeting';
import ChallengesWidget from '@/components/Widgets/ChallengesWidget';
import DiagnosisWidget from '@/components/Widgets/DiagnosisWidget';
import InterestsWidget from '@/components/Widgets/InterestsWidget';
import SurveyWidget from '@/components/Widgets/SurveyWidget';
import { ContentSection } from '@/components/Wrappers/Sections';
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  return (
    <ScrollView className='px-3'>
      {/* <View className='flex'> */}
      <ContentSection classNames='mt-3' cardMode={false}>
        <Greeting />
      </ContentSection>
      <BaseGrid onFetchDimensions={setDimensions}>
        <GridItem columns={1} gridDimentions={dimensions}>
          <ChallengesWidget />
        </GridItem>
        <GridItem columns={2} gridDimentions={dimensions}>
          <SurveyWidget />
        </GridItem>
        <GridItem columns={2} gridDimentions={dimensions}>
          <InterestsWidget />
        </GridItem>
        <GridItem columns={1} gridDimentions={dimensions}>
          <DiagnosisWidget />
        </GridItem>
        {/* <GridItem columns={1} gridDimentions={dimensions}>
          <Card></Card>
        </GridItem>
        <GridItem columns={1} gridDimentions={dimensions}>
          <Card></Card>
        </GridItem> */}
      </BaseGrid>
      <Spacer height={80} />
      <StatusBar style="auto" />
      {/* </View> */}
    </ScrollView>
  );
}

export default HomeScreen;