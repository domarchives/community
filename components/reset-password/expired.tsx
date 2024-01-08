import Link from "next/link";

const Expired = () => {
  return (
    <section className="max-w-[420px] mx-auto my-[120px] p-6 flex flex-col justify-center items-center">
      <h2 className="text-[32px] text-main-dark font-semibold leading-none mb-5">
        Tautan Kadaluarsa
      </h2>
      <p className="text-sm text-main-dark font-medium leading-[140%] mb-10">
        Tautan Anda telah kadaluarsa. Silakan coba lagi.
      </p>
      <div className="flex items-center justify-center gap-x-2.5">
        <Link
          href="/"
          className="w-[160px] h-10 bg-main-red rounded-sm flex items-center justify-center text-white text-sm font-semibold"
        >
          Batal
        </Link>
        <Link
          href="/lupa-sandi"
          className="w-[160px] h-10 bg-main-red rounded-sm flex items-center justify-center text-white text-sm font-semibold"
        >
          Kirim Ulang Tautan
        </Link>
      </div>
    </section>
  );
};

export default Expired;
