"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

const HeaderMenuList = () => {
  const pathname = usePathname();

  const menuList = useMemo(
    () => [
      {
        label: "Komunitas",
        href: "/komunitas",
        active: pathname === "/komunitas",
        subMenuList: [
          {
            label: "Umum",
            href: "/komunitas/umum",
            active: pathname === "/komunitas/umum",
          },
          {
            label: "Komunitas Koin",
            href: "/komunitas/komunitas-koin",
            active: pathname === "/komunitas/komunitas-koin",
          },
          {
            label: "Informasi Koin",
            href: "/komunitas/informasi-koin",
            active: pathname === "/komunitas/informasi-koin",
          },
          {
            label: "NFT / Metaverse",
            href: "/komunitas/nft-metaverse",
            active: pathname === "/komunitas/nft-metaverse",
          },
          {
            label: "Galeri Meme",
            href: "/komunitas/galeri-meme",
            active: pathname === "/komunitas/galeri-meme",
          },
          {
            label: "Galeri",
            href: "/komunitas/galeri",
            active: pathname === "/komunitas/galeri",
          },
        ],
        subMenuHeight: "324px",
      },
      {
        label: "Berita",
        href: "/berita",
        active: pathname === "/berita",
        subMenuList: [
          {
            label: "Berita Utama",
            href: "/berita/berita-utama",
            active: pathname === "/berita/berita-utama",
          },
          {
            label: "Berita Terbaru",
            href: "/berita/berita-terbaru",
            active: pathname === "/berita/berita-terbaru",
          },
        ],
        subMenuHeight: "108px",
      },
      {
        label: "Informasi Pasar",
        href: "/informasi-pasar",
        active: pathname === "/informasi-pasar",
      },
    ],
    [pathname]
  );

  return (
    <ul className="h-20 flex items-center gap-x-10">
      {menuList.map((menu) => (
        <li
          key={`header-menu-${menu.label}`}
          className="h-20 flex items-center relative group"
        >
          <Link href={menu.href} className="flex items-center gap-x-2.5">
            <span
              className={cn(
                "text-sm text-main-dark font-medium hover:text-main-red transition-colors",
                menu.active && "text-main-red"
              )}
            >
              {menu.label}
            </span>
            <Image
              src="/images/chevron-down.svg"
              alt="More"
              width={12}
              height={12}
              className="object-contain"
            />
          </Link>
          {menu.subMenuList && (
            <ul
              className="absolute inset-0 top-[55px] bg-white shadow-menu hidden group-hover:block"
              style={{ height: menu.subMenuHeight, width: "220px" }}
            >
              {menu.subMenuList.map((subMenu) => (
                <li
                  key={`header-submenu-${subMenu.label}`}
                  className="h-[54px] flex items-center px-5"
                >
                  <Link
                    href={subMenu.href}
                    className={cn(
                      "text-main-dark text-sm font-semibold leading-none hover:text-main-red transition-colors",
                      subMenu.active && "text-main-red"
                    )}
                  >
                    {subMenu.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default HeaderMenuList;
