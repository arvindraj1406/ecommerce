"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
// Create a context object for the authentication state.

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  // State to track the current user:
  // - `undefined`: Initial loading state.
  // - `null`: No user is logged in.
  // - `user`: The authenticated user object.

  useEffect(() => {
    // Use an effect to subscribe to the auth state changes when the component mounts.
    const unsub = onAuthStateChanged(auth, (user) => {
      // `onAuthStateChanged` listens for changes in the user's authentication state.
      if (user) {
        setUser(user); // Set the user state to the authenticated user.
      } else {
        setUser(null); // Set the user state to `null` when no user is logged in.
      }
    });
    return () => unsub();
    // Cleanup the subscription to prevent memory leaks when the component unmounts.
  }, []);
  // The empty dependency array ensures the effect runs only once, when the component mounts.

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: user === undefined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
// Export the provider component to wrap the app or specific parts of it.

export const useAuth = () => useContext(AuthContext);
// Export a custom hook to easily access the `AuthContext` values in other components.
