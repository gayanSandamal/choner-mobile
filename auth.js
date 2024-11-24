// auth.js
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
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

// Send password reset email promise
const fbSendPasswordResetEmail = (email) => {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Toast.success("Password reset email has been sent!");
        resolve();
      })
      .catch((e) => {
        const isAuthError = e.code.includes('auth')
        let errMsg = e.code
        if (isAuthError) {
          errMsg = errMsg.replace('auth/', '')
        }
        Toast.error(errMsg)
        reject(e);
      });
  });
};

// Sign out users
const fblogOut = () => {
  return signOut(auth);
};

export { fbSignUp, fbSignIn, fbSendEmailVerification, fbSendPasswordResetEmail, fblogOut };