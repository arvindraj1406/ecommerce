"use client";

import { auth } from "@/lib/firebase";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const page = () => {
  const { user, isLoading } = useAuth();
  // Destructure the `user` object from the `useAuth` hook.
  // `useAuth` retrieves the authentication state provided by the `AuthContext`.

  const router = useRouter();
  // Initialize the `router` object using the `useRouter` hook from Next.js.
  // This allows programmatic navigation within the app.

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
      // If a `user` is authenticated (not null or undefined), navigate to the `/dashboard` route.
    }
  }, [user, isLoading]);
  return (
    <main className="w-full flex justify-center item-center bg-gray-300 md:p-24 m-0 px-2 py-5 min-h-screen">
      <section className="flex flex-col gap-3">
        <div className="flex justify-center">
          <img className="h-10" src="/logo.png" alt="Logo" />
        </div>
        <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
          <h1 className="text-xl font-medium">Login With Email</h1>
          <form action="" className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your Email"
              id="user-email"
              name="user-email"
              className="px-3 py-2 rounded-xl border focus:outline-none w-full text-sm"
            />
            <input
              type="password"
              placeholder="Enter your Password"
              id="user-password"
              name="user-password"
              className="px-3 py-2 rounded-xl border focus:outline-none w-full text-sm"
            />
            <Button color="primary">Login</Button>
          </form>
          <div className="flex justify-between">
            <Link href={`/sign-up`}>
              <button className="font-semibold text-sm text-blue-700">
                New ? Create Account
              </button>
            </Link>
            <Link href={`/forget-password`}>
              <button className="font-semibold text-sm text-blue-700">
                Forget password
              </button>
            </Link>
          </div>
          <hr />
          <SignInWithGoogleComponent />
        </div>
      </section>
    </main>
  );
};

export default page;

const SignInWithGoogleComponent = () => {
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the Google Sign-In process
  const handleLogin = async () => {
    setIsLoading(true); // Set loading state to true while processing login
    try {
      // Attempt to sign in using Google
      const user = await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      // Display an error message if sign-in fails
      toast.error(error?.message || "An error occurred during login.");
    }
    setIsLoading(false); // Reset loading state after the login attempt (success or failure)
  };
  return (
    // NextUI Button component with dynamic properties based on the loading state
    <Button
      isLoading={isLoading} //Shows a loading spinner if true
      isDisabled={isLoading} // Disables the button to prevent multiple clicks during loading
      onClick={handleLogin} // Trigger the handleLogin function when clicked
    >
      Sign In With Google
    </Button>
  );
};
