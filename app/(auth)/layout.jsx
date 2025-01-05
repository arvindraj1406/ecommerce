"use client";

import AuthContextProvider from "@/contexts/AuthContext";

const Layout = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
export default Layout;
