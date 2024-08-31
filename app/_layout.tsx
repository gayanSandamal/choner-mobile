import { Slot, Stack } from 'expo-router';
import { SessionProvider } from './../hooks/ctx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Root() {
  return (
    <SessionProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='landing-page' />
        <Stack.Screen name='sign-in' />
        <Stack.Screen name='sign-up' />
        <Stack.Screen name='forgot-password' />
        <Stack.Screen name='(app)' />
      </Stack>
    </SessionProvider>
  );
}
