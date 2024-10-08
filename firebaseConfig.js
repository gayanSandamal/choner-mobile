import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// firebaseConfig.js

const firebaseConfig = {
  apiKey: "AIzaSyCj0kxaeZ_uX-MAMk25T7HttgWMqoNhn_A",
  projectId: "choner-6d275",
  appId: "1:483948063727:ios:b6e3717132a063715aa41a",
  storageBucket: "choner-6d275.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const storage = getStorage(app);

export { app, auth, storage };
