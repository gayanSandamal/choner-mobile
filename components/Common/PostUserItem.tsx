import { View, StyleSheet, Image } from "react-native"
import { Avatar } from "../Base/Avatar"
import Label from "../Base/Label"
import { FontTypes, InputSizes, PostUserItemProps } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { postCreateTimeToDate } from "@/utils/commonUtils"

const styles = StyleSheet.create({
    RNImage: {width: 32, marginRight: 8, height: 32, borderWidth: 2, borderRadius: 32, borderColor: Colors.dark.background}
})

export const PostUserItem = (props: PostUserItemProps) => {
    return (
        <View className={`flex flex-row items-center mr-1 ${props.classNames}`}>
            {!props.useRNImage && <Avatar containerStyles={{ marginRight: 8 }} size={InputSizes.sm} img={props.imageUrl || undefined} />}
            {props.useRNImage && <Image src={props.imageUrl} source={require('../../assets/images/blurred.png')} style={[styles.RNImage, props.stylesForINimage]} resizeMode='cover'/>}
            <View className={props.width? props.width: props.fullWidth? 'flex w-[80%]': 'flex w-[70px]'} >
                <Label type={FontTypes.FP} classNames={props.createdAt? "mb-1": ""} label={props.userName} numberOfLines={1} ellipsizeMode="tail" />
                {props.createdAt && <Label color={Colors.dark['grey-shade-3']} type={FontTypes.FSmall} label={postCreateTimeToDate(props.createdAt)} />}
            </View>
        </View>
    )
}