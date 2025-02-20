import { auth } from "@/firebase/firebase.init";
import useAxios from "@/hooks/use-axios";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const axios = useAxios();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  //   google sign in
  const provider = new GoogleAuthProvider();
  const googleSignIn = async () => {
    setAuthLoading(true);
    try {
      const {
        user: { email, photoURL, displayName },
      } = await signInWithPopup(auth, provider);
      toast.success("You have successfully logged in.");
      // adding user info to DB
      await axios.post("/user", { email, photoURL, displayName });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  //   logout user
  const logout = async () => {
    setAuthLoading(true);
    try {
      await signOut(auth);
      toast.success("You have successfully logged out.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const authData = { googleSignIn, user, authLoading, logout };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
