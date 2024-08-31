import { View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentSection } from '@/components/Wrappers/Sections';
import Logo from '@/components/Common/Logo';
import Label from '@/components/Base/Label';
import { FontTypes, IconNames, InputSizes } from '@/types/Components';
import { CharmBtn } from '@/components/Base/Button';
import SignInScreen from '@/components/Authentications/SignIn';
import { router } from 'expo-router';

export default function SignIn() {

  return (
    <SafeAreaView className='flex items-center' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.grey }}>
      <View className='flex flex-row' style={{ position: 'absolute', width: '100%', maxWidth: 353, top: 70 }}>
        <CharmBtn icon={IconNames.chevronLeft} onPress={() => router.back()} size={InputSizes.md} frame={false} />
      </View>
      <ContentSection containerStyles={{ maxWidth: 353 }} cardMode={false}>
        <Logo style={{ width: 169, height: 66 }} />
      </ContentSection>
      <Label classNames='mb-8' type={FontTypes.FP} containerStyles={{ fontWeight: 700 }} label='SIGN IN' />
      <SignInScreen />
    </SafeAreaView >
  );
}
