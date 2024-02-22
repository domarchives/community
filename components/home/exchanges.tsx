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
      href: "https://id.upbit.com/",
    },
    {
      label: "indodax",
      imageSrc: "/images/indodax.png",
      width: 87,
      height: 22,
      href: "https://www.indodax.com/",
    },
    {
      label: "coinbase",
      imageSrc: "/images/coinbase.png",
      width: 87,
      height: 22,
      href: "https://www.coinbase.com/",
    },
    {
      label: "pintu",
      imageSrc: "/images/pintu.png",
      width: 86,
      height: 25,
      href: "https://pintu.co.id/",
    },
    {
      label: "reku",
      imageSrc: "/images/reku.png",
      width: 95,
      height: 20,
      href: "https://www.reku.id/",
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
