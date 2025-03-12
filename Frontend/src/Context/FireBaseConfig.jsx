import { initializeApp } from "@firebase/app";
import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signUpWithGoogle = async () => {
  setLoading(true);
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google Sign-In User:", user);

    // Check if email already exists in MongoDB
    const emailExistsMongo = await checkEmailExistsMongo(user.email);
    if (emailExistsMongo) {
      console.log(`Email ${user.email} is already registered.`);
      return;
    }

    // Use Promise.all to save the user to both Firebase and MongoDB at the same time
    await Promise.all([
      registerUserToMongo(user.displayName, user.uid), // Only sending name and uid
    ]);
    setUser(user);
    navigate("/");
  } catch (error) {
    console.error("Error during Google Sign-In popup:", error.message);
  } finally {
    setLoading(false);
  }
};

export const checkEmailExistsMongo = async (uid) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/auth/check-user`,
        { uid }
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email in Mongo:", error.message);
      return false;
    }
  };