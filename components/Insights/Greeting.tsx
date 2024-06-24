import React from 'react'
import { View } from 'react-native';
import Label from '../Base/Label';
import { FontTypes } from '@/types/Components';
import { Colors } from '@/constants/Colors';

const Greeting = () => {
  const username = 'Gayan'
  return (
    <View>
      <View className='flex flex-row'>
        <Label label='Hello ' type={FontTypes.FTitle3} />
        <Label label={`${username},`} type={FontTypes.FTitle3Bold} />
      </View>
      <View className='flex flex-row mt-3'>
        <Label label="I must find an Investor for choner!" type={FontTypes.FDisplay5} color={Colors.dark['soundcloud-gdr-1']} />
      </View>
    </View>
  )
}

export default Greeting;