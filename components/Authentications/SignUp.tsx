import { View } from "react-native";
import { router } from 'expo-router';
import { useSession } from "@/hooks/ctx";
import { Btn, CharmBtn } from "../Base/Button";
import { IconNames, InputSizes, SignUpScreenProps } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Colors } from '@/constants/Colors';
import { Input } from "../Base/Input";
import { Separator } from "../Base/Separator";

export default function SignUpScreen(props: SignUpScreenProps) {
  const { onSetActiveScreen } = props;
  const { signIn } = useSession();
  const onPressSignUp = () => {
    signIn();
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
        <Input classNames='mb-5' placeholder={'CONFIRM PASSWORD'} value={undefined} icon={IconNames.password} />
        <Btn onPress={onPressSignUp} icon={IconNames.register} size={InputSizes.lg} block label="SIGN UP" wrapperClasses='mb-10'></Btn>

        <Btn onPress={() => onSetActiveScreen('sign-in')} icon={IconNames.login} size={InputSizes.lg} block outlined color={Colors.dark['primary-shade-2']} label="SIGN IN" wrapperClasses='mt-5'></Btn>
      </View>
    </ContentSection>)
}