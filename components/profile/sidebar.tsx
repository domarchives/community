import Link from "next/link";

import Clipboard from "@/components/svg/clipboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSessionUser } from "@/lib/auth";

const Sidebar = async () => {
  const session = await getSessionUser();

  return (
    <div className="space-y-2 md:space-y-[14px] md:w-[280px] bg-white md:bg-transparent">
      <div className="bg-brand-white rounded-md p-6 flex flex-col items-center justify-center">
        <Avatar className="w-[100px] h-[100px] mb-5">
          <AvatarImage
            src={session?.user.image || "/images/default-profile.png"}
            alt={session?.user.name || "profile"}
            className="object-cover"
          />
          <AvatarFallback className="text-sm text-brand-dark font-semibold capitalize">
            {session?.user.name?.substring(0, 1) || "A"}
          </AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-x-1.5 mb-2.5 pb-2.5">
          {/* <div className="w-[27px] h-[18px] rounded-sm border border-brand-red flex items-center justify-center text-sm text-brand-red leading-none font-semibold">
            1
          </div> */}
          <p className="text-base text-brand-dark font-semibold leading-none">
            {session?.user.name}
          </p>
        </div>

        {/* <div className="w-full py-2.5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs leading-none text-brand-red font-semibold">
              LV. 4
            </span>
            <span className="text-xs leading-none text-brand-inactive font-normal">
              000 / 000
            </span>
            <span className="text-xs leading-none text-brand-inactive font-semibold">
              LV. 5
            </span>
          </div>
          <div className="w-full h-[5px] rounded-[5px] bg-brand-gray relative overflow-hidden">
            <div
              className="absolute inset-0 bg-brand-red"
              style={{ width: "20%" }}
            />
          </div>
        </div> */}

        <div className="py-2.5 flex items-center gap-x-1.5">
          <span className="text-xs text-brand-subgray2 font-normal">
            Kode Rujukan Saya:
          </span>
          <span className="text-xs text-brand-dark font-semibold">
            {session?.user.referralCode || "-"}
          </span>
          {session?.user.referralCode && (
            <button
              type="button"
              className="hover:bg-brand-gray transition-colors rounded-full"
            >
              <Clipboard />
            </button>
          )}
        </div>
      </div>

      <Link
        href="/profil-saya/dompetku"
        className="h-10 w-full border border-brand-dark rounded-none md:rounded-sm flex justify-center items-center text-sm text-brand-dark font-medium hover:bg-brand-dark hover:text-brand-white transition-colors"
      >
        Dompetku
      </Link>
      <Link
        href="/profil-saya/histori-transaksi"
        className="h-10 w-full border border-brand-dark rounded-none md:rounded-sm flex justify-center items-center text-sm text-brand-dark font-medium hover:bg-brand-dark hover:text-brand-white transition-colors"
      >
        Histori Transaksi
      </Link>
      <Link
        href="/profil-saya"
        className="h-10 w-full border border-brand-dark rounded-none md:rounded-sm flex justify-center items-center text-sm text-brand-dark font-medium hover:bg-brand-dark hover:text-brand-white transition-colors"
      >
        Ubah Profil
      </Link>
      <Link
        href="/profil-saya/artikel-saya"
        className="h-10 w-full border border-brand-dark rounded-none md:rounded-sm flex justify-center items-center text-sm text-brand-dark font-medium hover:bg-brand-dark hover:text-brand-white transition-colors"
      >
        Artikel Saya
      </Link>
      <Link
        href="/tulis-artikel"
        className="h-10 w-full border border-brand-red bg-brand-red rounded-none md:rounded-sm flex justify-center items-center text-sm text-brand-white font-medium hover:bg-brand-red/80 transition-colors"
      >
        Tulis Artikel
      </Link>
      {session?.user.role.includes("ADMIN") && (
        <Link
          href="/perhatian/create"
          className="h-10 w-full border border-brand-red bg-brand-red rounded-sm flex justify-center items-center text-sm text-brand-white font-medium hover:bg-brand-red/80 transition-colors"
        >
          Perhatian
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
