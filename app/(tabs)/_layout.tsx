import { Tabs } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { IconName, IconNames } from '@/types/Components';
import Header from '@/components/Common/Header';
import { commonStyles } from '@/assets/styles/common';

export default function TabLayout() {
  const tabs: {
    name: string,
    title: string,
    icon: {
      name: IconName,
      link: string
    }
  }[] = [
      {
        name: 'index',
        title: 'choner',
        icon: {
          name: IconNames.insight,
          link: ''
        }
      },
      {
        name: 'community',
        title: 'Community',
        icon: {
          name: IconNames.handshake,
          link: 'community'
        }
      },
      {
        name: 'interests',
        title: 'Interests',
        icon: {
          name: IconNames.interests,
          link: 'interests'
        }
      },
      {
        name: 'video',
        title: 'Video',
        icon: {
          name: IconNames.play,
          link: 'video'
        }
      },
      {
        name: 'challenges',
        title: 'Challenges',
        icon: {
          name: IconNames.trophy,
          link: 'challenges'
        }
      },
    ]
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.grey }}>
      <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 12 }}>
        <Header />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: 0,
              marginBottom: 5,
              paddingBottom: 0,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              borderColor: 'black',
              borderRadius: 20,
              borderTopColor: Colors.dark.grey,
              height: 60,
              backgroundColor: Colors.dark.grey,
              ...commonStyles['shadow-md']
            }
          }}>
          {tabs.map(tab => {
            return (
              <Tabs.Screen
                name={tab.name}
                key={tab.name}
                options={{
                  title: tab.title,
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon icon={tab.icon.name} color={focused ? Colors.dark['primary-shade-1'] : Colors.dark.background} link={tab.icon.link} />
                  ),
                }}
              />
            )
          })}
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}
