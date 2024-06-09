import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentSection } from '@/components/Wrappers/Sections';
import { CategoriesStrip } from '@/components/Product/Categories';

import { useFetchAllProductsQuery } from '../../api'
import { Products } from '@/components/Product/Products';
import { getUniqueCategories } from '@/utils/category.utils';
import { Product } from '@/types/Products';
import { BtnProps } from '@/types/Components';
import SearchBar from '@/components/Base/SearchBar';
import { router } from 'expo-router';
import { GET_OFFERS, NEW_COLLECTION } from '@/constants/ExternalAssets';
import { Vivid } from '@/components/Wrappers/Offer';

const ShopScreen = () => {
  const { data, isLoading } = useFetchAllProductsQuery({})
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | number | undefined>()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredData, setFilteredData] = useState<Product[]>(data)

  const onPressCategory = (category: BtnProps) => {
    if (selectedCategoryId === category.id) {
      setSelectedCategoryId(undefined)
    } else {
      setSelectedCategoryId(category.id)
    }
  }
  const searchBarRef = useRef()
  // category filteration
  useEffect(() => {
    const filteredResult = data.filter((product: Product) => {
      if (!selectedCategoryId) return true
      return selectedCategoryId === product.brandName
    })
    setFilteredData(filteredResult)
    setSearchQuery("")
  }, [selectedCategoryId])

  // search filteration
  useEffect(() => {
    const filteredResult = data.filter((product: Product) => {
      if (!searchQuery) return true
      const productNameLowerCase = product.name.toLowerCase()
      const searchQueryLowerCase = searchQuery.toLowerCase()
      return productNameLowerCase.includes(searchQueryLowerCase)
    })
    setFilteredData(filteredResult)
    setSelectedCategoryId(undefined)
  }, [searchQuery])

  const searchSection = useMemo(() => <SearchBar placeholder="Search for products" onSubmit={setSearchQuery} />, [searchQuery])

  const offerSection = useMemo(() => <Vivid title="New Collection" subtitleLine1="Discount 50% for" subtitleLine2="the first transaction" button={{ title: 'Shop Now', href: "/shop" }} bgImgUri={NEW_COLLECTION} />, [NEW_COLLECTION])

  const latestOffersSection = useMemo(() => <Vivid title="Get Latest Offers" subtitleLine1="Discounts upto 75%" button={{ title: 'Sign-up Now' }} bgImgUri={GET_OFFERS}/>, [GET_OFFERS])

  const categoriesSection = useMemo(() => <CategoriesStrip categories={getUniqueCategories(data)} onCategoryPress={onPressCategory} selectedCategoryId={selectedCategoryId} />, [data, selectedCategoryId])

  const navigateToProduct = (product: Product) => {
    router.push({ pathname: '/product/[id]', params: { id: product.id, title: product.name } });
  }

  const productsSection = useMemo(() => <Products products={filteredData} isLoading={isLoading} onPress={navigateToProduct} />, [filteredData])

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View className="px-4">
          {/* search section */}
          <ContentSection slot={searchSection} cardMode={false} />
          {/* offer section */}
          <ContentSection slot={offerSection} />
          {/* categories section */}
          <ContentSection title="Quick Filter by Categories" slot={categoriesSection} cardMode={false} />
          {/* Recommendations section */}
          <ContentSection title="All Products" slot={productsSection} cardMode={false} />
          {/* offer section */}
          <ContentSection slot={latestOffersSection} />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ShopScreen;