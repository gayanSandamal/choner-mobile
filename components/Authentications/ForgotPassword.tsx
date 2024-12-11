import { View, Text } from "react-native";
import { router } from 'expo-router';
import { Btn } from "../Base/Button";
import { IconNames, InputSizes } from "@/types/Components";
import { ContentSection } from "../Wrappers/Sections";
import { Input } from "../Base/Input";
import { fbSendPasswordResetEmail } from "@/auth";
import { useState } from "react";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const onPressResetEmail = () => {
    fbSendPasswordResetEmail(email).then(() => {
      router.replace('/sign-in');
    });
  };
  return (
    <ContentSection cardMode={false} containerStyles={{ maxWidth: 353 }}>
      <View className='flex items-center mt-3'>
        <Text></Text>
        <Input classNames='mb-5' placeholder={'Enter email'} value={email} onChange={setEmail} icon={IconNames.email} />
        <Btn onPress={onPressResetEmail} icon={IconNames.email} size={InputSizes.lg} block label="SEND RESET LINK"></Btn>
      </View>
    </ContentSection>)
}