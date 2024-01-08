import Image from "next/image";

const Exchanges = () => {
  const exchanges = [
    {
      label: "binance",
      imageSrc: "/images/binance.png",
      width: 98,
      height: 21,
      href: "https://www.binance.com/",
    },
    {
      label: "upbit",
      imageSrc: "/images/upbit.png",
      width: 70,
      height: 17,
      href: "https://upbit.com/",
    },
    {
      label: "bithumb",
      imageSrc: "/images/bithumb.png",
      width: 97,
      height: 25,
      href: "https://www.bithumb.com/",
    },
    {
      label: "coinone",
      imageSrc: "/images/coinone.png",
      width: 95,
      height: 20,
      href: "https://coinone.co.kr/",
    },
    {
      label: "kucoin",
      imageSrc: "/images/kucoin.png",
      width: 87,
      height: 22,
      href: "https://www.kucoin.com/",
    },
    {
      label: "coinex",
      imageSrc: "/images/coinex.png",
      width: 86,
      height: 25,
      href: "https://www.coinex.com/",
    },
  ];

  return (
    <section className="grid grid-cols-3 h-[160px] w-full bg-brand-white">
      {exchanges.map((exchange) => (
        <a
          key={exchange.label}
          href={exchange.href}
          rel="noopener noreferrer"
          target="_blank"
          className="flex items-center justify-center"
        >
          <Image
            src={exchange.imageSrc}
            alt={exchange.label}
            width={exchange.width}
            height={exchange.height}
            className="object-contain"
          />
        </a>
      ))}
    </section>
  );
};

export default Exchanges;
