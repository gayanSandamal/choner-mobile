import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.white,
        tabBarInactiveTintColor: Colors.dark.icon,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 10,
          right: 10,
          paddingTop: 0,
          paddingBottom: 0,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          borderColor: 'black',
          borderRadius: 20,
          height: 60,
          backgroundColor: Colors.dark.primary,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'bulb-outline'} color={focused ? Colors.dark.activeIcon : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'grid-outline'} color={focused ? Colors.dark.activeIcon : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'heart-outline'} color={focused ? Colors.dark.activeIcon : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'person-outline'} color={focused ? Colors.dark.activeIcon : color} />
          ),
        }}
      />
    </Tabs>
  );
}
