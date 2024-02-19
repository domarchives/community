import Image from "next/image";

const TopBanner = () => {
  return (
    <div className="w-full md:w-[1200px] h-[160px] md:rounded-md bg-brand-subgray mb-3 md:mb-5 overflow-hidden">
      <Image
        src="/images/banners/pc-main.png"
        alt="PC Main Banner"
        width={1200}
        height={160}
        className="object-cover hidden md:block"
      />
      <Image
        src="/images/banners/mobile-main.png"
        alt="Mobile Main Banner"
        width={390}
        height={160}
        className="w-full h-[160px] object-cover md:hidden"
      />
    </div>
  );
};

export default TopBanner;
