import { useLocalSearchParams } from "expo-router";
import React, { useState, useMemo } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { useFetchAllProductsQuery } from './../../api'
import { Product } from "@/types/Products";
import { Btn } from "@/components/Base/Button";
import Chip from "@/components/Base/Chip";
import BottomModal from "@/components/Base/Modal";
import NumberInput from "@/components/Base/NumberInput";
import { useAddToCart } from "@/hooks/useCart";
import { CartIndicator } from "@/components/Cart/CartIndicator";

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [qty, setQty] = useState<number>(1)
  const [qtyModalVisibility, setQtyModalVisibility] = useState<boolean>(false)
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useFetchAllProductsQuery({})

  const { addToCart } = useAddToCart()

  const product = data.find((product: Product) => product.id === id)
  const {
    SKU,
    name,
    brandName,
    mainImage,
    price: { amount, currency },
    sizes,
    stockStatus,
    colour,
    description,
  } = product;

  const formattedPrice = `${amount} ${currency}`;

  const onSizePress = (size: string) => {
    setSelectedSize(size)
  }

  const getAddToCartQtyModal = () => {
    setQtyModalVisibility(true)
  }

  const onAddToCart = () => {
    addToCart(product, selectedSize, qty)
  }

  const qtyModalContent = useMemo(() => () => {
    return (
      <View>
        <View className={`flex flex-row items-center my-6`}>
          <Text className={`text-gray-500 mr-4`}>Select a size:</Text>
          {sizes.map((size: string, index: number) => (
            <Chip key={index} title={size} isActive={size == selectedSize} activeBgColor={'bg-gray-700'} activeColor={'text-white'} onPress={() => onSizePress(size)} />
          ))}
        </View>
        <View className="flex flex-row items-center mt-4">
          <View className="basis-1/3 pr-3">
            <NumberInput initialValue={qty} onChange={setQty} />
          </View>
          <View className="w-2/3">
            <Btn title="Add to Cart" bgColor="bg-green-600" color="text-white" onPress={() => onAddToCart()} disabled={!Boolean(selectedSize)} />
          </View>
        </View>
      </View>
    )
  }, [selectedSize, qty])

  return (
    <ScrollView className={`flex flex-col bg-gray-100 p-4`} contentContainerStyle={{ paddingBottom: 60 }}>
      <View className="w-full h-64 mb-4 rounded-lg p-4 bg-white shadow">
        <Image source={{ uri: mainImage }} className={`w-full h-full object-cover mb-4`} />
      </View>
      <View className='flex flex-col bg-white rounded-lg p-4 pb-4 shadow'>
        <Text className={`text-xl font-bold mb-2`}>{name}</Text>
        <View className="flex flex-row items-center">
          <Chip title={brandName} bgColor="bg-indigo-500" color="text-white" />
          <Text className={`text font-medium text-gray-400`}>SKU: {SKU}</Text>
        </View>
        <View className={`flex flex-row my-2`}>
          <Text className={`text-3xl font-semibold text-gray-700`}>{formattedPrice}</Text>
        </View>
        <View className="flex flex-row mb-4">
          <Text className='text-gray-500 mr-2'>Available colour(s): {colour}</Text>
          {
            colour === 'multicoloured' ? <View></View> :
              <View className="rounded" style={{ height: 20, width: 20, backgroundColor: colour }}></View>
          }
        </View>
        <Text className={`${stockStatus === 'IN STOCK' ? 'text-green-500' : 'text-red-600'}  font-bold my-2`}>{stockStatus}</Text>
        <View className={`flex flex-row items-center my-4`}>
          <Text className={`text-gray-500 mr-4`}>Available sizes:</Text>
          {sizes.map((size: string, index: number) => (
            <Chip key={index} title={size} onPress={getAddToCartQtyModal} />
          ))}
        </View>
        <View className="flex flex-row my-4 justify-between">
          <View className="w-1/4 mr-2">
            <CartIndicator size='sm' color='white' bgColor='bg-red-500' />
          </View>
          <View className="w-3/5">
            <Btn title="Add to Cart" bgColor="bg-green-600" color="text-white" onPress={getAddToCartQtyModal} />
          </View>
        </View>
        <View className="my-4">
          <Text className={`text-base mb-2`}>Description:</Text>
          <Text className={`text-gray-700`}>{description}</Text>
        </View>
      </View>
      <BottomModal isVisible={qtyModalVisibility} title='Select and Add' onClose={() => setQtyModalVisibility(false)} slot={qtyModalContent()} />
    </ScrollView>
  );
};

export default ProductPage;
