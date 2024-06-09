import React from 'react';
import { View } from 'react-native';
import { ProductCard } from './Product';
import { Product, ProductsProps } from '@/types/Products';

export const Products = (props: ProductsProps) => {
  const { products, isLoading, onPress } = props;
  return (
    <View className='flex flex-row flex-wrap flex-1'>
      {products?.map((product: Product) => <ProductCard key={product.id} product={product} onPress={onPress}/>)}
    </View>
  )
}