import { View } from "react-native";
import { router } from 'expo-router';
import { useSession } from "@/hooks/ctx";
import { Btn, CharmBtn } from "../Base/Button";
import { IconNames, InputSizes, SignUpScreenProps } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Colors } from '@/constants/Colors';
import { Input } from "../Base/Input";
import { Separator } from "../Base/Separator";

export default function ForgotPasswordScreen(props: SignUpScreenProps) {
  const { onSetActiveScreen } = props;
  const { signIn } = useSession();
  const onPressSignIn = () => {
    signIn();
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace('/');
  };
  return (
    <ContentSection cardMode={false} containerStyles={{ maxWidth: 353 }}>
      <View className='flex items-center mt-3'>
        <Input classNames='mb-5' placeholder={'ENTER EMAIL'} value={undefined} icon={IconNames.email} />
        <Btn onPress={onPressSignIn} icon={IconNames.login} size={InputSizes.lg} block label="SIGN IN"></Btn>
      </View>
    </ContentSection>)
}