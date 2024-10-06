import { TouchableOpacity, View, StyleSheet } from "react-native"
import { Avatar } from "../Base/Avatar"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes, InterestCardProps } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { Btn, CharmBtn } from "../Base/Button"
import Icon from "../Base/Icon"
import { escapePercent, postCreateTimeToDate } from "@/utils/commonUtils"
import { router } from "expo-router"

const styles = StyleSheet.create({
  wrapper: { padding: 12, borderRadius: 16,  backgroundColor: Colors.dark.darkText, borderColor: Colors.dark['soundcloud-gdr-1'], borderWidth: 1 },
})

export const InterestCard = ({data, disabled, classNames, navigationPath}: InterestCardProps) => {

  const navigateToInterest = () => {
    !disabled && router.push({
      pathname: navigationPath || '/interests/interest-view',
      params: {
        data: JSON.stringify({
          id: data.id,
          title: data.title,
          description: data.description,
          createdUser: {
            ...data.createdUser,
            profileImageUrl: escapePercent(data?.createdUser?.profileImageUrl || '')
          },
          createdAt: data.createdAt,
          voteCount: data.voteCount,
        })
      },
    })
  }

  return <TouchableOpacity className={classNames} activeOpacity={disabled ? 1 : 0.5} style={styles.wrapper} onPress={navigateToInterest}>
    <View className='flex flex-row items-top'>
      <View className='flex flex-row items-center' style={{borderRightColor: Colors.light.white, borderRightWidth: 1}}>
        <Avatar containerStyles={{ marginRight: 8 }} size={InputSizes.sm} img={data.createdUser.profileImageUrl || undefined} />
        <View className='flex mr-1'>
          <Label type={FontTypes.FP} label={data.createdUser.displayName} classNames='mb-1 w-[70px]' numberOfLines={1} ellipsizeMode="tail" />
          <Label color={Colors.dark['grey-shade-3']} type={FontTypes.FSmall} label={postCreateTimeToDate(data.createdAt)} />
        </View>
      </View>
      <Label type={FontTypes.FTitle3Bold} label={data.title} classNames='ml-2 mt-[-4px] w-100' numberOfLines={3} containerStyles={{ flexShrink: 1 }} />
    </View>
    <View className='flex flex-row my-4'>
      <Label label="Why: " type={FontTypes.FLabel} color={Colors.dark.background} containerStyles={{ fontWeight: 500 }} />
      <Label label={data.description} type={FontTypes.FLabel} color={Colors.dark['grey-shade-3']} classNames='w-100' numberOfLines={2} containerStyles={{ flexShrink: 1 }} />
    </View>
    <View className='flex flex-row items-center justify-between'>
      <View className='flex flex-row items-center'>
        <Btn icon={IconNames.interests} label="Interested" size={InputSizes.sm} outlined />
        <View className='flex-row items-center ml-2'>
          <Icon name={IconNames.interestsFill} size={InputSizes.sm} />
          <Label label={`|  ${data.voteCount}`} type={FontTypes.FLabel} classNames='ml-1' />
        </View>
      </View>
      <CharmBtn icon={IconNames.options} onPress={() => { }} size={InputSizes.md} frame={true} />
    </View>
  </TouchableOpacity>
}