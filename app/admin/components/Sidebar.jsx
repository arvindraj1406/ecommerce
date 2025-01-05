"use client";

import Link from "next/link";
import {
  Building2,
  Layers2,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  PackageOpen,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
  ChartBarStacked,
} from "lucide-react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Sidebar = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "Products",
      link: "/admin/products",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Customers",
      link: "/admin/customers",
      icon: <User className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "Reviews",
      link: "/admin/reviews",
      icon: <Star className="h-5 w-5" />,
    },
    {
      id: 5,
      name: "Collections",
      link: "/admin/collections",
      icon: <LibraryBig className="h-5 w-5" />,
    },
    {
      id: 6,
      name: "Categories",
      link: "/admin/categories",
      icon: <ChartBarStacked className="h-5 w-5" />,
    },
    {
      id: 7,
      name: "Brands",
      link: "/admin/brands",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      id: 8,
      name: "Orders",
      link: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      id: 9,
      name: "Admins",
      link: "/admin/admins",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];

  return (
    <section className="sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-50">
      <div className="flex justify-center pt-2">
        <Link href={`/`}>
          <img className="h-8" src="/logo.png" alt="" />
        </Link>
      </div>

      <ul className="flex-1 h-full  flex flex-col gap-2  scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 overflow-y-scroll">
        {menuList?.map((item, key) => {
          // Iterates over the `menuList` array using the `map` function.
          // For each element in the array, it returns a `Tab` component.
          return <Tab item={item} key={key} />;
        })}
      </ul>

      <div className="flex">
        <button
          onClick={async () => {
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
          className="flex gap-2 px-3 py-2 hover:bg-indigo-100 rounded-xl w-full ease-soft-spring duration-400 transition-all font-semibold"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </div>
    </section>
  );
};

const Tab = ({ item }) => {
  const pathname = usePathname(); // Fetches the current URL path using Next.js's `usePathname` hook.
  const isSelected = pathname === item?.link;
  // Compares the current path (`pathname`) with the `item.link` to check if the tab is selected.
  // `isSelected` is true if the current path matches the tab's link.
  return (
    <li key={item?.id} className="flex items-center px-1 py-0">
      <Link
        href={item?.link}
        className={`flex items-center w-full gap-2 px-3 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300 ${
          isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"
        }`}
      >
        {item?.icon} {item?.name}
      </Link>
    </li>
  );
};

export default Sidebar;
