import { View } from "react-native";
import { Btn } from "../Base/Button";
import { FontTypes, IconNames, InputSizes, SignUpScreenProps } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Colors } from '@/constants/Colors';
import Label from '../Base/Label';

export default function InitialScreen(props: SignUpScreenProps) {
  const { onSetActiveScreen } = props;
  const onPressSignIn = () => {
    onSetActiveScreen('sign-in');
  };
  const onPressSignUp = () => {
    onSetActiveScreen('sign-up');
  };
  return (
    <ContentSection cardMode={false} containerStyles={{ maxWidth: 353 }}>
      <Btn onPress={onPressSignIn} icon={IconNames.login} size={InputSizes.lg} block label="SIGN IN"></Btn>
      <Btn wrapperClasses='mt-6' onPress={onPressSignUp} icon={IconNames.register} size={InputSizes.lg} block outlined color={Colors.dark['primary-shade-2']} label="SIGN UP"></Btn>
      <Label classNames='mt-6 text-center' color={Colors.dark['grey-shade-2']} type={FontTypes.FP} label='By creating an account, you agree to our' />
      <View className='flex items-center'>
        <Btn wrapperClasses='text-center' onPress={() => {}} size={InputSizes.sm} textMode link={'/'} color={Colors.dark.link} label="Terms of Service and Privacy Policy"></Btn>
      </View>
    </ContentSection>)
}