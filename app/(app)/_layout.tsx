import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "./../../global.css"
import { store, persistor } from '../../store.config';
import { Text, View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useSession } from '@/hooks/ctx';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useSession();
  const [loaded] = useFonts({
    PoppinsBlack: require('../../assets/fonts/Poppins-Black.ttf'),
    PoppinsBlackItalic: require('../../assets/fonts/Poppins-BlackItalic.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsBoldItalic: require('../../assets/fonts/Poppins-BoldItalic.ttf'),
    PoppinsExtraBold: require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    PoppinsExtraBoldItalic: require('../../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    PoppinsExtraLight: require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsExtraLightItalic: require('../../assets/fonts/Poppins-ExtraLightItalic.ttf'),
    PoppinsItalic: require('../../assets/fonts/Poppins-Italic.ttf'),
    PoppinsLight: require('../../assets/fonts/Poppins-Light.ttf'),
    PoppinsLightItalic: require('../../assets/fonts/Poppins-LightItalic.ttf'),
    PoppinsMedium: require('../../assets/fonts/Poppins-Medium.ttf'),
    PoppinsMediumItalic: require('../../assets/fonts/Poppins-MediumItalic.ttf'),
    PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBoldItalic: require('../../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    PoppinsThin: require('../../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return <View className='flex h-100 items-center justify-center'>
      <Text>Loading...</Text>
    </View>;
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: '' }} />
            <Stack.Screen name="product/[id]" options={({ route }) => ({
              title: route.params.title
            })} />
            <Stack.Screen name="shoppingCart" options={{ headerShown: true, title: 'Cart', headerTitle: '' }} />
          </Stack>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
