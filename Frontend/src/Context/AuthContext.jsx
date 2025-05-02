import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./FireBaseConfig";

// Redux imports
import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "../Store/store"; // adjust the path if needed
import { persistor } from "../Store/store"; // adjust the path if needed

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setLocalUser] = useState(null); // local state for context
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        setLocalUser(userData);
        dispatch(setUser(userData)); // update Redux too
      } else {
        setLocalUser(null);
        dispatch(logoutUser()); // clear Redux
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const logOut = async () => {
    try {
      await auth.signOut();
      setLocalUser(null); // Clear local context
      dispatch(logoutUser()); // Clear Redux
      persistor.purge(); // Clear redux-persist (localStorage)
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logOut, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
