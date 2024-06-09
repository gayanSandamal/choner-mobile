import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { CharmBtn } from "../Base/Button";
import Chip from "../Base/Chip";
import { useCartItems } from "@/hooks/useCart";
import { CartItem } from "@/types/Products";
import { router } from 'expo-router';
import { CartIndicatorProps } from "@/types/Components";

const styles = StyleSheet.create({
  indicator: {
    bottom: -8,
    right: -8,
  }
});

export const CartIndicator = (props: CartIndicatorProps) => {
  const { size = 'md', bgColor, color } = props;
  const { items } = useCartItems()
  const [cartItemsCount, setCartItemsCount] = useState<string>('0')

  useEffect(() => {
    const count = items.reduce((acc: number, item: CartItem) => acc + item.qty, 0)
    setCartItemsCount(count > 9 ? '9+' : count.toString())
  }, [items])

  const navigateToCart = () => {
    router.push({ pathname: '/shoppingCart' })
  }

  return (
    <View>
      <CharmBtn size={size} color={color} bgColor={bgColor} iconsSize='32' disabled={cartItemsCount === '0'} onPress={navigateToCart} />
      {cartItemsCount !== '0' && <View className='absolute' style={styles.indicator}>
        <Chip title={cartItemsCount} size="sm" bgColor="bg-red-500" color="text-white" />
      </View>}
    </View>
  )
}