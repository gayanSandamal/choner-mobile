import { ProductProps } from '@/types/Products';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 120,
  },
  inStock: {
    height: 10,
    width: 10
  }
})

export const ProductCard = (props: ProductProps) => {
  const { product, onPress } = props
  return (
    <TouchableOpacity className='basis-1/2 p-1' onPress={() => onPress(product)}>
      <View className='rounded-xl shadow bg-white mb-2 p-5'>
        <Image
          className='rounded-xl overflow-hidden'
          style={styles.image}
          source={{ uri: product.mainImage }}
        />
        {
          product.stockStatus === 'IN STOCK' ?
            <View className='flex flex-row items-center'>
              <View className="rounded-full bg-green-600" style={styles.inStock}></View>
              <Text className='text-gray-900 text-xs ml-2'>In Stock</Text>
            </View> :
            <View className='flex flex-row items-center'>
              <View className="rounded-full bg-red-400" style={styles.inStock}></View>
              <Text className='text-gray-900 text-xs ml-2'>Out of Stock</Text>
            </View>
        }
      </View>
      <View className='flex flex-row'>
        <Text className='text-lg font-semibold text-gray-700'>{product.price.amount} {product.price.currency}</Text>
      </View>
      <View className='flex flex-row'>
        <Text className='text-xs font-normal text-gray-700'>{product.name}</Text>
      </View>
    </TouchableOpacity>
  )
}