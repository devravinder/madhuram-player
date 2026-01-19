import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// project overview > settings > general > Your apps
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);

export const isAuthenticated = () => Boolean(auth.currentUser)

export const provider = new GoogleAuthProvider();

type WithAccessTokenCallback<T> = (options: {
  headers: Record<string, string>;
}) => Promise<T>;

export const withAccessToken = async <T>(
  callback: WithAccessTokenCallback<T>
) => {
  const user = auth.currentUser;
  let token: string | undefined = "";

  try {
    token = await user?.getIdToken(true);
    if (!token) {
      throw new Error("Not authenticated");
    }
  } catch (error) {
    console.log({ error });
    window.location.reload();
  }

  return callback({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
