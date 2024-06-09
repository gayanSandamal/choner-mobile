import React from 'react';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native';
import { BtnGroup } from '../Base/Button';
import { CategoriesStripProps } from '@/types/Products';
import { useColorScheme } from '@/hooks/useColorScheme';

export const CategoriesStrip = (props: CategoriesStripProps) => {
  const { categories, selectedCategoryId, onCategoryPress } = props
  const colorScheme = useColorScheme()
  
  return (
    <ScrollView horizontal={true}>
      <BtnGroup buttons={categories} onPress={(btn) => onCategoryPress(btn)} selectedId={selectedCategoryId} color={Colors[colorScheme ?? 'light'].primary} />
    </ScrollView>
  )
}