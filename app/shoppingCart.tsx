import { useCartItems, useRemoveFromCart, useUpdateQty } from '@/hooks/useCart';
import { View, Text, ScrollView, Image } from 'react-native';
import { CartItem } from '@/types/Products';
// import { Btn } from '@/components/Base/Button';
import { useResetCart } from "@/hooks/useCart";
import { CartItemComponent } from '@/components/Cart/CartItem';
import BottomModal from '@/components/Base/Modal';
import { useState } from 'react';


export default function ShoppingCartScreen() {
  const { items } = useCartItems()
  const { resetCart } = useResetCart()
  const { removeFromCart } = useRemoveFromCart()
  const { updateQty } = useUpdateQty()

  const [imageModalVisibility, setImageModalVisibility] = useState<boolean>(false)
  const [image, setImage] = useState<string>('')

  const onRemove = (item: CartItem) => {
    removeFromCart(item)
  }

  const onPressImage = (item: CartItem) => {
    setImage(item.mainImage)
    setImageModalVisibility(true)
  }

  const imageModalContent = () => {
    return (
      <View className="w-full h-64 mb-4 rounded-lg p-4 bg-white shadow">
        <Image source={{ uri: image }} className={`w-full h-full object-cover mb-4`} />
      </View>
    )
  }

  const subTotal = items.reduce((acc: number, item: CartItem) => acc + (parseFloat(item.price.amount) * item.qty), 0)
  const currency = items.length > 0 ? items[0].price.currency : ''
  const deliveryCost = 5.55

  const total = parseFloat(subTotal) + deliveryCost

  return (
    <>
      <ScrollView>
        <View className="p-4">
          {items.map((item: CartItem, index: number) => (
            <CartItemComponent
              key={index}
              item={item}
              onRemove={() => onRemove(item)}
              onUpdateQty={(product: CartItem, qty: number) => updateQty(product, qty)}
              onPressImage={onPressImage}
            />
          ))}
        </View>
      </ScrollView>
      <View className='flex flex-col bg-purple-600 p-7 rounded-t-3xl shadow'>
        <View className='flex flex-row items-end justify-between mb-2'>
          <Text className='text-sm text-white font-semibold'>Subtotal for products</Text>
          <Text className='text-lg text-white font-semibold'>{subTotal.toFixed(2)} {currency}</Text>
        </View>
        <View className='flex flex-row items-end justify-between mb-2'>
          <Text className='text-sm text-white font-semibold'>Delivery cost</Text>
          <Text className='text-lg text-white font-semibold'>{deliveryCost.toFixed(2)} {currency}</Text>
        </View>
        <View className='bg-white w-full h-1 mt-2'></View>
        <View className='flex flex-row items-end justify-between my-2'>
          <Text className='text-base text-white font-semibold'>Total</Text>
          <Text className='text-lg text-white font-semibold'>{total} {currency}</Text>
        </View>
        <View className='flex flex-row'>
          {items.length > 0 && <View className='w-1/3'>
            {/* <Btn outlined={true} color={'text-white'} title="Clear" wrapperClasses='my-4' onPress={resetCart} /> */}
          </View>}
          <View className={`${items.length > 0 ? 'w-2/3 ml-2' : 'w-full'}`}>
            {/* <Btn disabled={items.length === 0} title="Checkout" wrapperClasses='my-4 border-white bg-white border-2 rounded-md' onPress={() => { }} /> */}
          </View>
        </View>
      </View>
      <BottomModal hieght='2/4' isVisible={imageModalVisibility} onClose={() => setImageModalVisibility(false)} slot={imageModalContent()} />
    </>
  );
}