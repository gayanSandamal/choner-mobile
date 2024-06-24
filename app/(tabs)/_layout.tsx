import { Tabs } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { TabType } from '@/types/Components';
import Header from '@/components/Common/Header';
import { commonStyles } from '@/assets/styles/common';
import { tabs } from '@/constants/NavigationTabs';

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.grey }}>
      <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 12 }}>
        <Header />
        <Tabs
          sceneContainerStyle={{ backgroundColor: Colors.dark.grey }}
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
          {tabs.map((tab: TabType, key) => {
            return (
              <Tabs.Screen
                name={tab.name}
                {...{ key }}
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
