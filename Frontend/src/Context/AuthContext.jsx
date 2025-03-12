import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./FireBaseConfig";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();

 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
   if (user) {
    setUser(user);
   } else {
    setUser(null);
   }
   setLoading(false);
  });
  return () => unsubscribe();
 }, []);

 const logOut = async () => {
  await auth.signOut();
  setUser(null);
  navigate("/login");
 };

 return (
  <AuthContext.Provider value={{ user, logOut, loading }}>
   {children}
  </AuthContext.Provider>
 );
};

export default AuthProvider;
