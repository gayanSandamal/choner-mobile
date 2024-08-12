import { View } from "react-native";
import { router } from 'expo-router';
import { useSession } from "@/hooks/ctx";
import { Btn, CharmBtn } from "../Base/Button";
import { IconNames, InputSizes, SignUpScreenProps } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Colors } from '@/constants/Colors';
import { Input } from "../Base/Input";
import { Separator } from "../Base/Separator";
import { fbSignUp, fbSignIn, fblogOut } from './../../auth';

export default function SignInScreen(props: SignUpScreenProps) {
  const { onSetActiveScreen } = props;
  const { signIn } = useSession();
  const onPressSignIn = () => {
    fbSignIn('user@example.com', 'password123').then((userCredential) => {
      signIn();
    })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace('/');
  };
  return (
    <ContentSection cardMode={false} containerStyles={{ maxWidth: 353 }}>
      <View className='flex items-center mt-3'>
        <View className="flex flex-row w-full items-center justify-between" style={{ maxWidth: 241 }}>
          <CharmBtn icon={IconNames.google} onPress={() => { }} size={InputSizes.lg} />
          <CharmBtn icon={IconNames.facebook} onPress={() => { }} size={InputSizes.lg} />
          <CharmBtn icon={IconNames.apple} onPress={() => { }} size={InputSizes.lg} />
        </View>
        <Separator />
        <Input classNames='mb-5' placeholder={'ENTER EMAIL'} value={undefined} icon={IconNames.email} />
        <Input classNames='mb-5' placeholder={'ENTER PASSWORD'} value={undefined} icon={IconNames.password} />
        <Btn onPress={onPressSignIn} icon={IconNames.login} size={InputSizes.lg} block label="SIGN IN"></Btn>
        <Btn wrapperClasses='text-center mt-16' onPress={() => onSetActiveScreen('forgot-password')} size={InputSizes.sm} textMode link={'/'} color={Colors.dark['grey-shade-2']} label="FORGOT PASSWORD"></Btn>
        <Btn onPress={() => onSetActiveScreen('sign-up')} icon={IconNames.register} size={InputSizes.lg} block outlined color={Colors.dark['primary-shade-2']} label="SIGN UP" wrapperClasses='mt-5'></Btn>
      </View>
    </ContentSection>)
}