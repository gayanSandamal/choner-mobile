import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet } from "react-native"
import NumberInput from "../Base/NumberInput"
import { useState } from "react"
import Ionicons from '@expo/vector-icons/Ionicons'
import { CartItemProps } from "@/types/Components"
import { router } from 'expo-router';

const styles = StyleSheet.create({
  removeIcon: {
    right: 16,
  }
})

export const CartItemComponent = (props: CartItemProps) => {
  const { item, onRemove, onUpdateQty, onPressImage } = props
  const [qty, setQty] = useState<number>(item.qty)
  const changeQuantity = (qty: number) => {
    setQty(qty)
    onUpdateQty(item, qty)
  }
  const navigateToProduct = () => {
    router.push({ pathname: '/product/[id]', params: { id: item.id, title: item.name } });
  }

  return (
    <View className={`flex flex-row bg-white shadow-md rounded-lg mb-4 px-4 py-2 items-start`}>
      <View className="w-1/3 h-24 flex items-center">
        <Pressable className="w-full h-24 mr-4" onPress={() => onPressImage(item)}>
          <Image source={{ uri: item.mainImage }} className={`w-full h-24 mr-4 rounded-lg`} />
        </Pressable>
      </View>
      <View className={`w-2/3 flex flex-col justify-between flex-grow`}>
        <View className="flex flex-row items-center justity-between">
          <Pressable onPress={navigateToProduct} className="w-full">
            <Text className={`text-sm font-semibold text-gray-800 underline`} numberOfLines={1} style={{ width: '100%', maxWidth: 200 }}>{item.name}</Text>
          </Pressable>
          <TouchableOpacity onPress={() => onRemove(item)} style={styles.removeIcon}>
            <Ionicons size={24} name="trash" color='red' />
          </TouchableOpacity>
        </View>
        <Text className={`text font-medium text-gray-500 mt-2`}>Size: {item.selectedSize}</Text>
        <View className={`flex flex-row justify-between items-center mt-2`}>
          <Text className={`text-sm font-bold w-2/3`}>{item.price.amount} {item.price.currency}</Text>
          <View className="w-1/3">
            <NumberInput initialValue={qty} onChange={changeQuantity} size='sm' />
          </View>
        </View>
        <View className={`flex flex-row justify-between items-center mt-2`}>
          <Text className={`text-base font-regular text-gray-500`}>{item.price.amount} {item.price.currency} x {item.qty}</Text>
          <Text className={`text-base font-bold text-green-700`}>= {parseFloat(item.price.amount) * item.qty} {item.price.currency}</Text>
        </View>
      </View>
    </View>
  )
}