import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SectionProps } from '@/types/Components';

const styles = StyleSheet.create({
  contentSectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});


export const ContentSection = (props: SectionProps) => {
  const colorScheme = useColorScheme();
  const { title, link, slot, cardMode = true } = props;
  return (
    <View className="mb-4">
      {title && <View className="flex flex-row items-end justify-between mb-2">
        <Text className="text-base font-semibold text-gray-600">
          {title}
        </Text>
        {link && <Link href={link.href}>
          <Text className='font-regulars m-auto px-3 text-blue-500'>{link.title}</Text>
        </Link>}
      </View>}
      <View className={`${cardMode && 'shadow bg-white rounded-xl'}`}>
        {slot}
      </View>
    </View>
  );
}