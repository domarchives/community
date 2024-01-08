"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Edit from "@/components/svg/edit";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <section className="w-full bg-brand-white">
      <div className="p-6 pb-2.5 flex items-start justify-between gap-x-5">
        <div className="flex items-center gap-5">
          <Avatar className="h-[60px] w-[60px]">
            <AvatarImage
              src={session?.user.image || "/images/default-profile.png"}
              alt="profile"
              className="object-cover"
            />
            <AvatarFallback className="text-brand-dark font-semibold capitalize">
              {session?.user?.name?.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-[27px] h-[18px] text-sm text-brand-red font-semibold border border-brand-red rounded-sm flex justify-center items-center leading-none">
                1
              </div>
              <p className="text-base text-brand-dark font-semibold leading-none">
                {session?.user.name}
              </p>
              <Link href="/profil-saya">
                <Edit />
              </Link>
            </div>
            <p className="text-xs text-brand-inactive font-medium leading-none">
              30% lagi untuk naik LV.5
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/masuk" })}
          className="w-[76px] h-[26px] border border-brand-inactive hover:border-brand-inactive/20 rounded-sm text-xs text-brand-inactive font-semibold leading-none flex justify-center items-center hover:text-brand-white hover:bg-main-dark transition-colors"
        >
          KELUAR
        </button>
      </div>
      <div className="py-2.5 px-5 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-brand-red font-semibold leading-none">
            LV. 4
          </span>
          <span className="text-xs text-brand-inactive font-medium leading-none">
            000 / 000
          </span>
          <span className="text-xs text-brand-inactive font-semibold leading-none">
            LV. 5
          </span>
        </div>
        <div className="relative w-full h-[5px] rounded-sm overflow-hidden bg-brand-gray">
          <div className="w-[20%] h-full bg-brand-red" />
        </div>
      </div>
      <Link
        href="/tulis-artikel"
        className="w-full h-12 bg-brand-red text-brand-white text-sm font-semibold flex items-center justify-center hover:bg-brand-red/80 transition-colors"
      >
        Tulis Artikel
      </Link>
    </section>
  );
};

export default Profile;
