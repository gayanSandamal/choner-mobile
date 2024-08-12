// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCj0kxaeZ_uX-MAMk25T7HttgWMqoNhn_A",
  projectId: "choner-6d275",
  appId: "1:483948063727:ios:b6e3717132a063715aa41a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };