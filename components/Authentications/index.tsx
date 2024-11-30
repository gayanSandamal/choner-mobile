import { View } from "react-native";
import { Btn } from "../Base/Button";
import { FontTypes, IconNames, InputSizes } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Colors } from '@/constants/Colors';
import Label from '../Base/Label';
import { router, useFocusEffect } from "expo-router";
import { useSession } from "@/hooks/ctx";

export default function InitialScreen() {
  const {session} = useSession()

  useFocusEffect(() => {
    session && router.replace('/(app)')})
  
  if (session) {
    <View className="w-full h-full" style={{backgroundColor: Colors.dark.grey}} />
  }

  const termsLink = {
    pathname: '/webview',
    params: {
      uri: 'https://choner.io/terms-conditions/'
    }
  }

  return (
    <ContentSection cardMode={false} containerStyles={{ maxWidth: 353 }}>
      {!session && <>
        <Btn onPress={() => router.navigate('/sign-in')} icon={IconNames.login} size={InputSizes.lg} block label="SIGN IN"></Btn>
        <Btn wrapperClasses='mt-6' onPress={() => router.navigate('/sign-up')} icon={IconNames.register} size={InputSizes.lg} block outlined color={Colors.dark['primary-shade-2']} label="SIGN UP"></Btn>
        <Label classNames='mt-6 text-center' color={Colors.dark['grey-shade-2']} type={FontTypes.FP} label='By creating an account, you agree to our' />
        <View className='flex items-center'>
          <Btn wrapperClasses='text-center' size={InputSizes.sm} textMode link={termsLink} color={Colors.dark.link} label="Terms and Conditions"></Btn>
        </View>
      </>}
    </ContentSection>
  )
}