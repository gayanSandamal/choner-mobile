import { Tabs } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { IconNames } from '@/types/Components';
import Header from '@/components/Common/Header';
// import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 12 }}>
      <Header />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors.dark.background,
            tabBarInactiveTintColor: Colors.dark.icon,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              paddingTop: 0,
              paddingBottom: 0,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              borderColor: 'black',
              borderRadius: 20,
              height: 60,
              backgroundColor: Colors.dark.grey,
            }
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon icon={IconNames.insight} color={focused ? Colors.dark['primary-shade-1'] : Colors.dark.background} link="" />
              ),
            }}
          />
          <Tabs.Screen
            name="community"
            options={{
              title: 'Community',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon icon={IconNames.handshake} color={focused ? Colors.dark['primary-shade-1'] : Colors.dark.background} link="community" />
              ),
            }}
          />
          <Tabs.Screen
            name="interests"
            options={{
              title: 'Interests',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon icon={IconNames.interests} color={focused ? Colors.dark['primary-shade-1'] : Colors.dark.background} link="interests" />
              ),
            }}
          />
          <Tabs.Screen
            name="video"
            options={{
              title: 'Video',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon icon={IconNames.play} color={focused ? Colors.dark['primary-shade-1'] : Colors.dark.background} link="video" />
              ),
            }}
          />
          <Tabs.Screen
            name="challenges"
            options={{
              title: 'Challenges',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon icon={IconNames.trophy} color={focused ? Colors.dark['primary-shade-1'] : Colors.dark.background} link="challenges" />
              ),
            }}
          />
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}
