"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { signOut } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";

const Withdraw = () => {
  const [availableTextarea, setAvailableTextarea] = useState<boolean>(false);
  const [withdrawMessage, setWithdrawMessage] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [cancelMessage, setCancelMessage] = useState<string>("");

  const { toast } = useToast();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "custom") {
      setAvailableTextarea(true);
      setWithdrawMessage("");
    } else {
      setAvailableTextarea(false);
      setWithdrawMessage(e.target.value);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const message = availableTextarea ? customMessage : withdrawMessage;
    try {
      const response = await fetch(`/api/profile/account-cancellation`, {
        method: "DELETE",
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Hapus Akun Selamanya",
          description: "Anda tidak akan dapat menggunakan akun ini lagi.",
          variant: "destructive",
        });
        await signOut();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="px-3 h-[60px] flex items-center">
        <h2 className="text-base text-main-dark font-semibold">Hapus Akun</h2>
      </div>
      <form onSubmit={onSubmit} className="px-6 py-8">
        {step === 1 && (
          <>
            <p className="text-sm text-main-dark font-medium leading-[140%]">
              Dapatkah anda memberi tahu kami alasannya?
              <br />
              Ini akan sangat membantu untuk meningkatkan layanan kami.
            </p>
            <div className="py-6 space-y-6">
              {/* Terlalu banyak bug dan error */}
              <label
                htmlFor="terlalu_banyak_bug_dan_error"
                className="flex items-center gap-x-3"
              >
                <input
                  type="radio"
                  id="terlalu_banyak_bug_dan_error"
                  name="hapus_akun"
                  value="Terlalu banyak bug dan error"
                  onChange={onChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-main-dark font-medium">
                  Terlalu banyak bug dan error
                </span>
              </label>

              {/* Saya menggunakan layanan yang lain */}
              <label
                htmlFor="saya_menggunakan_layanan_yang_lain"
                className="flex items-center gap-x-3"
              >
                <input
                  type="radio"
                  id="saya_menggunakan_layanan_yang_lain"
                  name="hapus_akun"
                  value="Saya menggunakan layanan yang lain"
                  onChange={onChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-main-dark font-medium">
                  Saya menggunakan layanan yang lain
                </span>
              </label>

              {/* Saya tidak sering menggunakan Kripto Klub */}
              <label
                htmlFor="saya_tidak_sering_menggunakan_kripto_klub"
                className="flex items-center gap-x-3"
              >
                <input
                  type="radio"
                  id="saya_tidak_sering_menggunakan_kripto_klub"
                  name="hapus_akun"
                  value="Saya tidak sering menggunakan Kripto Klub"
                  onChange={onChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-main-dark font-medium">
                  Saya tidak sering menggunakan Kripto Klub
                </span>
              </label>

              {/* Kontennya tidak menarik untuk saya */}
              <label
                htmlFor="kontennya_tidak_menarik_untuk_saya"
                className="flex items-center gap-x-3 pb-5"
              >
                <input
                  type="radio"
                  id="kontennya_tidak_menarik_untuk_saya"
                  name="hapus_akun"
                  value="Kontennya tidak menarik untuk saya"
                  onChange={onChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-main-dark font-medium">
                  Kontennya tidak menarik untuk saya
                </span>
              </label>

              {/* Custom */}
              <label htmlFor="custom flex flex-col">
                <div>
                  <input
                    type="radio"
                    id="custom"
                    name="hapus_akun"
                    onChange={onChange}
                    className="w-4 h-4"
                  />
                </div>
                <textarea
                  disabled={!availableTextarea}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="mt-6 p-3 resize-none rounded-sm border border-status-inactive outline-none w-full h-[147px] text-sm text-main-dark font-normal disabled:cursor-not-allowed"
                ></textarea>
              </label>
              <button
                type="button"
                className="h-10 w-full rounded-sm bg-main-red flex items-center justify-center text-sm text-white font-semibold disabled:bg-white disabled:text-status-inactive disabled:border border-status-inactive disabled:cursor-not-allowed"
                onClick={() => setStep(2)}
                disabled={!customMessage && !withdrawMessage}
              >
                Konfirmasi
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-sm text-main-dark font-medium leading-[140%] mb-6">
              Apakah anda yakin untuk menghapus akun anda?
            </p>
            <div className="mb-6">
              <p className="text-sm text-main-dark font-medium leading-[140%] mb-2.5">
                Sebelum anda membiarkan kami pergi...
              </p>
              <ul className="p-3 list-disc space-y-3 bg-main-grey pl-8">
                <li className="text-sm text-main-dark font-medium leading-[140%]">
                  Anda akan kehilangan semua akses ke semua artikel, bookmark,
                  komentar, dan semua hal lain yang terhubung dengan akun anda.
                </li>
                <li className="text-sm text-main-dark font-medium leading-[140%]">
                  Anda tidak akan dapat menggunakan email yang terhubung ke akun
                  ini untuk pendaftaran di masa yang akan datang.
                </li>
              </ul>
            </div>
            <div className="mb-[70px]">
              <label htmlFor="check" className="flex items-center gap-x-3">
                <input
                  type="checkbox"
                  id="check"
                  className="w-4 h-4"
                  onChange={(e) =>
                    e.target.checked ? setCheckbox(true) : setCheckbox(false)
                  }
                />
                <span className="text-sm text-main-dark font-medium">
                  Saya memahami konsekuensi dari menghapus akun saya dan
                  menyetujui semua persyaratan.
                </span>
              </label>
            </div>
            <div className="mb-6">
              <p className="text-base text-main-dark font-semibold leading-none mb-4">
                Ketik HAPUS untuk menghapus akun anda SELAMANYA atau{" "}
                <span className="text-main-red">
                  klik disini untuk menyimpan akun anda
                </span>
              </p>
              <input
                type="text"
                placeholder="HAPUS"
                onChange={(e) => setCancelMessage(e.target.value)}
                className="h-10 rounded-sm border border-status-inactive px-[14px] w-full outline-none text-sm text-main-dark font-medium placeholder:text-status-inactive"
              />
            </div>
            <button
              type="submit"
              disabled={
                !checkbox ||
                cancelMessage !== "klik disini untuk menyimpan akun anda"
              }
              className="h-10 w-full disabled:border border-status-inactive rounded-sm text-sm font-semibold bg-main-red text-white disabled:bg-white disabled:text-status-inactive disabled:cursor-not-allowed"
            >
              Konfirmasi
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Withdraw;
