import { router, Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { TabType } from '@/types/Components';
import Header from '@/components/Common/Header';
import { commonStyles } from '@/assets/styles/common';
import { tabs } from '@/constants/NavigationTabs';

const styles = StyleSheet.create({
  tab: {
    position: 'absolute',
    height: 60,
    paddingTop: 0,
    marginHorizontal: 10,
    marginBottom: 5,
    borderColor: 'black',
    flexDirection: 'row',
    borderRadius: 20,
    borderTopColor: Colors.dark.grey,
    backgroundColor: Colors.dark.grey,
  }
})

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.grey }}>
      <Header onPressAvatar={() => router.navigate('/profile')} />
      <Tabs
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
                href: Boolean(tab.hide) ? null : tab.icon.link as any,
                tabBarIcon: ({ focused }) => (
                  <View style={{marginTop: 20}}>
                    <TabBarIcon icon={tab.icon.name} color={focused ? Colors.dark['primary-shade-1'] : Colors.dark.background} link={tab.icon.link} />
                  </View>
                ),
              }}
            />
          )
        })}
      </Tabs>
    </SafeAreaView>
  );
}
