import { View } from "react-native";
import { Btn } from "../Base/Button";
import { IconNames, InputSizes } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Colors } from '@/constants/Colors';
import { Input } from "../Base/Input";
import { fbSendEmailVerification, fbSignUp } from './../../auth';
import { useLayoutEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { UserCredential } from "firebase/auth";
import { useSession } from "@/hooks/ctx";

export default function SignUpScreen() {
  const user = useRef<UserCredential | null>(null)

  const { session, signIn } = useSession();

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useLayoutEffect(() => {
    session && router.replace('/')
  }, [session])
  
  const onShowPasswordPress = () => {
    setShowPassword(!showPassword);
  }

  const onShowConfirmPasswordPress = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const onPressSignUp = () => {
    setIsLoading(true)
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidated = emailPattern.test(email.toLowerCase());

    if (!emailValidated) {
      alert('Invalid email address');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    fbSignUp(email, password)
      .then((userCredential) => {
        user.current = userCredential
        if (userCredential.user) {
          if (!userCredential.user.emailVerified) {
            fbSendEmailVerification()
          }
          signIn(userCredential.user)
          router.replace('/survey')
        } else {
          router.navigate('/sign-in');
        }
      })
      .catch((error) => {
        alert('Error signing up. Try again');
      });
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    // router.replace('/');
    setIsLoading(false)
  }

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
        <Input classNames='mb-5' placeholder={'ENTER PASSWORD'} value={password} onChange={setPassword} icon={IconNames.password} iconRight={showPassword ? IconNames.view : IconNames.hidden} onPressIconRight={onShowPasswordPress} secureTextEntry={!showPassword} />
        <Input classNames='mb-5' placeholder={'CONFIRM PASSWORD'} value={confirmPassword} onChange={setConfirmPassword} icon={IconNames.password}  iconRight={showConfirmPassword ? IconNames.view : IconNames.hidden} onPressIconRight={onShowConfirmPasswordPress} secureTextEntry={!showConfirmPassword} />

        <Btn isLoading={isLoading} onPress={onPressSignUp} icon={IconNames.register} size={InputSizes.lg} block label="SIGN UP" wrapperClasses='mb-10'></Btn>

        <Btn onPress={() => router.navigate('/sign-in')} icon={IconNames.login} size={InputSizes.lg} block outlined color={Colors.dark['primary-shade-2']} label="SIGN IN" wrapperClasses='mt-5'></Btn>
      </View>
    </ContentSection>
  )
}