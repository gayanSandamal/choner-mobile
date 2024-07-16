import { View } from "react-native"
import { Avatar } from "../Base/Avatar"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes, InterestCardProps } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { Btn, CharmBtn } from "../Base/Button"
import Icon from "../Base/Icon"

export const InterestCard = (props: InterestCardProps) => {
  const { postedBy, title, subtitle, interestedCount } = props
  return <View className='flex p-3 rounded-2xl' style={{ backgroundColor: Colors.dark.darkText, borderColor: Colors.dark['primary-material-1'], borderWidth: 1 }}>
    {/* Interest card header */}
    <View className='flex flex-row items-center'>
      {/* Posted by */}
      <View className='flex flex-row items-center'>
        <Avatar containerStyles={{ marginRight: 8 }} size={InputSizes.sm} img={postedBy.img} />
        <View className='flex mr-3'>
          <Label type={FontTypes.FP} label={postedBy.name} classNames='mb-1' />
          <Label color={Colors.dark['grey-shade-3']} type={FontTypes.FSmall} label={postedBy.postedDate} />
        </View>
      </View>
      <Label type={FontTypes.FTitle3Bold} label={title} classNames='w-100' numberOfLines={2} containerStyles={{ flexShrink: 1 }} />
    </View>
    {/* Interest card body*/}
    <View className='flex flex-row my-4'>
      <Label label="Why: " type={FontTypes.FP} color={Colors.dark.background} containerStyles={{ fontWeight: 600 }} />
      <Label label={subtitle} type={FontTypes.FP} color={Colors.dark['grey-shade-3']} classNames='w-100' numberOfLines={2} containerStyles={{ flexShrink: 1 }} />
    </View>
    {/* Interest card footer */}
    <View className='flex flex-row items-center justify-between'>
      <View className='flex flex-row items-center'>
        <Btn icon={IconNames.interests} label="Interested" size={InputSizes.sm} outlined />
        <View className='flex-row items-center ml-2'>
          <Icon name={IconNames.interestsFill} size={InputSizes.sm} />
          <Label label={`|  ${interestedCount}`} type={FontTypes.FTitle3Bold} classNames='ml-1' />
        </View>
      </View>
      <CharmBtn icon={IconNames.options} onPress={() => { }} size={InputSizes.md} frame={true} />
    </View>
  </View>
}