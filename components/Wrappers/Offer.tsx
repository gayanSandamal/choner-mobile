import { Colors } from "@/constants/Colors"
import { ImageBackground, View, Text } from "react-native"
import { useColorScheme } from '@/hooks/useColorScheme';
import { BtnLink } from "../Base/Button";
import { VividCardProps } from "@/types/Components";

export const Vivid = (props: VividCardProps) => {
  const { title, subtitleLine1, subtitleLine2, button, bgImgUri = '', color = 'text-white' } = props;
  const colorScheme = useColorScheme();
  return (<View className="overflow-hidden overflow-hidden rounded-xl" style={{ backgroundColor: Colors[colorScheme ?? 'light'].primary }}>
    <ImageBackground className='p-6' style={{ borderRadius: 20 }} source={{ uri: bgImgUri }}>
      <View>
        {title && <Text className={`mt-2 text-2xl font-medium ${color} mb-4`}>
          {title}
        </Text>}
        {subtitleLine1 && <Text className={`font-bold ${color}`}>{subtitleLine1}</Text>}
        {subtitleLine2 && <Text className={`font-bold ${color}`}>{subtitleLine2}</Text>}
        {button.title && <View className='mt-4'>
          <BtnLink
            href={button.href}
            title={button.title}
            color={Colors[colorScheme ?? 'light'].primary}
          />
        </View>}
      </View>
    </ImageBackground>
  </View>)
}
