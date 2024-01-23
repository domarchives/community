"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

const SideNavigation = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
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
    [pathname]
  );

  return (
    <section className="bg-brand-white">
      <div className="p-5 border-b border-brand-gray">
        <Link
          href="/tulis-artikel"
          className="flex items-center justify-center rounded-sm h-10 w-full bg-brand-red text-sm font-semibold text-brand-white hover:bg-brand-red/80 transition-colors"
        >
          Tulis Artikel
        </Link>
      </div>
      <div className="grid grid-rows-1 grid-flow-col gap-y-1 gap-x-2 p-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "p-3 text-sm text-brand-dark font-medium hover:bg-brand-gray transition-colors text-center",
              route.active && "bg-brand-gray"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SideNavigation;
