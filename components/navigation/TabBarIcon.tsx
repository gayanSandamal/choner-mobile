import { CharmBtn } from '../Base/Button';
import { InputSizes } from '@/types/Components';
import { router } from 'expo-router';

export function TabBarIcon({ style, ...rest }: any) {
  return <CharmBtn {...rest} onPress={() =>
    router.replace(rest.link)
  } size={InputSizes.md} frame={false} />;
}
