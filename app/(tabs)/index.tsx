import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Vivid } from '@/components/Wrappers/Offer';
import { ContentSection } from '@/components/Wrappers/Sections';
import { NEW_COLLECTION } from '@/constants/ExternalAssets';

import { useFetchAllProductsQuery } from './../../api'
import { Products } from '@/components/Product/Products';
import { router } from 'expo-router';
import { Product } from '@/types/Products';
import { CartIndicator } from '@/components/Cart/CartIndicator';

const HomeScreen = () => {
  const { data, isLoading } = useFetchAllProductsQuery({});

  const welcomeSection = <View className="p-6 flex items-start">
    <View className='flex flex-row items-center justify-between w-full'>
      <View className=''>
        <Text className="text-slate-500">Welcome back!</Text>
        <Text className="mt-2 text-2xl font-medium text-gray-700">Gayan</Text>
      </View>
      <View className='flex'>
        <CartIndicator />
      </View>
    </View>
  </View>

  const offerSection = useMemo(() =><Vivid title="New Collecti\on" subtitleLine1="Discount 50% for" subtitleLine2="the first transaction" button={{ title: 'Shop Now', href: "/shop" }} bgImgUri={NEW_COLLECTION} />, [NEW_COLLECTION])

  const navigateToProduct = (product: Product) => {
    router.push({ pathname: '/product/[id]', params: { id: product.id, title: product.name } });
  }
  const productsSection = useMemo(() => <Products products={data?.slice(0, 4)} isLoading={isLoading} onPress={navigateToProduct} />, [data])

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View className="px-4">
          {/* greeting section  */}
          <ContentSection slot={welcomeSection} />
          {/* offer section */}
          <ContentSection slot={offerSection} />
          {/* Recommendations section */}
          <ContentSection title="Recommendations" slot={productsSection} link={{ title: 'View All', href: '/shop' }} cardMode={false} />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;