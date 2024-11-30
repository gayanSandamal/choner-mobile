import { View } from "react-native";
import { router, useFocusEffect } from 'expo-router';
import { useSession } from "@/hooks/ctx";
import { Btn } from "../Base/Button";
import { FontSizes, IconNames, InputSizes } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Colors } from '@/constants/Colors';
import { Input } from "../Base/Input";
import { fbSignIn } from './../../auth';
import { useCallback, useLayoutEffect, useState } from "react";
import { Toast } from "toastify-react-native";

export default function SignInScreen() {
  const { session, signIn } = useSession();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useLayoutEffect(() => {
    session && router.replace('/(app)')
  }, [session])

  const onShowConfirmPasswordPress = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const onPressSignIn = async () => {
    if (email?.trim() === '' || password?.trim() === '') {
      Toast.error('Please fill in all fields')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidated = email && emailPattern.test(email.toLowerCase());

    if (!emailValidated) {
      Toast.error('Invalid email address')
      return
    }
    
    setIsLoading(true)
    try {
      await fbSignIn(email, password).then((userCredential) => {      
        signIn(userCredential.user);
        if (userCredential.user) {
          router.replace('/(app)')
        }
      })
    } catch (e: any) {
      const isAuthError = e.code.includes('auth')
      let errMsg = e.code
      if (isAuthError) {
        errMsg = errMsg.replace('auth/', '')
      }
      Toast.error(errMsg)
    }
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
        <Input classNames='mb-5' placeholder={'ENTER EMAIL'} value={email} onChange={setEmail} icon={IconNames.email} focus={true} />
        <Input classNames='mb-5' placeholder={'ENTER PASSWORD'} value={password} onChange={setPassword} icon={IconNames.password} iconRight={showConfirmPassword ? IconNames.view : IconNames.hidden} onPressIconRight={onShowConfirmPasswordPress} secureTextEntry={!showConfirmPassword} />
        <Btn isLoading={isLoading} onPress={onPressSignIn} icon={IconNames.login} size={InputSizes.lg} block label="SIGN IN"></Btn>
        <Btn wrapperClasses='text-center mt-16' onPress={() => {}} link="/forgot-password" size={InputSizes.sm} textMode color={Colors.dark['grey-shade-2']} label="FORGOT PASSWORD"></Btn>
        <Btn wrapperClasses='mt-10' onPress={() => router.navigate('/sign-up')} icon={IconNames.register} size={InputSizes.lg} block outlined color={Colors.dark['primary-shade-2']} label="SIGN UP"></Btn>
      </View>
    </ContentSection>)
}