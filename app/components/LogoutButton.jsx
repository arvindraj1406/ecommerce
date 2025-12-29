"use client";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const { user } = useAuth();
  if (!user) {
    return <></>;
  }
  return (
    <button
      onClick={async () => {
        if (!confirm("Are you sure")) return;
        try {
          await toast.promise(signOut(auth), {
            error: (e) => e?.message,
            loading: "Loading...",
            success: "Sucessfully Logged Out",
          });
        } catch (error) {
          toast.error(error?.message);
        }
      }}
      className="h-6 w-6 flex justify-center items-center rounded-full hover:text-blue-700"
    >
      <LogOut size={18} />
    </button>
  );
}
