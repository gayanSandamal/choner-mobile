import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { SectionProps } from '@/types/Components';


export const ContentSection = (props: SectionProps) => {
  const { title, link, children, cardMode = true, containerStyles, classNames } = props;
  return (
    <View className={`mb-4 ${classNames}`} style={containerStyles}>
      {title && <View className="flex flex-row items-end justify-between mb-2">
        <Text className="text-base font-semibold text-gray-600">
          {title}
        </Text>
        {link && <Link href={link.href}>
          <Text className='font-regulars m-auto px-3 text-blue-500'>{link.title}</Text>
        </Link>}
      </View>}
      <View className={`${cardMode && 'shadow bg-white rounded-xl'}`}>
        {children}
      </View>
    </View>
  );
}