import Link from "next/link";
import Image from "next/image";

const snsList = [
  {
    name: "Telegram",
    image: "/images/telegram.svg",
    href: "#",
  },
  {
    name: "Twitter",
    image: "/images/twitter.svg",
    href: "#",
  },
  {
    name: "Instagram",
    image: "/images/instagram.svg",
    href: "#",
  },
  {
    name: "Medium",
    image: "/images/medium.svg",
    href: "#",
  },
  {
    name: "Discord",
    image: "/images/discord.svg",
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white">
      <section className="max-w-7xl mx-auto p-10 pb-5">
        <div className="flex items-start justify-between pb-20 border-b border-status-inactive">
          <Image
            src="/images/kita.png"
            alt="Logo"
            width={142}
            height={26}
            priority
            className="object-contain"
          />
          <ul className="w-[822px] flex items-start justify-between">
            {/* Komunitas */}
            <li className="space-y-5">
              <h3>
                <Link
                  href="/komunitas"
                  className="text-base text-black font-semibold leading-none"
                >
                  Komunitas
                </Link>
              </h3>
              <ul className="space-y-5">
                <li>
                  <Link
                    href="/komunitas/umum"
                    className="text-sm text-black font-medium leading-none"
                  >
                    Umum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/komunitas/komunitas-koin"
                    className="text-sm text-black font-medium leading-none"
                  >
                    Komunitas Koin
                  </Link>
                </li>
                <li>
                  <Link
                    href="/komunitas/informasi-koin"
                    className="text-sm text-black font-medium leading-none"
                  >
                    Informasi Koin
                  </Link>
                </li>
                <li>
                  <Link
                    href="/komunitas/nft-metaverse"
                    className="text-sm text-black font-medium leading-none"
                  >
                    NFT / Metaverse
                  </Link>
                </li>
                <li>
                  <Link
                    href="/komunitas/galeri-meme"
                    className="text-sm text-black font-medium leading-none"
                  >
                    Galeri Meme
                  </Link>
                </li>
                <li>
                  <Link
                    href="/komunitas/galeri"
                    className="text-sm text-black font-medium leading-none"
                  >
                    Galeri
                  </Link>
                </li>
              </ul>
            </li>

            {/* Berita */}
            <li className="space-y-5">
              <h3>
                <Link
                  href="/berita"
                  className="text-base text-black font-semibold leading-none"
                >
                  Berita
                </Link>
              </h3>
              <ul className="space-y-5">
                <li>
                  <Link
                    href="/berita/berita-utama"
                    className="text-sm text-black font-medium leading-none"
                  >
                    Berita Utama
                  </Link>
                </li>
                <li>
                  <Link
                    href="/berita/berita-terbaru"
                    className="text-sm text-black font-medium leading-none"
                  >
                    Berita Terbaru
                  </Link>
                </li>
              </ul>
            </li>

            {/* Pasar */}
            {/* <li className="space-y-5">
              <h3>
                <Link
                  href="/informasi-pasar"
                  className="text-base text-black font-semibold leading-none"
                >
                  Pasar
                </Link>
              </h3>
              <ul className="space-y-5">
                <li>
                  <Link
                    href="/informasi-pasar/koin"
                    className="text-sm text-black font-medium leading-none"
                  >
                    Koin
                  </Link>
                </li>
                <li>
                  <Link
                    href="/informasi-pasar/pertukaran"
                    className="text-sm text-black font-medium leading-none"
                  >
                    Pertukaran
                  </Link>
                </li>
              </ul>
            </li> */}

            {/* Bantuan & SNS */}
            <li className="space-y-10">
              <div className="space-y-5">
                <h3 className="text-base text-black font-semibold leading-none">
                  Bantuan
                </h3>
                <p className="text-sm text-black font-medium leading-none">
                  official@kita.foundation
                </p>
              </div>
              <div className="space-y-5">
                <h3 className="text-base text-black font-semibold leading-none">
                  SNS
                </h3>
                <ul className="flex items-center gap-x-5">
                  {snsList.map((sns) => (
                    <li key={`sns-${sns.name}`}>
                      <a
                        href={sns.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Image
                          src={sns.image}
                          alt={sns.name}
                          width={20}
                          height={20}
                          priority
                          className="object-contain"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="h-8 flex items-end justify-between">
          <p className="text-sm text-main-dark font-medium leading-none">
            2024 © Kita Foundation. All Rights Reserved
          </p>
          <p className="flex items-center gap-x-2.5">
            <span className="text-sm text-main-dark font-medium leading-none">
              Ketentuan Layanan
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
            >
              <circle cx="2" cy="2" r="2" fill="#525252" />
            </svg>
            <span className="text-sm text-main-dark font-medium leading-none">
              Kebijakan Privasi
            </span>
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
