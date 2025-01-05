"use client";

import AuthContextProvider, { useAuth } from "@/contexts/AuthContext";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminLayout from "./components/AdminLayout";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      {/* Wraps the app with the authentication context provider */}
      <AdminChecking>
        {children}
        {/* Nested AdminChecking ensures user validation before rendering content */}
      </AdminChecking>
    </AuthContextProvider>
  );
}

function AdminChecking({ children }) {
  const { user, isLoading } = useAuth();
  // Extracts the current user and loading state from the AuthContext.
  const router = useRouter();
  // Enables programmatic navigation to redirect unauthenticated users.

  useEffect(() => {
    if (!user && !isLoading) {
      // Redirects to the login page if there is no authenticated user and loading is complete.
      router.push("/login");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress />
        {/* Displays a full-screen loader while checking the user's authentication status */}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1>Please Login First!</h1>{" "}
        {/* Displays a message if the user is unauthenticated after the loading state */}
      </div>
    );
  }

  return <AdminLayout>{children}</AdminLayout>; // If the user is authenticated, renders the `AdminLayout` with the children components.
}
