import Icon from '@/components/Base/Icon'
import Label from '@/components/Base/Label'
import { Colors } from '@/constants/Colors'
import { FontTypes, IconNames } from '@/types/Components'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {flexDirection: 'row', width: '100%', justifyContent: 'space-between'},
  gradientItem: {flex: 1, height: 90, borderRadius: 10, marginBottom: 10},
  itemContentWrapper: {flex: 1, borderRadius: 9, backgroundColor: Colors.dark.darkText, marginVertical: 1.8, marginHorizontal: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },
})

export const UserStatus = () => {
    return (
        <>
            <View style={styles.wrapper}>
                <LinearGradient style={styles.gradientItem} colors={['#FDFC47', '#24FE41']}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.itemContentWrapper}>
                    <Icon classNames='ml-5' name={IconNames.xp} viewBox='0 0 38 38' width={38} height={38} color={Colors.dark['green-shade-1']} />

                    <View className='ml-4'>
                        <Label containerStyles={{fontSize: 22, fontWeight: 600}} color={Colors.dark['green-shade-1']} label='46' />
                        <Label type={FontTypes.FLabel} label='XP Level' />
                    </View>
                    </TouchableOpacity>
                </LinearGradient>
                <View className='w-[10px]'/>
                <LinearGradient style={styles.gradientItem} colors={['#FFC837', '#FF8008']}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.itemContentWrapper}>
                    <Icon classNames='ml-5' name={IconNames.reward} viewBox='0 0 44 44' width={44} height={44} color={Colors.dark.primary} />

                    <View className='ml-4'>
                        <Label containerStyles={{fontSize: 22, fontWeight: 600}} color={Colors.dark.primary} label='10.12K' />
                        <Label type={FontTypes.FLabel} label='Rewards' />
                    </View>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            
            <View style={styles.wrapper}>
                <LinearGradient style={styles.gradientItem} colors={['#F7971E', '#FFD200']}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.itemContentWrapper}>
                    <Icon classNames='ml-5' name={IconNames.planet} viewBox='0 0 42 30' width={42} height={30} color={Colors.dark['primary-material-1']} />

                    <View className='ml-4'>
                        <Label containerStyles={{fontSize: 22, fontWeight: 600}} color={Colors.dark['primary-material-1']} label='Saturn' />
                        <Label type={FontTypes.FLabel} label='Planet' />
                    </View>
                    </TouchableOpacity>
                </LinearGradient>
                <View className='w-[10px]'/>
                <LinearGradient style={styles.gradientItem} colors={['#F64F59', '#12C2E9']}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.itemContentWrapper}>
                    <Icon classNames='ml-5' name={IconNames.badge} viewBox='0 0 42 42' width={42} height={42} color={Colors.dark['purple-shade-1']} />

                    <View className='ml-4'>
                        <Label containerStyles={{fontSize: 22, fontWeight: 600}} color={Colors.dark['purple-shade-1']} label='Silver' />
                        <Label type={FontTypes.FLabel} label='Badge' />
                    </View>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </>
    )
}