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
import { useState } from "react";

export default function SignInScreen() {
  const { signIn } = useSession();
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const onShowConfirmPasswordPress = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const onPressSignIn = () => {
    fbSignIn(email, password).then((userCredential) => {
      signIn(userCredential.user);
      if (userCredential.user) {
        router.replace('/')
      }
    })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
  };
  return (
    <ContentSection cardMode={false} containerStyles={{ maxWidth: 353 }}>
      <View className='flex items-center mt-3'>
        {/* TODO: Enable the below code block later */}
        {/* <View className="flex flex-row w-full items-center justify-between" style={{ maxWidth: 241 }}>
          <CharmBtn icon={IconNames.google} onPress={() => { }} size={InputSizes.lg} />
          <CharmBtn icon={IconNames.facebook} onPress={() => { }} size={InputSizes.lg} />
          <CharmBtn icon={IconNames.apple} onPress={() => { }} size={InputSizes.lg} />
        </View>
        <Separator /> */}
        <Input classNames='mb-5' placeholder={'ENTER EMAIL'} value={email} onChange={setEmail} icon={IconNames.email} />
        <Input classNames='mb-5' placeholder={'ENTER PASSWORD'} value={password} onChange={setPassword} icon={IconNames.password} iconRight={showConfirmPassword ? IconNames.view : IconNames.hidden} onPressIconRight={onShowConfirmPasswordPress} secureTextEntry={!showConfirmPassword} />
        <Btn onPress={onPressSignIn} icon={IconNames.login} size={InputSizes.lg} block label="SIGN IN"></Btn>
        <Btn wrapperClasses='text-center mt-16' onPress={() => {}} link="/forgot-password" size={InputSizes.sm} textMode color={Colors.dark['grey-shade-2']} label="FORGOT PASSWORD"></Btn>
        <Btn wrapperClasses='mt-10' onPress={() => router.navigate('/sign-up')} icon={IconNames.register} size={InputSizes.lg} block outlined color={Colors.dark['primary-shade-2']} label="SIGN UP"></Btn>
      </View>
    </ContentSection>)
}