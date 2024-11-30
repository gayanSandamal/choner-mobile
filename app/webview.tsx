import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, View, Dimensions } from 'react-native';
import { MainWrapper } from '@/components/Wrappers/MainWrapper';
import { CharmBtn } from '@/components/Base/Button';
import { IconNames, InputSizes } from '@/types/Components';
import { router, useGlobalSearchParams } from "expo-router";
import { Colors } from '@/constants/Colors';

const windowWidth = Dimensions.get('window').width;

export default function TermsOfUse() {
  const { uri } = useGlobalSearchParams()
  return (
    <MainWrapper>
      <WebView
        style={styles.container}
        source={{ uri: uri as unknown as string }}
      />
      <View className='flex flex-row' style={{ position: 'absolute', width: '100%', maxWidth: 353, top: 70 }}>
          <CharmBtn icon={IconNames.chevronLeft} onPress={() => router.back()} size={InputSizes.md} frame={false} />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    backgroundColor: Colors.dark.grey,
    marginTop: Constants.statusBarHeight,
  },
});
