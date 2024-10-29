import { Btn, BtnDetailed } from '@/components/Base/Button'
import Icon from '@/components/Base/Icon'
import Label from '@/components/Base/Label'
import { UserStatus } from '@/components/Common/UserStatus'
import { Colors } from '@/constants/Colors'
import { FontTypes, IconNames, JustifyContent } from '@/types/Components'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView, ImageBackground,StyleSheet, View, Image } from 'react-native'
import MaskedView from "@react-native-masked-view/masked-view"

const styles = StyleSheet.create({
  eventWrapper: {width: '100%',  minHeight: 180, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: Colors.dark['grey-shade-3'], backgroundColor: Colors.dark['grey-shade-2']},
  countMeIn: {width: 145, height: 38, paddingHorizontal: 12, borderRadius: 20, borderColor: Colors.light.white},
  cardWrapper: {width: '100%', aspectRatio: 1.8, position: 'relative', borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: Colors.dark['grey-shade-3'], backgroundColor: Colors.dark['grey-shade-2']},
  cardWrapper2: {width: '100%', aspectRatio: 2, position: 'relative', borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: Colors.dark['grey-shade-3'], backgroundColor: Colors.dark['grey-shade-2']},
  cardButton1: {width: 100, height: 38, paddingHorizontal: 12, borderRadius: 20, borderColor: Colors.light.white},
  cardButton2: {width: 120, height: 38, paddingHorizontal: 12, borderRadius: 20, borderColor: Colors.light.white},
  cardButton3: {width: 150, height: 38, paddingHorizontal: 12, borderRadius: 20, borderColor: Colors.light.white},
})


const imageUrl1 = 'https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
const imageUrl2 = 'https://img.freepik.com/premium-photo/silhouette-sports-girl-running-along-road-sunset-her-legs-motion-against-vibrant-sky_1162141-31348.jpg'
const imageUrl3 = 'https://img.freepik.com/free-photo/portrait-army-during-medieval-times_23-2150932123.jpg'
const imageUrl4 = 'https://t4.ftcdn.net/jpg/00/23/45/23/360_F_23452393_7GQXDsWyrnCEEWQq4JYgjPEKbvW1FbRC.jpg'

export default function ChallengesScreen() {
  return (
    <ScrollView className='h-full bg-grey px-3 pt-3' contentContainerStyle={{alignItems: 'center'}}>
      <View className='w-full mb-[20px]'>
        <ImageBackground src={imageUrl1} resizeMode="cover" style={styles.eventWrapper}>
          <View className='w-full px-4 pt-5 pb-2' style={{backgroundColor: '#0000006A'}}>
            <Label containerStyles={{fontSize: 24, letterSpacing: 3, fontWeight: 700}} color={Colors.dark.main} label='CHONERSPHERE' />
            <Label containerStyles={{fontSize: 22, fontWeight: 500}} color={Colors.dark.main} label='Is comming to' />
            <Label classNames='pb-4' containerStyles={{fontSize: 22, letterSpacing: 3, fontWeight: 700}} color={Colors.light.white} label='San Francisco!' />
            <BtnDetailed leftIcon={{ name: IconNames.bicepsFilled }} label='Count me in !' labelAlign={JustifyContent.center} wrapperStyle={styles.countMeIn} onPress={() => {}} />
          </View>
        </ImageBackground>
      </View>

      <UserStatus />

      <View className='w-full mt-[10px] mb-[25px]'>
        <ImageBackground src={imageUrl2} resizeMode="cover" style={styles.cardWrapper}>
          <View className='w-full h-full px-4 pt-5 pb-2' style={{backgroundColor: '#0000006A'}}>
            <Label containerStyles={{fontSize: 20, letterSpacing: 3, fontWeight: 700}} color={Colors.dark.main} label='ON-GOING' />
            <Label classNames='pb-0.5' containerStyles={{fontSize: 20, letterSpacing: 3, fontWeight: 700}} color={Colors.dark.main} label='CHALLENGES' />
          </View>
          <View style={{position: 'absolute', bottom: 10, width: '100%', alignItems: 'center'}}>
            <BtnDetailed label='Explore' fontType={FontTypes.FTitle3} labelAlign={JustifyContent.center} wrapperStyle={styles.cardButton1} onPress={() => {}} />
          </View>
        </ImageBackground>
      </View>

      
      <View className='w-full mb-[25px]'>
        <ImageBackground src={imageUrl4} resizeMode="cover" style={styles.cardWrapper2}>
          <View className='w-full h-full px-4 pt-5 pb-2 items-center justify-center' style={{backgroundColor: '#0000006A'}}>
            <Label classNames='pb-10' containerStyles={{fontSize: 32, letterSpacing: 3, fontWeight: 700}} color={Colors.dark['soundcloud-gdr-1']} label='CHOSEN ONE' />
          </View>
          <View style={{position: 'absolute', bottom: 10, width: '100%', alignItems: 'center'}}>
            <BtnDetailed label='Find Yours' fontType={FontTypes.FTitle3} labelAlign={JustifyContent.center} wrapperStyle={styles.cardButton2} onPress={() => {}} />
          </View>
        </ImageBackground>
      </View>

      
      <View className='w-full mb-[20px]'>
        <ImageBackground src={imageUrl3} resizeMode="cover" style={styles.cardWrapper2}>
          <View className='w-full h-full px-4 pt-5 pb-2 items-center justify-center' style={{backgroundColor: '#0000006A'}}>
            <Label classNames='pb-10' containerStyles={{fontSize: 24, letterSpacing: 3, fontWeight: 700}} color={Colors.light.white} label='THE RESISTANCE' />
          </View>
          <View style={{position: 'absolute', bottom: 10, width: '100%', alignItems: 'center'}}>
            <BtnDetailed label='Can You Resist?' fontType={FontTypes.FTitle3} labelAlign={JustifyContent.center} wrapperStyle={styles.cardButton3} onPress={() => {}} />
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  )
}
