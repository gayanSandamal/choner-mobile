
import { CartItem, Product } from '@/types/Products';
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, invalidateCartItems, removeItemFromCart, updateItemQty } from '@/store/store.products';

export const useAddToCart = (onSuccess = () => { }) => {
  const useAppDispatch = useDispatch.withTypes()
  const dispatch = useAppDispatch()
  const addToCart = (product: Product, size: string, qty: number) => {
    dispatch(addItemsToCart({ ...product, selectedSize: size, qty } as any));
    onSuccess();
  }
  return { addToCart };
}

export const useUpdateQty = (onSuccess = () => { }) => {
  const useAppDispatch = useDispatch.withTypes()
  const dispatch = useAppDispatch()
  const updateQty = (product: CartItem, newQty: number) => {
    dispatch(updateItemQty({ product, newQty } as any));
    onSuccess();
  }
  return { updateQty };
}

export const useRemoveFromCart = (onSuccess = () => { }) => {
  const useAppDispatch = useDispatch.withTypes()
  const dispatch = useAppDispatch()
  const removeFromCart = (item: CartItem) => {
    dispatch(removeItemFromCart(item));
    onSuccess();
  }
  return { removeFromCart };
}

export const useResetCart = (onSuccess = () => { }) => {
  const useAppDispatch = useDispatch.withTypes()
  const dispatch = useAppDispatch()
  const resetCart = () => {
    dispatch(invalidateCartItems());
    onSuccess();
  }
  return { resetCart };
}

export const useCartItems = () => {
  const useAppSelector = useSelector.withTypes()
  const cartItems = useAppSelector((state: CartItem) => {
    return state.products.items
  })

  return {
    items: cartItems
  }
}