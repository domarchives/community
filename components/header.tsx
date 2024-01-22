"use client";

import { useSession } from "next-auth/react";
import { Search } from "lucide-react";

import HeaderLogo from "@/components/header/header-logo";
import HeaderMenuList from "@/components/header/header-menu-list";
import HeaderLoginButton from "@/components/header/header-login-button";
import HeaderAvatar from "@/components/header/header-avatar";
import HeaderSearch from "@/components/header/header-search";
import MobileMenu from "@/components/header/mobile-menu";

const Header = () => {
  const { status } = useSession();

  return (
    <header className="h-[52px] md:h-20 w-full bg-white shadow-md z-50">
      {/* DESKTOP */}
      <nav className="hidden md:flex h-20 max-w-7xl mx-auto items-center justify-between px-10">
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

      {/* MOBILE */}
      <nav className="flex md:hidden h-[52px] px-5 items-center justify-between">
        <Search size={20} color="#525252" />
        <HeaderLogo />
        <MobileMenu />
      </nav>
    </header>
  );
};

export default Header;
