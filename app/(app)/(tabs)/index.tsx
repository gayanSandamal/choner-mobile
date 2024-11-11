import { Btn } from '@/components/Base/Button';
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
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useAuthUserId } from '@/hooks/useAuthUser';
import { useUser } from '@/contexts/userContext';
import { useGetUser } from '@/hooks/get/useUser';
import { router } from 'expo-router';
import { InterestAutoSlider } from '@/components/AutoSliders/InterestsAutoSlider';
import { CommunityPostsAutoSlider } from '@/components/AutoSliders/CommunityPostsAutoSlider';
import { CommunityPostTypes } from '@/constants/values';

const HomeScreen = () => {
  const userId = useAuthUserId()

  const {setUser} = useUser()
  
  // This cause grid dimentions to transform from 0 -> full. Creating a transform effect in the initial grid render
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const {data: fetchedUser, refetch: fetchUser} = useGetUser(userId || '', false)

    useEffect(() => {
      if (fetchedUser) {
        setUser(fetchedUser)
        if (!fetchedUser?.displayName) {
          router.navigate('/basic-info')
        }
      }
    }, [fetchedUser])

    useEffect(() => {
      if (userId) {
        fetchUser()
      }
    }, [userId])

    const handleSetDimensions = useCallback((newDimensions: {width: number, height: number}) => {
      setDimensions(newDimensions)
    }, [])

  return (
    <ScrollView className='px-3'>
      <ContentSection classNames='mt-3' cardMode={false}>
        <Greeting />
      </ContentSection>
      <BaseGrid onFetchDimensions={handleSetDimensions}>
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
          <InterestAutoSlider interval={3000} />
        </GridItem>
        <GridItem columns={2} gridDimentions={dimensions}>
          <CommunityPostsAutoSlider communityPostType={CommunityPostTypes[0]} interval={3000} />
        </GridItem>
        <GridItem columns={2} gridDimentions={dimensions}>
          <CommunityPostsAutoSlider communityPostType={CommunityPostTypes[1]} interval={3000} />
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
    </ScrollView>
  );
}

export default HomeScreen;