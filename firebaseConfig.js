import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// firebaseConfig.js

const firebaseConfig = {
  apiKey: "AIzaSyCj0kxaeZ_uX-MAMk25T7HttgWMqoNhn_A",
  projectId: "choner-6d275",
  appId: "1:483948063727:ios:b6e3717132a063715aa41a"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  dataStorage: AsyncStorage
});

export { auth };
