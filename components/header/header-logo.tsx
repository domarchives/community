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
        className="object-contain"
      />
    </Link>
  );
};

export default HeaderLogo;
