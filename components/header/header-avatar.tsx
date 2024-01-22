"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HeaderAvatar = () => {
  const { data: session } = useSession();

  return (
    <div className="h-20 flex items-center relative group cursor-pointer">
      {session?.user?.image ? (
        <Avatar>
          <AvatarImage
            src={session.user.image}
            alt={session.user.name as string}
            width={40}
            height={40}
            className="object-cover"
          />
          <AvatarFallback className="capitalize text-main-dark font-semibold">
            {session.user.name?.substring(0, 1)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar>
          <AvatarImage
            src="/images/default-profile.png"
            alt="Anonymous"
            width={40}
            height={40}
            className="object-cover"
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      )}

      <ul
        className="absolute inset-0 top-[60px] shadow-menu bg-white rounded-sm px-5 hidden group-hover:block  hover:cursor-default"
        style={{ width: "220px", height: "200px" }}
      >
        <li className="h-20 flex items-center gap-x-2.5 border-b border-main-grey">
          {session?.user?.image ? (
            <Avatar>
              <AvatarImage
                src={session.user.image}
                alt={session.user.name as string}
                width={40}
                height={40}
                className="object-cover"
              />
              <AvatarFallback className="text-main-dark font-semibold capitalize">
                {session.user.name?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarImage
                src="/images/default-profile.png"
                alt="Anonymous"
                width={40}
                height={40}
                className="object-cover"
              />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          )}
          <div className="flex items-center gap-x-1.5">
            {/* <span className="flex items-center justify-center rounded-sm h-4 w-[22px] border border-main-red text-xs text-main-red font-semibold leading-none">
              1
            </span> */}
            <p className="max-w-[100px] text-sm text-main-dark font-semibold">
              {session?.user?.name}
            </p>
          </div>
        </li>
        <li className="h-[60px] flex items-center gap-x-2.5">
          <Image
            src="/images/profil-saya.png"
            alt="Profil Saya"
            width={20}
            height={20}
            className="object-contain"
          />
          <Link
            href="/profil-saya"
            className="text-sm text-main-dark font-semibold hover:text-main-red"
          >
            Profil Saya
          </Link>
        </li>
        <li className="h-[60px] flex items-center gap-x-2.5">
          <Image
            src="/images/keluar.png"
            alt="Keluar"
            width={20}
            height={20}
            className="object-contain"
          />
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/masuk" })}
            className="text-sm text-main-dark font-semibold hover:text-main-red"
          >
            Keluar
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HeaderAvatar;
