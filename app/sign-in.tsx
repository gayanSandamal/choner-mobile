import { View } from 'react-native';
import { Colors } from '@/constants/Colors';
import Authentications from '@/components/Authentications';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentSection } from '@/components/Wrappers/Sections';
import Logo from '@/components/Common/Logo';
import { useState } from 'react';
import SignUpScreen from '@/components/Authentications/SignUp';
import Label from '@/components/Base/Label';
import { FontTypes, IconNames, InputSizes } from '@/types/Components';
import { CharmBtn } from '@/components/Base/Button';
import SignInScreen from '@/components/Authentications/SignIn';
import ForgotPasswordScreen from '@/components/Authentications/ForgotPassword';

export default function SignIn() {
  const [activeScreen, setActiveScreen] = useState<string>('initial');
  return (
    <SafeAreaView className='flex items-center' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.grey }}>
      {activeScreen !== 'initial' && <View className='flex flex-row' style={{ position: 'absolute', width: '100%', maxWidth: 353, top: 70 }}>
        <CharmBtn icon={IconNames.chevronLeft} onPress={() => {
          router.replace('/');
        }} size={InputSizes.md} frame={false} />
      </View>}
      <ContentSection containerStyles={{ maxWidth: 353 }} cardMode={false}>
        <Logo style={{ width: 169, height: 66 }} />
      </ContentSection>
      {/* initial screen */}
      {activeScreen === 'initial' && <>
        <View style={{ height: 130 }}></View>
        <Authentications onSetActiveScreen={setActiveScreen} />
      </>}
      {activeScreen === 'sign-in' && <>
        <Label classNames='mb-8' type={FontTypes.FP} containerStyles={{ fontWeight: 700 }} label='SIGN IN' />
        <SignInScreen onSetActiveScreen={setActiveScreen} />
      </>}
      {activeScreen === 'sign-up' && <>
        <Label classNames='mb-8' type={FontTypes.FP} containerStyles={{ fontWeight: 700 }} label='SIGN UP' />
        <SignUpScreen onSetActiveScreen={setActiveScreen} />
      </>}
      {activeScreen === 'forgot-password' && <>
        <Label classNames='mb-8' type={FontTypes.FP} containerStyles={{ fontWeight: 700 }} label='RESET YOUR PASSWORD' />
        <ForgotPasswordScreen onSetActiveScreen={setActiveScreen} />
      </>}
    </SafeAreaView >
  );
}
