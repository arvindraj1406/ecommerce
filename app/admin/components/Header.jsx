"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { Avatar } from "@nextui-org/react";
import { Menu } from "lucide-react"; // call icon

// Define a functional React component named `Header`.
// It takes a `toggleSidebar` function as a prop, which will handle toggling the sidebar.
const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { data: admin } = useAdmin({ email: user?.email });
  return (
    <section className="fixed w-full top-0 bg-white flex items-center gap-3 border-b px-4 py-2">
      <div className="flex justify-center items-center md:hidden">
        {/* The button triggers the `toggleSidebar` function when clicked. */}
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <Menu />
        </button>
      </div>
      <div className="w-full flex justify-between items-center pr-0 md:pr-[260px]">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex gap-2 items-center">
          <div className="md:flex flex-col items-end hidden">
            <h1 className="text-sm font-semibold">{admin?.name}</h1>
            <h1 className="text-xs text-gray-600">{admin?.email}</h1>
          </div>
          <Avatar size="sm" src={admin?.imageUrl} />
        </div>
      </div>
    </section>
  );
};

export default Header;
