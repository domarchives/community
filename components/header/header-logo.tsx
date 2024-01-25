import Link from "next/link";
import Image from "next/image";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/kita.png"
        alt="Logo"
        width={142}
        height={40}
        priority
        className="object-contain hidden md:block"
      />
      <Image
        src="/images/mobile-logo.png"
        alt="Logo"
        width={100}
        height={30}
        priority
        className="object-contain md:hidden"
      />
    </Link>
  );
};

export default HeaderLogo;
