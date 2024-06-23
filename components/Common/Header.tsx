import React from 'react';
import { StyleSheet, View } from 'react-native';
import Label from './../Base/Label';
import { FontColors, FontTypes, HeaderProps, InputSizes } from '@/types/Components';
import { CharmBtn } from '../Base/Button';
import Indicator from '../Base/Indicator';
import { Colors } from '@/constants/Colors';
import { usePathname } from 'expo-router';
import { commonStyles } from '@/assets/styles/common';
import { Avatar } from '../Base/Avatar';

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: Colors.dark.grey,
        height: 60,
        marginTop: 5,
        marginBottom: 10,
        ...commonStyles['shadow-md']
    }
})

const getTabTitle = (pathname: string) => {
    if (pathname === '/') {
        return 'choner'
    } else if (pathname === '/community') {
        return 'Community'
    } else if (pathname === '/interests') {
        return 'Interests'
    } else if (pathname === '/video') {
        return 'Video'
    } else if (pathname === '/challenges') {
        return 'Challenges'
    }
}

const Header = (props: HeaderProps) => {
    const { unreadNotifications = false } = props
    const pathname = usePathname()
    return (
        <View className='rounded-2xl flex flex-row items-center justify-between px-5' style={styles.headerWrapper}>
            <Label label={getTabTitle(pathname)} type={FontTypes.FTitle2} color={FontColors.light} />
            <View className='flex flex-row items-center'>
                <CharmBtn onPress={() => { }} size={InputSizes.md} frame={false} slot={
                    unreadNotifications && <View style={{ position: 'absolute', bottom: 4, right: 4 }}><Indicator /></View>
                } />
                <Avatar containerStyles={{ marginLeft: 10 }} />
            </View>
        </View>
    )
}

export default Header;