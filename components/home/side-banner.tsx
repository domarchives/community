import Image from "next/image";

const SideBanner = () => {
  return (
    <div className="w-full h-[220px] rounded-md bg-brand-subgray overflow-hidden">
      <Image
        src="/images/banners/pc-right-middle.png"
        alt="PC Middle Banner"
        width={420}
        height={220}
        className="object-cover"
      />
    </div>
  );
};

export default SideBanner;
