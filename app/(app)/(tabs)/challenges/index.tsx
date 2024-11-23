import { BtnDetailed } from '@/components/Base/Button'
import Label from '@/components/Base/Label'
import { UserStatus } from '@/components/Common/UserStatus'
import { Colors } from '@/constants/Colors'
import { FontTypes, IconNames, JustifyContent } from '@/types/Components'
import { router } from 'expo-router'
import { ScrollView, ImageBackground, StyleSheet, View, Image, ViewStyle } from 'react-native'

const baseCard: ViewStyle = {
  width: '100%',
  position: 'relative',
  borderRadius: 10,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: Colors.dark['grey-shade-3'],
  backgroundColor: Colors.dark['grey-shade-2'],
};

const baseButton: ViewStyle = {
  height: 38,
  paddingHorizontal: 12,
  borderRadius: 20,
  borderColor: Colors.light.white,
};

const styles = StyleSheet.create({
  eventWrapper: { ...baseCard, aspectRatio: 2.1 },
  cardWrapper: { ...baseCard, aspectRatio: 1.8 },
  cardWrapperWide: { ...baseCard, aspectRatio: 2 },
  bottomBtnWrapper: { position: 'absolute', bottom: 10, width: '100%', alignItems: 'center' },
  buttonSmall: { ...baseButton, width: 100 },
  buttonMedium: { ...baseButton, width: 120 },
  buttonLarge: { ...baseButton, width: 150 },
});

const imageUrls = [
  'https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://img.freepik.com/premium-photo/silhouette-sports-girl-running-along-road-sunset-her-legs-motion-against-vibrant-sky_1162141-31348.jpg',
  'https://img.freepik.com/free-photo/portrait-army-during-medieval-times_23-2150932123.jpg',
  'https://t4.ftcdn.net/jpg/00/23/45/23/360_F_23452393_7GQXDsWyrnCEEWQq4JYgjPEKbvW1FbRC.jpg',
];

export default function ChallengesScreen() {
  return (
    <ScrollView className="h-full px-3 pt-3" style={{backgroundColor: Colors.dark.grey}} contentContainerStyle={{ alignItems: 'center' }}>
      {/* <View className="w-full mb-[20px]">
        <ImageBackground source={{ uri: imageUrls[0] }} resizeMode="cover" style={styles.eventWrapper}>
          <View className='pt-5 w-full h-full px-4 pb-2' style={{ backgroundColor: '#0000006A' }}>
            <Label containerStyles={{ fontSize: 24, letterSpacing: 3, fontWeight: '700' }} color={Colors.dark.main} label="CHONERSPHERE" />
            <Label containerStyles={{ fontSize: 22, fontWeight: '500' }} color={Colors.dark.main} label="Is coming to" />
            <Label classNames='pb-4' containerStyles={{ fontSize: 22, letterSpacing: 3, fontWeight: '700' }} color={Colors.light.white} label="San Francisco!" />
            <BtnDetailed leftIcon={{ name: IconNames.bicepsFilled }} label="Count me in !" labelAlign={JustifyContent.center} wrapperStyle={styles.buttonLarge} onPress={() => {}} />
          </View>
        </ImageBackground>
      </View> */}

      <UserStatus />

      <View className="w-full mt-[10px] mb-[25px]">
        <ImageBackground source={{ uri: imageUrls[1] }} resizeMode="cover" style={styles.cardWrapper}>
          <View className='pt-5 pl-4' style={{ backgroundColor: '#0000006A', height: '100%' }}>
            <Label containerStyles={{ fontSize: 20, letterSpacing: 3, fontWeight: '700' }} color={Colors.dark.main} label="ON-GOING" />
            <Label containerStyles={{ fontSize: 20, letterSpacing: 3, fontWeight: '700' }} color={Colors.dark.main} label="CHALLENGES" />
          </View>
          <View style={styles.bottomBtnWrapper}>
            <BtnDetailed label="Explore" fontType={FontTypes.FTitle3} labelAlign={JustifyContent.center} wrapperStyle={styles.buttonSmall} onPress={() => router.navigate('/challenges/on-going-challenges')} />
          </View>
        </ImageBackground>
      </View>

      {/* <View className="w-full mb-[25px]">
        <ImageBackground source={{ uri: imageUrls[3] }} resizeMode="cover" style={styles.cardWrapperWide}>
          <View style={{ backgroundColor: '#0000006A', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Label classNames='pb-7' containerStyles={{ fontSize: 32, letterSpacing: 3, fontWeight: '700' }} color={Colors.dark['soundcloud-gdr-1']} label="CHOSEN ONE" />
          </View>
          <View style={styles.bottomBtnWrapper}>
            <BtnDetailed label="Find Yours" fontType={FontTypes.FTitle3} labelAlign={JustifyContent.center} wrapperStyle={styles.buttonMedium} onPress={() => {}} />
          </View>
        </ImageBackground>
      </View> */}

      {/* <View className="w-full mb-[20px]">
        <ImageBackground source={{ uri: imageUrls[2] }} resizeMode="cover" style={styles.cardWrapperWide}>
          <View style={{ backgroundColor: '#0000006A', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Label classNames='pb-5' containerStyles={{ fontSize: 24, letterSpacing: 3, fontWeight: '700' }} color={Colors.light.white} label="THE RESISTANCE" />
          </View>
          <View style={styles.bottomBtnWrapper}>
            <BtnDetailed label="Can You Resist?" fontType={FontTypes.FTitle3} labelAlign={JustifyContent.center} wrapperStyle={styles.buttonLarge} onPress={() => {}} />
          </View>
        </ImageBackground>
      </View> */}
    </ScrollView>
  );
}
