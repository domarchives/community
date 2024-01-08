"use client";

import { useSession } from "next-auth/react";

import HeaderLogo from "@/components/header/header-logo";
import HeaderMenuList from "@/components/header/header-menu-list";
import HeaderLoginButton from "@/components/header/header-login-button";
import HeaderAvatar from "@/components/header/header-avatar";
import HeaderSearch from "@/components/header/header-search";

const Header = () => {
  const { status } = useSession();

  return (
    <header className="h-20 w-full bg-white shadow-md z-50">
      <nav className="h-20 max-w-7xl mx-auto flex items-center justify-between px-10">
        <div className="h-20 flex items-center gap-10">
          <HeaderLogo />
          <HeaderMenuList />
        </div>
        <div className="flex items-center gap-x-2.5">
          {status === "authenticated" ? (
            <HeaderAvatar />
          ) : (
            <HeaderLoginButton />
          )}
          <HeaderSearch />
        </div>
      </nav>
    </header>
  );
};

export default Header;
