// auth.js
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { Toast } from "toastify-react-native"

// Sign up new users
const fbSignUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in existing users
const fbSignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Send email verification
const fbSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser).then(() => {
    Toast.success("Email verification has been sent!");
  });
};

// Sign out users
const fblogOut = () => {
  return signOut(auth);
};

export { fbSignUp, fbSignIn, fbSendEmailVerification, fblogOut };