import { View } from "react-native";
import { router } from 'expo-router';
import { useSession } from "@/hooks/ctx";
import { Btn } from "../Base/Button";
import { IconNames, InputSizes } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Input } from "../Base/Input";

export default function ForgotPasswordScreen() {
  const { signIn } = useSession();
  const onPressSignIn = () => {
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace('/landing-page');
  };
  return (
    <ContentSection cardMode={false} containerStyles={{ maxWidth: 353 }}>
      <View className='flex items-center mt-3'>
        <Input classNames='mb-5' placeholder={'ENTER EMAIL'} value={undefined} icon={IconNames.email} />
        <Btn onPress={() => router.navigate('/sign-in')} icon={IconNames.login} size={InputSizes.lg} block label="SEND CODE"></Btn>
      </View>
    </ContentSection>)
}