// auth.js
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign up new users
const fbSignUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in existing users
const fbSignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign out users
const fblogOut = () => {
  return signOut(auth);
};

export { fbSignUp, fbSignIn, fblogOut };