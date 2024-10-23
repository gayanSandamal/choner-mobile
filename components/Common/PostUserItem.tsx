import { View } from "react-native"
import { Avatar } from "../Base/Avatar"
import Label from "../Base/Label"
import { FontTypes, InputSizes, PostUserItemProps } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { postCreateTimeToDate } from "@/utils/commonUtils" 

export const PostUserItem = (props: PostUserItemProps) => {
    return (
        <View className={`flex flex-row items-center mr-1 ${props.classNames}`}>
            <Avatar containerStyles={{ marginRight: 8 }} size={InputSizes.sm} img={props.imageUrl || undefined} />
            <View className={props.width? props.width: props.fullWidth? 'flex w-[80%]': 'flex w-[70px]'} >
              <Label type={FontTypes.FP} classNames="mb-1" label={props.userName} numberOfLines={1} ellipsizeMode="tail" />
              <Label color={Colors.dark['grey-shade-3']} type={FontTypes.FSmall} label={postCreateTimeToDate(props.createdAt)} />
            </View>
        </View>
    )
}