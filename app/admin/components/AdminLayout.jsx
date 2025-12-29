"use client";

import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { Button, CircularProgress } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  //isOpen represents whether the sidebar is currently open (true) or closed (false).

  const pathname = usePathname();
  // Fetches the current route pathname, allowing reactivity when the route changes.

  const sidebarRef = useRef(null);
  // A reference to the sidebar element, used for detecting clicks outside of the sidebar.

  const { user } = useAuth();
  const { data: admin, error, isLoading } = useAdmin({ email: user?.email });

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Inverts the current state (open becomes closed, and vice versa).
    console.log("Sidebar state:", !isOpen);
  };

  // Effect to toggle the sidebar automatically when the route changes
  useEffect(() => {
    toggleSidebar(); // // Closes or opens the sidebar whenever the route (pathname) changes.
  }, [pathname]);

  // Effect to handle clicks outside the sidebar and close it
  useEffect(() => {
    const handleClickOutsideEvent = (event) => {
      // Checks if the click occurred outside the sidebar
      if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
        setIsOpen(false); // Closes the sidebar if the click was outside its bounds.
      }
    };
    document.addEventListener("mousedown", handleClickOutsideEvent);
    // Listens for mouse clicks on the entire document
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEvent);
      // Cleans up the event listener when the component unmounts to avoid memory leaks
    };
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts.
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center item-center">
        <CircularProgress />
      </div>
    );
  }
  if (!admin) {
    return (
      <div className="h-screen w-full text-center flex flex-col justify-center item-center">
        <h1 className="text-xl">You are not Admin!</h1>
        <h2 className="text-gray-600 text-sm">{user?.email}</h2>
        <div className=" text-center w-full">
          <Button
            className=""
            onClick={async () => {
              await signOut(auth);
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-screen w-screen flex justify-center item-center">
        <h1 className="text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar for smaller screens */}
      <div // Attaches the reference to this div to detect outside clicks.
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <section className="flex-1 flex flex-col overflow-hidden min-h-screen">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />{" "}
        {/* Header component, passes `toggleSidebar` to allow the header to control the sidebar. */}
        {/* Content */}
        <section className="pt-16 flex-1 bg-[#eff3f4]">{children}</section>
      </section>
    </main>
  );
};

export default AdminLayout;
