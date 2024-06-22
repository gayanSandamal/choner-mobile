import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
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
import SearchBar from '@/components/Base/SearchBar';
import Header from '@/components/Common/Header';

const HomeScreen = () => {
  // const [searchQuery, setSearchQuery] = useState<string>("")
  // const searchSection = useMemo(() => <Header />, )

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View className="px-4">
          {/* search section */}
          <Header />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;