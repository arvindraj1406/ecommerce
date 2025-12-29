import {
  Heart,
  Search,
  ShoppingCart,
  UserCircle,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/contexts/AuthContext";

const Header = () => {
  const menuList = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "About",
      link: "/about-us",
    },
    {
      id: 3,
      name: "Contact",
      link: "/contact-us",
    },
  ];
  return (
    <nav className="sticky top-0 z-50 py-2 px-5 md:py-2 md:px-14 border-b flex items-center justify-between">
      <img className="h-4 md:h-8" src="/logo.png" alt="" />
      <div className="hidden md:flex  gap-4 items-center font-semibold">
        {menuList?.map((item) => {
          return (
            <Link key={item?.id} href={item?.link}>
              <button className="text-sm px-2 py-1 rounded-lg hover:text-blue-700">
                {item?.name}
              </button>
            </Link>
          );
        })}
      </div>

      <div className="flex item-center gap-3">
        <Link href={`/search`}>
          <button
            className="h-6 w-6 flex justify-center items-center rounded-full hover:text-blue-700"
            title="Search Product"
          >
            <Search size={18} />
          </button>
        </Link>
        <Link href={`/favourites`}>
          <button
            className="h-6 w-6 flex justify-center items-center rounded-full hover:text-blue-700"
            title="My Favourite"
          >
            <Heart size={18} />
          </button>
        </Link>
        <Link href={`/cart`}>
          <button
            className="h-6 w-6 flex justify-center items-center rounded-full hover:text-blue-700"
            title="Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </Link>
        <Link href={`/account`}>
          <button
            className="h-6 w-6 flex justify-center items-center rounded-full hover:text-blue-700"
            title="Account"
          >
            <UserCircle2 size={18} />
          </button>
        </Link>
        <AuthContextProvider>
          <LogoutButton />
        </AuthContextProvider>
      </div>
    </nav>
  );
};

export default Header;
