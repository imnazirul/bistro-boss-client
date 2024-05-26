/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateRegisterProfile = (fullName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: photoURL,
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("on state changed", currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, [reload]);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateRegisterProfile,
    setReload,
    reload,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
