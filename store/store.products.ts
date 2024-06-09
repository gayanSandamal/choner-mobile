import { CartItem, Product } from '@/types/Products'
import { createSlice } from '@reduxjs/toolkit'

const products = createSlice({
  name: 'products',
  initialState: {
    items: []
  },
  reducers: {
    addItemsToCart: (state: any, action: any) => {
      const newItem = action.payload as CartItem
      const existingItem = state.items.find((item: CartItem) => (item.id === newItem.id && item.selectedSize === newItem.selectedSize))
      if (!existingItem) {
        state.items?.push(newItem)
      } else {
        const qty = Number(newItem.qty)
        existingItem.qty = qty
        state.items = state.items.map((item: Product) => item.id === existingItem.id ? { ...item, ...existingItem } : item)
      }
    },
    updateItemQty: (state: any, action: any) => {
      const {product: item, newQty} = action.payload as {product: CartItem, newQty: number}
      state.items = state.items.map((i: CartItem) => {
        if (i.id === item.id && i.selectedSize === item.selectedSize) {
          return { ...i, qty: newQty }
        }
        return i
      })
    },
    removeItemFromCart: (state: any, action: any) => {
      const item = action.payload as CartItem
      state.items = state.items.filter((i: CartItem) => i.id !== item.id || i.selectedSize !== item.selectedSize)
    },
    invalidateCartItems: (state) => {
      state.items = []
    },
  }
})

export type RootState = {
  items: any[],
}

export const { invalidateCartItems, addItemsToCart, removeItemFromCart, updateItemQty } = products.actions

export default products.reducer