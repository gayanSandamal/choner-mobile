import { View } from "react-native";
import { Btn } from "../Base/Button";
import { FontTypes, IconNames, InputSizes, SignUpScreenProps } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Colors } from '@/constants/Colors';
import Label from '../Base/Label';
import { router } from "expo-router";

export default function InitialScreen() {

  return (
    <ContentSection cardMode={false} containerStyles={{ maxWidth: 353 }}>
      <Btn onPress={() => router.navigate('/sign-in')} icon={IconNames.login} size={InputSizes.lg} block label="SIGN IN"></Btn>
      <Btn wrapperClasses='mt-6' onPress={() => router.navigate('/sign-up')} icon={IconNames.register} size={InputSizes.lg} block outlined color={Colors.dark['primary-shade-2']} label="SIGN UP"></Btn>
      <Label classNames='mt-6 text-center' color={Colors.dark['grey-shade-2']} type={FontTypes.FP} label='By creating an account, you agree to our' />
      <View className='flex items-center'>
        <Btn wrapperClasses='text-center' onPress={() => {}} size={InputSizes.sm} textMode link={'/landing-page'} color={Colors.dark.link} label="Terms of Service and Privacy Policy"></Btn>
      </View>
    </ContentSection>)
}