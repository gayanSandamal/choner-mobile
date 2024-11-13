import React from 'react'
import { View } from 'react-native';
import Label from '../Base/Label';
import { FontTypes } from '@/types/Components';
import { Colors } from '@/constants/Colors';
import { User } from '@/types/User';

type GreetingProps = {
  user: User | null
  motive?: string
}

const Greeting = ({user, motive}: GreetingProps) => {
  return (
    <View>
      <View className='flex flex-row'>
        <Label label='Hello' type={FontTypes.FTitle3} />
        <Label label={`${user?.displayName? ' ' + user?.displayName?.split(' ')?.[0] : ''},`} type={FontTypes.FTitle3Bold} />
      </View>
      {motive && (
        <View className='flex flex-row mt-3'>
          <Label label={motive} type={FontTypes.FDisplay5} color={Colors.dark['soundcloud-gdr-1']} />
        </View>
    )}
    </View>
  )
}

export default Greeting;