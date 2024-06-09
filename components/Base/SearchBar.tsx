import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SearchProps } from '@/types/Components'

const SearchBar = (props: SearchProps) => {
  const { placeholder = 'Search', onSubmit } = props
  const [searchTerm, setSearchTerm] = useState('')

  const clearSearch = () => {
    setSearchTerm('')
    onSubmit('')
  }

  const handleSearch = () => {
    if (onSubmit) {
      onSubmit(searchTerm)
    }
  }

  return (
    <View className={`flex flex-row items-center bg-gray-100 rounded-full px-3 shadow-md`}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder={placeholder}
        placeholderTextColor="gray-400"
        className={`mx-2 flex-grow text-base font-medium py-4 outline-none`}
        onSubmitEditing={handleSearch}
      />
      {searchTerm.length > 0 && (
        <>
          <TouchableOpacity onPress={clearSearch} className='ml-2 mr-4'>
            <Ionicons size={24} name="close-circle" color="gray-400" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch} className={`ml-2`}>
            <Ionicons size={24} name="search" color="gray-400" />
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default SearchBar;
