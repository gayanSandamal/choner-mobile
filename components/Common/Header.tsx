import React from 'react';
import { StyleSheet, View } from 'react-native';
import Label from './../Base/Label';
import { FontColors, FontTypes, InputSizes } from '@/types/Components';
import { CharmBtn } from '../Base/Button';
import Indicator from '../Base/Indicator';
import { Colors } from '@/constants/Colors';

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: Colors.dark.grey,
        height: 60
    }
})
const Header = () => {
    return (
        <View className='rounded-2xl shadow-2xl flex flex-row items-center justify-between px-5' style={[styles.headerWrapper]}>
            <Label type={FontTypes.FTitle2} color={FontColors.light} />
            <CharmBtn onPress={() => { }} size={InputSizes.md} frame={false} slot={
                <View style={{ position: 'absolute', bottom: 4, right: 4 }}><Indicator /></View>
            } />
        </View>
    )
}

export default Header;