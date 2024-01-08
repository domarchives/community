import Link from "next/link";

const HeaderLoginButton = () => {
  return (
    <Link
      href="/masuk"
      className="w-[90px] h-10 rounded-sm bg-main-red text-white text-sm font-semibold flex items-center justify-center"
    >
      Masuk
    </Link>
  );
};

export default HeaderLoginButton;
