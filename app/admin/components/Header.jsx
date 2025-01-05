"use client";

import { Menu } from "lucide-react"; // call icon

// Define a functional React component named `Header`.
// It takes a `toggleSidebar` function as a prop, which will handle toggling the sidebar.
const Header = ({ toggleSidebar }) => {
  return (
    <section className="bg-white flex items-center gap-3 border-b px-4 py-5">
      <div className="flex justify-center items-center md:hidden">
        {/* The button triggers the `toggleSidebar` function when clicked. */}
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <Menu />
        </button>
      </div>
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </section>
  );
};

export default Header;
