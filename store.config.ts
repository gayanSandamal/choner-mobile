import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productsReducer from './store/store.products'
import { productsApi } from './api/productsApi'

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  persistReducer, persistStore, FLUSH,
  PERSIST,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  products: productsReducer,
  [productsApi.reducerPath]: productsApi.reducer,
}))


export function setupStore(preloadedState = {} as any) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, PERSIST, REGISTER],
        },
      }).concat(productsApi.middleware),
    preloadedState
  })
}

export const store = setupStore({})
export const persistor = persistStore(store)