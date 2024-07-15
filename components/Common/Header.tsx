import React from 'react';
import { StyleSheet, View } from 'react-native';
import Label from './../Base/Label';
import { FontColors, FontTypes, HeaderProps, IconNames, InputSizes, TabType } from '@/types/Components';
import { CharmBtn } from '../Base/Button';
import Indicator from '../Base/Indicator';
import { Colors } from '@/constants/Colors';
import { usePathname } from 'expo-router';
import { commonStyles } from '@/assets/styles/common';
import { Avatar } from '../Base/Avatar';
import { tabs } from '@/constants/NavigationTabs';

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: Colors.dark.grey,
        height: 60,
        marginTop: 5,
        marginBottom: 10,
        marginHorizontal: 12,
        ...commonStyles['shadow-md']
    }
})

const searchExcludePaths = ['/']
const hasSearch = (pathname: string) => {
    return !searchExcludePaths.includes(pathname)
}

const getTabTitle = (pathname: string) => {
    if (pathname === '/') {
        return 'choner'
    } else {
        return tabs.find((tab: TabType) => `/${tab.name}` === pathname)?.title
    }
}

const Header = (props: HeaderProps) => {
    const { unreadNotifications = false } = props
    const pathname = usePathname()
    return (
        <View className='rounded-2xl flex flex-row items-center justify-between px-5' style={styles.headerWrapper}>
            <View className='flex flex-row items-center'>
                {hasSearch(pathname) && <CharmBtn icon={IconNames.search} onPress={() => { }} size={InputSizes.md} frame={false} />}
                <Label classNames='ml-3' label={getTabTitle(pathname)} type={FontTypes.FTitle3Bold} color={FontColors.light} />
            </View>
            <View className='flex flex-row items-center'>
                <CharmBtn onPress={() => { }} size={InputSizes.md} frame={false}>
                    {
                        unreadNotifications && <View style={{ position: 'absolute', bottom: 4, right: 4 }}><Indicator /></View>
                    }
                </CharmBtn>
                <Avatar containerStyles={{ marginLeft: 10 }} size={InputSizes.sm} />
            </View>
        </View>
    )
}

export default Header;
