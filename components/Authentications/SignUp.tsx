import { View, Text } from "react-native";
import { router } from 'expo-router';
import { useSession } from "@/hooks/ctx";
import { Btn } from "../Base/Button";
import { FontTypes, IconNames, InputSizes } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Colors } from '@/constants/Colors';
import Label from '../Base/Label';

export default function SignUpScreen() {
  const { signIn } = useSession();
  const onPressSignIn = () => {
    signIn();
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace('/');
  };
  return (
    <ContentSection cardMode={false} containerStyles={{ maxWidth: 353 }}>
      <Btn onPress={onPressSignIn} icon={IconNames.login} size={InputSizes.lg} block label="SIGN UP"></Btn>
      <View className='flex items-center mt-6'>
        <Btn wrapperClasses='text-center' onPress={onPressSignIn} size={InputSizes.sm} textMode link={'/'} color={Colors.dark['grey-shade-2']} label="FORGOT PASSWORD"></Btn>
      </View>
    </ContentSection>)
}