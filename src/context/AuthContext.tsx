import LoginPage from "@/components/auth/LoginPage";
import LoadingPage from "@/components/LoadingPage";
import { DEFAULT_PROFILE_IMAGE } from "@/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { clearData } from "@/services/db";
import { auth, provider } from "@/services/firebaseUtil";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  type User,
  type UserCredential,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthenticationContextType = {
  user: User;
  token: string;
  isLoading: boolean;
  loginWithRedirect: () => Promise<void>;
  loginWithPopup: () => Promise<void>;
  demoLogin: () => void;
  logout: () => void;
};

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);

const demoUser: User = {
  displayName: "Music Lover",
  email: "music.lover@madhuram.com",
  photoURL: DEFAULT_PROFILE_IMAGE,
  emailVerified: false,
  isAnonymous: true,
} as User;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userEmail, setUserEmail] = useLocalStorage<string>("user-email", "");
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const demoLogin = () => {
    setUser(demoUser);
  };
  const handleAuthResult = async (result: UserCredential) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    setToken(credential?.accessToken || "");
    setUser(result.user);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        console.log("onAuthStateChanged currentUser present");
        setUser(currentUser);
      } else {
        console.log("onAuthStateChanged currentUser not present");
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleRedirectSignIn = async () => {
    const result = await getRedirectResult(auth);
    if (result) await handleAuthResult(result);
  };

  useEffect(() => {
    handleRedirectSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const clearOldData = async () => {
      if (user) {
        if (userEmail && userEmail !== user.email) {
          setUserEmail(user.email!);
          // clear previous user data
          await clearData();
        } else {
          setUserEmail(user.email!);
        }
      }
    };

    clearOldData();
  }, [user]);

  const loginWithRedirect = async () => {
    await signInWithRedirect(auth, provider);
  };

  const loginWithPopup = async () => {
    const result = await signInWithPopup(auth, provider);
    await handleAuthResult(result);
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user: user!,
        token,
        loginWithRedirect,
        loginWithPopup,
        logout,
        demoLogin,
        isLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationContextProvider",
    );
  }
  return context;
};

export const SecureComponent = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingPage />;
  return user ? children : <LoginPage />;
};
