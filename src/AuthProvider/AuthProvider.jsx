/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";

export const AuthContext = createContext([]);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const axiosSecure = useAxiosSecure();

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

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = {
          email: currentUser.email,
        };
        // set token and store it
        axiosSecure.post("/jwt", userInfo).then((res) => {
          localStorage.setItem("access-token", res.data?.token);
        });
      } else {
        //delete the token if it is stored
        localStorage.removeItem("access-token");
      }
      console.log("on state changed", currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, [axiosSecure, reload]);

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
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
