import { Stack } from 'expo-router';
import { SessionProvider } from './../hooks/ctx';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native/Libraries/AppState/AppState';
import ToastManager from 'toastify-react-native'
import { Colors } from '@/constants/Colors';

const queryClient = new QueryClient()

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === 'active')
}

export default function Root() {
  useEffect(() => {
    const subscription = AppState?.addEventListener('change', onAppStateChange)
  
    return () => subscription?.remove()
  }, [])
  
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ToastManager showCloseIcon={false} showProgressBar={false} style={{height: 50, borderRadius: 40, backgroundColor: Colors.dark.darkText}} textStyle={{fontSize: 14, color: Colors.light.white}} />
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name='landing-page' />
          <Stack.Screen name='sign-in' />
          <Stack.Screen name='sign-up' />
          <Stack.Screen name='forgot-password' />
          <Stack.Screen name='(app)' />
        </Stack>
      </SessionProvider>
    </QueryClientProvider>
  );
}
