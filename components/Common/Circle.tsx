import { View, Text } from "react-native"
import { Avatar } from "../Base/Avatar"
import Indicator from "../Base/Indicator"
import { InputSizes } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { Circle as CircleProps } from "@/types/Components"
import Label from "../Base/Label"

export const Circle = (props: CircleProps) => {
  const { id, imageUri, title, unreadCount } = props
  return <View key={id} style={{ marginRight: 20 }}>
    <Avatar img={imageUri} size={InputSizes.md} bgColor={Colors.dark['primary-material-1']} />
    <View style={{ position: 'absolute', bottom: 30, right: 0 }}>
      <Indicator>
        <Text className='text-xs text-white'>{unreadCount > 99 ? '99+' : unreadCount}</Text>
      </Indicator>
    </View>
    <Label containerStyles={{ marginTop: 16, width: 80 }} label={title} numberOfLines={1} ellipsizeMode={'tail'} />
  </View>
}