"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";

import HeaderLogo from "@/components/header/header-logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const MobileMenu = () => {
  const { data: session, status } = useSession();

  const [komunitasOpen, setKomunitasOpen] = useState<boolean>(true);
  const [beritaOpen, setBeritaOpen] = useState<boolean>(true);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-0 hover:bg-transparent">
          <Menu size={24} color="#525252" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-full overflow-y-auto">
        <SheetHeader className="flex items-center justify-center">
          <HeaderLogo />
        </SheetHeader>
        {status === "authenticated" ? (
          <div className="py-4">
            <div className="h-[94px] flex items-center justify-center gap-5">
              <Image
                src={session.user.image || "/images/default-profile.png"}
                alt={session.user.name as string}
                height={40}
                width={40}
                className="object-cover rounded-full w-[40px] h-[40px]"
              />
              <div className="flex items-center gap-1.5">
                <p className="text-base text-main-dark font-semibold">
                  {session.user.name}
                </p>
                <Link href="/profil-saya">
                  <SheetClose>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.85067 0.32509L10.6006 1.0753C11.0394 1.50875 11.0394 2.2145 10.6006 2.64796L3.25159 10H0.929688V7.67713L6.70666 1.89219L8.27867 0.32509C8.71194 -0.108363 9.4174 -0.108363 9.85067 0.32509ZM2.04064 8.88858L2.82387 8.92192L8.27867 3.45929L7.49544 2.67574L2.04064 8.13281V8.88858Z"
                        fill="#B5B5B5"
                      />
                    </svg>
                  </SheetClose>
                </Link>
              </div>
            </div>
            <Link
              href="/tulis-artikel"
              className="h-10 w-full bg-main-red flex items-center justify-center rounded-sm text-sm text-white font-semibold"
            >
              <SheetClose className="w-full h-full">Tulis Artikel</SheetClose>
            </Link>
          </div>
        ) : (
          <div className="h-20 flex items-center justify-center">
            <Link
              href="/masuk"
              className="h-10 bg-main-red rounded-sm text-sm text-white w-full flex items-center justify-center font-semibold"
            >
              <SheetClose className="w-full h-full">Masuk</SheetClose>
            </Link>
          </div>
        )}

        <ul>
          {/* Komunitas */}
          <li className="w-full flex items-center">
            <Collapsible
              open={komunitasOpen}
              onOpenChange={setKomunitasOpen}
              className="w-full"
            >
              <div className="h-[68px] w-full flex items-center justify-between cursor-pointer">
                <h2 className="text-xl text-main-dark font-semibold">
                  <Link href="/komunitas">
                    <SheetClose>Komunitas</SheetClose>
                  </Link>
                </h2>
                <CollapsibleTrigger asChild>
                  {komunitasOpen ? (
                    <ChevronDown size={20} color="#525252" />
                  ) : (
                    <ChevronRight size={20} color="#525252" />
                  )}
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <ul>
                  <li className="h-11 flex items-center">
                    <Link
                      href="/komunitas/umum"
                      className="text-sm text-main-dark font-medium"
                    >
                      <SheetClose>Umum</SheetClose>
                    </Link>
                  </li>
                  <li className="h-11 flex items-center">
                    <Link
                      href="/komunitas/komunitas-koin"
                      className="text-sm text-main-dark font-medium"
                    >
                      <SheetClose>Komunitas Koin</SheetClose>
                    </Link>
                  </li>
                  <li className="h-11 flex items-center">
                    <Link
                      href="/komunitas/informasi-koin"
                      className="text-sm text-main-dark font-medium"
                    >
                      <SheetClose>Informasi Koin</SheetClose>
                    </Link>
                  </li>
                  <li className="h-11 flex items-center">
                    <Link
                      href="/komunitas/nft-metaverse"
                      className="text-sm text-main-dark font-medium"
                    >
                      <SheetClose>NFT / Metarverse</SheetClose>
                    </Link>
                  </li>
                  <li className="h-11 flex items-center">
                    <Link
                      href="/komunitas/galeri-meme"
                      className="text-sm text-main-dark font-medium"
                    >
                      <SheetClose>Galeri Meme</SheetClose>
                    </Link>
                  </li>
                  <li className="h-11 flex items-center">
                    <Link
                      href="/komunitas/galeri"
                      className="text-sm text-main-dark font-medium"
                    >
                      <SheetClose>Galeri</SheetClose>
                    </Link>
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </li>
          {/* Berita */}
          <li className="w-full flex items-center">
            <Collapsible
              open={beritaOpen}
              onOpenChange={setBeritaOpen}
              className="w-full"
            >
              <div className="h-[68px] w-full flex items-center justify-between cursor-pointer">
                <h2 className="text-xl text-main-dark font-semibold">
                  <Link href="/berita">
                    <SheetClose>Berita</SheetClose>
                  </Link>
                </h2>
                <CollapsibleTrigger asChild>
                  {beritaOpen ? (
                    <ChevronDown size={20} color="#525252" />
                  ) : (
                    <ChevronRight size={20} color="#525252" />
                  )}
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <ul>
                  <li className="h-11 flex items-center">
                    <Link
                      href="/berita/berita-utama"
                      className="text-sm text-main-dark font-medium"
                    >
                      <SheetClose>Berita Utatma</SheetClose>
                    </Link>
                  </li>
                  <li className="h-11 flex items-center">
                    <Link
                      href="/berita/berita-terbaru"
                      className="text-sm text-main-dark font-medium"
                    >
                      <SheetClose>Berita Terbaru</SheetClose>
                    </Link>
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </li>
        </ul>

        <div className="h-20 flex items-center">
          <Button
            className="h-10 w-full border-main-dark hover:bg-main-dark hover:text-white font-semibold"
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/masuk" })}
          >
            Keluar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
