"use client";

import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  //isOpen represents whether the sidebar is currently open (true) or closed (false).

  const pathname = usePathname();
  // Fetches the current route pathname, allowing reactivity when the route changes.

  const sidebarRef = useRef(null);
  // A reference to the sidebar element, used for detecting clicks outside of the sidebar.

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
      <section className="flex-1 flex flex-col">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />{" "}
        {/* Header component, passes `toggleSidebar` to allow the header to control the sidebar. */}
        {/* Content */}
        <section className="flex-1 bg-[#eff3f4]">{children}</section>
      </section>
    </main>
  );
};

export default AdminLayout;
