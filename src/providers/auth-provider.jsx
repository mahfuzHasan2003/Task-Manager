import { auth } from "@/firebase/firebase.init";
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // TODO: add user to DB
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
      await signInWithPopup(auth, provider);
      toast.success("You have successfully logged in.");
    } catch (error) {
      toast.error(error.message);
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
