import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import "./../../global.css"
import { Image, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/hooks/ctx';
import { UserProvider } from '@/contexts/userContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const { session, isLoading } = useSession()

  useEffect(() => {
    if (isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading])

  if (isLoading) {
    return <View className='flex h-full w-full bg-grey items-center justify-center'>
      <Image source={require('../../assets/images/splash.png')} resizeMode='contain' style={{width: 420, marginTop: -5}}/>
    </View>
  }

  if (!session && !isLoading) {
    return <Redirect href={'/landing-page'} />
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(profile)" />
          <Stack.Screen name='survey' />
        </Stack>
      </UserProvider>
    </ThemeProvider>
  );
}
