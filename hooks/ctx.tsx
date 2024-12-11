import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './../hooks/useStorageState';
import { Toast } from 'toastify-react-native';

const AuthContext = createContext<{
  signIn: (userCredential: any) => void;
  signOut: (uid: string | null) => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (userCredential: any) => null,
  signOut: (uid: string | null) => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {  
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (userCredential: any) => {
          try {
            const essentials = {
              'uid': userCredential?.uid,
              'displayName': userCredential?.displayName || '',
              'email': userCredential?.email,
              'emailVerified': userCredential?.emailVerified || false,
              'phoneNumber': userCredential?.phoneNumber || '',
              'photoURL': userCredential?.photoURL || '', 
            };
            
            setSession(JSON.stringify(essentials));
          } catch (e) {
            console.error('Error saving user session', e);
            Toast.error('Error saving user session');
          }
        },
        signOut: (uid: string | null) => {
          // Enabe if fetched user cache need to be removed on sign-out
          // queryClient.removeQueries({queryKey: [QueryKeys.USER, uid], exact: !!uid})
          setSession(null);
        },
        session,
        isLoading,
      }
      }>
      {children}
    </AuthContext.Provider>
  );
}
