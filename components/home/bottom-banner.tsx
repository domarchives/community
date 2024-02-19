import Image from "next/image";

const BottomBanner = () => {
  return (
    <div className="w-full md:w-[1200px] h-[160px] md:rounded-md bg-brand-subgray mt-3 md:mt-[60px] overflow-hidden">
      <Image
        src="/images/banners/pc-bottom.png"
        alt="PC Bottom Banner"
        width={1200}
        height={160}
        className="object-cover hidden md:block"
      />
      <Image
        src="/images/banners/mobile-bottom.png"
        alt="Mobile Bottom Banner"
        width={390}
        height={160}
        className="w-full h-[160px] object-cover md:hidden"
      />
    </div>
  );
};

export default BottomBanner;
