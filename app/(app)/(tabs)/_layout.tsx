import { router, Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { TabType } from '@/types/Components';
import Header from '@/components/Common/Header';
import { commonStyles } from '@/assets/styles/common';
import { tabs } from '@/constants/NavigationTabs';

const styles = StyleSheet.create({
  tab: {
    position: 'static',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 0,
    marginHorizontal: 12,
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
  }
})

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.grey }}>
      <Header onPressAvatar={() => router.navigate('/profile')} />
      <Tabs
        sceneContainerStyle={{ backgroundColor: Colors.dark.grey }}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            ...styles.tab,
            ...commonStyles['shadow-md'],
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
    </SafeAreaView>
  );
}
