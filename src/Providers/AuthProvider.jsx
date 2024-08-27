import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

// Context
export const AuthContext = createContext(null);
const auth = getAuth(app);
//   google provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Update User
  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //   Signin user
  const signin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Goole Signin
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   Reset password
  const resetPass = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  //   Logout user
  const logOut = async () => {
    setLoading(true);
    // await axios.get(`${import.meta.env.VITE_TALKPAVILION_API}/logout`, {
    //   withCredentials: true,
    // });
    return signOut(auth);
  };

  //   Get Token from Server
  const getToken = async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_TALKPAVILION_API}/jwt`,
      {
        email,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  };

  // Save user in database
  const saveUser = async (user) => {
    const currentUser = {
      email: user?.email,
      role: "guest",
      status: "verified",
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_TALKPAVILION_API}/user`,
      currentUser
    );
    return data;
    // console.log(data);
  };

  //   Ovserver
  // useEffect(() => {
  //   const unsebscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     console.log("from authprovider", currentUser);

  //     if (currentUser) {
  //       getToken(currentUser.email);
  //     }
  //     setLoading(false);
  //   });
  //   return () => {
  //     return unsebscribe();
  //   };
  // }, []);

  // Observe user state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
      if (currentUser?.email) {
        saveUser(currentUser);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  //   Auth Info
  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    updateUser,
    signin,
    googleSignIn,
    resetPass,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
