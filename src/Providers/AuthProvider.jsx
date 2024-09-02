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
    await axios.get(`${import.meta.env.VITE_TALKPAVILION_API}/logout`, {
      withCredentials: true,
    });
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
    try {
      // Fetch the existing user data
      const { data: existingUser } = await axios.get(
        `${import.meta.env.VITE_TALKPAVILION_API}/user/${user?.email}`
      );

      // If the user exists and their role/status hasn't changed, don't update
      if (
        existingUser &&
        existingUser.role === "bronze" &&
        existingUser.status === "unpaid" &&
        existingUser.name === user?.displayName
      ) {
        // No need to update
        return;
      }

      // If the user doesn't exist or has different role/status, update it
      const currentUser = {
        name: user?.displayName || existingUser?.name,
        email: user?.email,
        role: existingUser?.role || "bronze",
        status: existingUser?.status || "unpaid",
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_TALKPAVILION_API}/user/${user?.email}`,
        currentUser
      );

      return data;
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  //   Ovserver
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getToken(currentUser?.email);
        console.log(currentUser);
        saveUser(currentUser);
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
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
